import React from 'react';
import { Link, NavLink, Prompt } from 'react-router-dom';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { Formik, Field, Form, withFormik } from 'formik';
import { Icon, Button, Radio, Input, Tooltip, Loading, message } from 'ten-design-react';
import { resolveApi } from '@/site/utils/network';
import valueFormat from '@/src/input/value-format';
import { connectGlobal } from '@/site/common/global';
import { Layout } from '@/site/components';
import network from '@/site/utils/network';
import ColorPicker from './color-picker';
import themeServices from '@/site/services/theme';
import ThemeComponents from './theme-components';
// import less from './less-handler';
import ThemeInfo from './theme-info';
import themeUtils from './theme-utils';

const loadLessHandler = () => import('./less-handler');
const InputFormatColor = valueFormat(Input, { input: false, blur: true, enter: true });

class Theme extends React.Component {
  constructor(props) {
    super(props);
    // console.log(props);
    const { match, location } = props;
    const defaultConfig = {
      '@primary-color': '#0052D9',
      '@border-color': '#D9D9D9',
      '@border-radius-percent': '0',
      '@show-shadow': '1'
    };
    this.isEdit = typeof match.params.id !== 'undefined';
    this.isDefault = location.pathname.indexOf('themedefault') > -1;
    this.isCreate = location.pathname.indexOf('createtheme') > -1;
    this.fallbackTitle = this.isDefault ? '默认主题' : '新主题';
    this.defaultConfig = defaultConfig;
    this.state = {
      inited: false,
      isChanged: false,
      initialConfig: { ...defaultConfig },
      themeInfo: props.routeState && props.routeState.themeInfo ? props.routeState.themeInfo : { name: match.params.name || '' }
    };
  }

  componentDidMount() {
    loadLessHandler().then(() => this.init());
    document.body.addEventListener('popupshow', this.onPopupShow);
  }

  componentWillUnmount() {
    this.updatePreview(this.defaultConfig);
    document.body.removeEventListener('popupshow', this.onPopupShow);
  }

  // 初始化获取保存配置
  async init() {
    const { match } = this.props;

    this.updatePreview(this.defaultConfig);
    if (this.isEdit) {
      const id = match.params.id;
      try {

        // fetch
        const data = await themeServices.getTheme(id);
        const initialConfig = { ...this.defaultConfig, ...themeUtils.mapVarsToValues(data.config) };
        // console.log(initialConfig);
        const themeInfo = {
          name: data.name
        };
        this.updatePreview(initialConfig);
        this.id = id;
        setTimeout(() => {
          this.setState({
            inited: true,
            themeInfo,
            initialConfig
          });
          this.formik && this.formik.setValues(initialConfig);
        }, 100);
      } catch (e) {
        console.error(e);
        message.error('主题加载失败');
        this.setState({
          inited: true
        });
      }
    } else {
      setTimeout(() => {
        this.setState({
          inited: true
        });
      }, 100);
    }
  }

  onPopupShow = (e) => {
    // console.log(e);
    e.target.classList.add('spfx-theme-components');
  }

  onFormChange = (values) => {
    // console.log(values);
    // get css to preview
    this.updatePreview(values);
    const isChanged = !isEqual(values, this.state.initialConfig);
    this.setState({
      isChanged
    });
    // console.log(isChanged);
    // network.post('/preview', { data: previewConfig });
  }

  onSubmit = async (values, actions) => {
    const { history } = this.props;
    const { themeInfo } = this.state;
    const vars = themeUtils.mapValuesToVars(values);

    if (!this.isEdit) {
      const create = async (themeInfo) => {
        try {
          const themeData = { ...themeInfo, config: { ...vars } };
          await themeServices.createTheme(themeData);
          message.success('保存成功');
          this.setState({
            themeInfo,
            initialConfig: values
          });
          this.isCreate = false;
          setTimeout(() => history.push('/themelist'), 500);
        } catch (e) {
          message.success('保存失败');
        }
      };

      if (themeInfo.name) {
        create(themeInfo);
      } else {
        ThemeInfo.show({ name: '' }, themeInfo => create(themeInfo));
      }
    } else {
      try {
        const { themeInfo } = this.state;
        const themeData = { ...themeInfo, config: { ...vars } };
        await themeServices.updateTheme(this.id, themeData);
        message.success('保存成功');
        this.setState({
          themeInfo,
          initialConfig: values
        });
        setTimeout(() => history.push('/themelist'));
      } catch (e) {
        message.success('保存失败');
      }
    }
  }

  onDownload = () => {
    if (!this.isEdit) {
      message.warning('请先保存主题');
      return;
    }
    window.location.href = resolveApi(`/themes/${this.id}/download`);
  }

  reset(formik) {
    const { initialConfig } = this.state;
    formik.resetForm();
    this.updatePreview(initialConfig);
  }

  setDefault(formik) {
    formik.setValues(this.defaultConfig);
    this.updatePreview(this.defaultConfig);
  }

  updatePreview = debounce((config) => {
    const lessVars = themeUtils.mapValuesToVars(config);

    if (lessVars['@show-shadow'] === '0') {
      lessVars['@shadow-level-1'] = 'inset 0px 0px 0px 1px @border-color';
      lessVars['@shadow-level-2'] = 'inset 0px 0px 0px 1px @border-color';
      lessVars['@tooltip-arrow-border'] = '@border-main';
      lessVars['@tooltip-arrow-zindex'] = '1';
      // lessVars['@shadow-level-1'] = 'none';
      // lessVars['@shadow-level-2'] = 'none';
    }
    less.modifyVars(lessVars);
  }, 100);

  render() {
    const { inited, initialConfig, themeInfo } = this.state;

    return (
      <Layout className="spfx-page-theme" footer={false} title="定制主题" name="定制主题" log>

        {inited ? (
          <div className="spfx-container spfx-theme-container">
            <aside className="spfx-theme-side">
              <Formik
                initialValues={initialConfig}
                validate={this.onFormChange}
                onSubmit={this.onSubmit}
              >
                {
                  (formik) => {
                    const { handleSubmit, setFieldValue, values } = formik;
                    const onChange = (name, value) => {
                      setFieldValue(name, value);
                    };
                    this.formik = formik;
                    return (
                      <div>
                        <Prompt message={() => {
                          let isChanged = !isEqual(values, initialConfig);

                          isChanged = isChanged || this.isCreate;
                          return isChanged ? '主题没有保存，你确定离开吗？' : true;
                        }}
                        />
                        <div className="spfx-theme-config__header">
                          <h3 title={themeInfo.name || this.fallbackTitle}>{themeInfo.name || this.fallbackTitle}</h3>
                          <Link className="spfx-theme-link" to="/themelist">
                            <Icon type="left" />返回
                          </Link>
                        </div>
                        <div className="spfx-theme-config__content">
                          <div className="spfx-theme-config-group">
                            <h3 className="spfx-theme-config-group__title">品牌色</h3>
                            <ul className="spfx-theme-config-group__list">
                              <li
                                className="spfx-theme-config-item"
                              >
                                {/* <h4 className="spfx-theme-config-item__title"></h4> */}
                                <div className="spfx-theme-config-item__content">
                                  <Field
                                    name="@primary-color"
                                    render={({ field }) => (
                                      <div className="spfx-theme-config-color">
                                        <ColorPicker color={field.value} onChange={v => onChange('@primary-color', v)}>
                                          <div
                                            className="spfx-theme-config-color__preview"
                                            style={{ background: themeUtils.getColorText(field.value) }}
                                          />
                                        </ColorPicker>
                                        <InputFormatColor
                                          className="spfx-theme-config-color__val"
                                          value={field.value}
                                          onChange={v => {
                                            onChange('@primary-color', v);
                                          }}
                                          formatter={themeUtils.getColorText}
                                          parser={v => {
                                            const valid = v.trim();
                                            if (themeUtils.isValidColor(valid)) {
                                              return valid;
                                            }
                                            return themeUtils.getColorText(field.value);
                                          }}
                                        />
                                      </div>
                                    )}
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* <!-- 边框 --> */}
                          <div className="spfx-theme-config-group">
                            <h3 className="spfx-theme-config-group__title">边框</h3>
                            <ul className="spfx-theme-config-group__list">
                              <li className="spfx-theme-config-item">
                                <div className="spfx-theme-config-item__content">
                                  <div className="spfx-theme-config-border">
                                    <Field
                                      name="@border-color"
                                      render={({ field }) => (
                                        <Radio.Group value={field.value} button onChange={e => onChange('@border-color', e.target.value)}>
                                          <Radio value="#D9D9D9"><i className="spfx-theme-border-1" />强 #D9D9D9</Radio>
                                          <Radio value="#E8E8E8"><i className="spfx-theme-border-2" />弱 #E8E8E8</Radio>
                                        </Radio.Group>
                                      )}
                                     />
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>

                          {/* <!-- 圆角 --> */}
                          <div className="spfx-theme-config-group">
                            <h3 className="spfx-theme-config-group__title">圆角</h3>
                            <ul className="spfx-theme-config-group__list">
                              <li className="spfx-theme-config-item">
                                <div className="spfx-theme-config-item__content">
                                  <div className="spfx-theme-config-borderradius">
                                    <Field
                                      name="@border-radius-percent"
                                      render={({ field }) => (
                                        <span>
                                          <Input.Number
                                            min={0}
                                            max={100}
                                            value={field.value}
                                            step={10}
                                            onChange={v => onChange('@border-radius-percent', v)}
                                            style={{ width: 80 }}
                                            formatter={value => `${value}%`}
                                            parser={value => value.replace('%', '')}
                                          />
                                        </span>
                                      )}
                                     />
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>


                          {/* <!-- 浮层投影 --> */}
                          <div className="spfx-theme-config-group">
                            <h3 className="spfx-theme-config-group__title">浮层投影</h3>
                            <ul className="spfx-theme-config-group__list">
                              <li className="spfx-theme-config-item">
                                <div className="spfx-theme-config-item__content">
                                  <div className="spfx-theme-config-shadow">
                                    <Field
                                      name="@show-shadow"
                                      render={({ field }) => (
                                        <Radio.Group value={field.value} button onChange={e => onChange('@show-shadow', e.target.value)}>
                                          <Radio value="1">有投影</Radio>
                                          <Radio value="0">无投影</Radio>
                                        </Radio.Group>
                                      )}
                                     />
                                  </div>
                                </div>
                              </li>
                            </ul>
                          </div>

                        </div>


                        <div className="spfx-theme-config__footer">
                          <Button theme="primary" type="submit" onClick={handleSubmit}>保存</Button>
                          <Button onClick={this.onDownload}>下载</Button>
                          <Tooltip message="重置" dark>
                            <Button icon="rollback" type="text" onClick={() => this.reset(formik)} />
                          </Tooltip>
                          <Tooltip message="恢复默认" dark>
                            <Button icon="refresh" type="text" onClick={() => this.setDefault(formik)} />
                          </Tooltip>
                        </div>
                      </div>
                    );
                  }
                }
              </Formik>
            </aside>
            <ThemeComponents />
          </div>
        ) : <Loading type="block" />}
      </Layout>
    );
  }
}

export default connectGlobal(state => ({
  routeState: state.routeState
}))(Theme);

import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Icon, Tooltip, message, Modal } from 'ten-design-react';
import { connectGlobal } from '@/site/common/global';
import { Layout } from '@/site/components';
import { resolveApi } from '@/site/utils/network';
import ThemeInfo from './theme-info';
import themeServices from '@/site/services/theme';
import themeUtils from './theme-utils';

class ThemeList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    const data = await themeServices.getThemeList();

    this.setState({
      list: data
    });
  }

  create = () => {
    const { history } = this.props;
    ThemeInfo.show({ name: '' }, async (themeInfo) => {
      try {
        history.push(`/createtheme/${themeInfo.name}`);
      } catch (e) {
        message.error(e.userMessage);
      }
    });
  }

  rename(item) {
    ThemeInfo.show({ name: item.name }, async (themeInfo) => {
      await themeServices.updateTheme(item.id, { ...item, ...themeInfo });
      item.name = themeInfo.name;
      this.setState(
        [...this.state.list]
      );
    });
  }

  copy(item) {
    ThemeInfo.show({ name: item.name + ' copy' }, async (themeInfo) => {
      try {
        await themeServices.createTheme({ ...item, ...themeInfo });
        setTimeout(() => this.fetch(), 500);
      } catch (e) {
        message.error(e.userMessage);
      }

    });
  }

  delete(item) {
    Modal.warning({
      title: '请确认',
      content: `确认删除 ${item.name} 吗？`,
      onConfirm: async () => {
        await themeServices.deleteTheme(item.id);
        message.success('删除成功');
        const newList = this.state.list.filter(oItem => oItem.id !== item.id);
        this.setState({
          list: newList
        });
      }
    });
  }

  download(item) {
    window.location.href = `http://hive.oa.com/theme/api/public/index.php/api/themes/${item.id}/download`;
  }

  render() {
    const { list } = this.state;
    return (
      <Layout className="spfx-page-theme-list" title="主题列表" name="主题列表" log>
        <div className="spfx-container">
          <div className="spfx-theme-list-header">
            <h2>我的主题</h2>
            <div className="spfx-theme-list-header__action">
              <Button theme="primary" size="small" onClick={this.create}>新建主题</Button>
            </div>
          </div>
          <Row xl={15} gutter={32} className="spfx-theme-list-list">
            <Col span={3}>
              <div className="spfx-theme-list-item">
                <Link to="/themedefault" className="spfx-theme-list-item__preview">
                  <div className="spfx-theme-list-item__preview-primary"></div>
                  <div className="spfx-theme-list-item__preview-bg">
                    <svg viewBox="0 0 272 144" version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id="bg" width="11" height="11" patternUnits="userSpaceOnUse">
                          <circle cx="11" cy="11" r="1.5" fill="currentColor" />
                        </pattern>
                      </defs>
                      <rect x="0" y="0" width="272" height="144" fill="url(#bg)" />
                    </svg>
                  </div>
                  <div className="spfx-theme-list-item__preview-border">
                    <svg viewBox="0 0 140 120" version="1.1" xmlns="http://www.w3.org/2000/svg">

                      <line x1="0" y1="19.5" x2="140" y2="19.5" stroke="currentColor" strokeWidth="1" />
                      <line x1="121.5" y1="0" x2="121.5" y2="120" stroke="currentColor" strokeWidth="1" />

                      <line x1="86" y1="29.5" x2="106" y2="29.5" stroke="currentColor" strokeWidth="1" />
                      <line x1="110.5" y1="35" x2="110.5" y2="56" stroke="currentColor" strokeWidth="1" />

                      <circle cx="110.5" cy="29.5" r="2" fill="currentColor" />
                      <circle cx="110.5" cy="29.5" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                    </svg>
                  </div>
                  <div className="spfx-theme-list-item__preview-border-2"></div>
                  <div className="spfx-theme-list-item__preview-shadow">
                    <div></div>
                  </div>
                </Link>
                <div className="spfx-theme-list-item-content">
                  <h3 className="spfx-theme-list-item__title">
                    <Link className="spfx-main-link" to="/themedefault">
                      TEN Design
                    </Link>
                  </h3>
                  <p className="spfx-theme-list-item__info">默认主题</p>
                  <div className="spfx-theme-list-item__action">
                    <Link to="/themedefault">查看</Link>
                  </div>
                </div>

              </div>
            </Col>

            {
              list.map(item => (
                <Col span={3} key={item.id}>
                  <div className="spfx-theme-list-item">
                    <Link to={`/theme/${item.id}`} className="spfx-theme-list-item__preview">
                      <div className="spfx-theme-list-item__preview-primary" style={{ background: item.config['@primary-color'], borderTopRightRadius: item.config['@border-radius-percent'] * 50 + '%' }}></div>
                      <div className="spfx-theme-list-item__preview-bg" style={{ color: item.config['@border-color'] }}>
                        <svg viewBox="0 0 272 144" version="1.1" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0" y="0" width="272" height="144" fill="url(#bg)" />
                        </svg>
                      </div>
                      <div className="spfx-theme-list-item__preview-border" style={{ color: item.config['@border-color'] }}>
                        <svg viewBox="0 0 140 120" version="1.1" xmlns="http://www.w3.org/2000/svg">

                          <line x1="0" y1="19.5" x2="140" y2="19.5" stroke="currentColor" strokeWidth="1" />
                          <line x1="121.5" y1="0" x2="121.5" y2="120" stroke="currentColor" strokeWidth="1" />

                          <line x1="86" y1="29.5" x2="106" y2="29.5" stroke="currentColor" strokeWidth="1" />
                          <line x1="110.5" y1="35" x2="110.5" y2="56" stroke="currentColor" strokeWidth="1" />

                          <circle cx="110.5" cy="29.5" r="2" fill="currentColor" />
                          <circle cx="110.5" cy="29.5" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                        </svg>
                      </div>
                      <div className="spfx-theme-list-item__preview-shadow">
                        <div></div>
                      </div>
                    </Link>
                    <div className="spfx-theme-list-item-content">
                      <h3 className="spfx-theme-list-item__title">
                        <Link className="spfx-main-link" to={`/theme/${item.id}`} title={item.name}>
                          {item.name}
                        </Link>
                        <Tooltip
                          className="spfx-theme-list-item__title-action-popup"
                          content={
                            <ul className="spfx-theme-list-item__title-action-list">
                              <li onClick={() => { this.rename(item); }}>修改命名</li>
                              <li onClick={() => { this.copy(item); }}>复制主题</li>
                              <li onClick={() => { this.delete(item); }}>删除主题</li>
                            </ul>
                          }
                          triggerType="hover"
                          direction="bottom center"
                        >
                          <Icon className="spfx-theme-list-item__title-action" type="more" />

                        </Tooltip>
                      </h3>
                      <p className="spfx-theme-list-item__info">{item.updated_at}</p>
                      <div className="spfx-theme-list-item__action">
                        <Link to={`/theme/${item.id}`}>编辑</Link>
                        <a href={resolveApi(`/themes/${item.id}/download`)}>下载</a>
                      </div>
                    </div>

                  </div>

                </Col>
              ))
            }
          </Row>
        </div>
      </Layout>
    );

  }
}

export default connectGlobal()(ThemeList);

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Formik, Field, withFormik } from 'formik';
import { Modal, Input, Form, Button } from 'ten-design-react';

class ThemeInfo extends React.Component {
  static propTypes = {
    info: PropTypes.object,
    callback: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.confirmed = false;
    this.state = {
      show: true,
    };
  }

  onKeyDown() {

  }

  onSubmit = () => {
    const { onChange } = this.props;
    this.confirmed = true;
    this.setState({ show: false });
  }

  onClose = () => {
    this.setState({ show: false });
  }

  onClosed(formik) {
    const { callback } = this.props;

    if (this.confirmed) {
      callback(formik.values);
    }
  }

  render() {
    const { info } = this.props;
    const { show } = this.state;
    return (
      <Formik
        initialValues={info}
        onSubmit={this.onSubmit}
      >
        {
          (formik) => {
            const { handleSubmit, setFieldValue, handleChange, values, errors } = formik;
            return (
              <Modal
                title="主题名称"
                visible={show}
                onClose={this.onClose}
                onClosed={() => { this.onClosed(formik); }}
                footer={<Button onClick={handleSubmit}>确定</Button>}
              >
                <Form>
                  <Field
                    name="name"
                    validate={v => {
                      if (!v.trim()) {
                        return '请输入主题名称'
                      }
                    }}
                  >
                    {
                      ({ field }) => {
                        return (
                          <Form.Item error={errors.name}>
                            <Input name="name" value={field.value} onChange={handleChange} onKeyDown={(e) => {
                              const keyCode = e.keyCode;
                              if (keyCode === 13) {
                                handleSubmit();
                                e.preventDefault();
                              }
                            }}/>
                          </Form.Item>
                        );
                      }
                    }
                  </Field>
                </Form>
              </Modal>
            );
          }
        }
      </Formik>
    );
  }
}

function show(themeInfo, cb) {
  const div = document.createElement('div');
  const callback = function (newThemeInfo) {
    cb(newThemeInfo);
    ReactDOM.unmountComponentAtNode(div);
    document.body.removeChild(div);
  };
  const content = <ThemeInfo info={themeInfo} callback={callback}></ThemeInfo>;

  ReactDOM.render(content, div);
  document.body.appendChild(div);
}

export default { show };

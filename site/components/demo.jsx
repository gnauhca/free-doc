import React from 'react';
import PropTypes from 'prop-types';

class Demo extends React.Component {

  static propTypes = {
    code: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      showCode: false
    };
  }

  onToggleClick = () => {
    this.setState(state => ({ showCode: !state.showCode }));
  }

  render() {
    const { showCode } = this.state;
    const { code } = this.props;

    return (
      <div className="spfx-demo">
        <div className="spfx-demo__demo">
          {this.props.children}
        </div>
        <div className="spfx-demo__code">
          <a className="spfx-demo__code-toggle spfx-main-link" onClick={this.onToggleClick}>
            {showCode ? '收起代码' : '查看代码'}
          </a>
          <div className="spfx-demo__code-text" style={{ display: showCode ? 'block' : 'none' }}>
            <pre><code className="language-jsx" ref={el => { this.codeElm = el; }}>{code}</code></pre>
          </div>
        </div>
      </div>
    );
  }
}

export default Demo;

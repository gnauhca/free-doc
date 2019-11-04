import React from 'react';

function dynamic (loadedFun, options = {}) {

  if (typeof loadedFun !== 'function') {
    new Error('dynamic accept a function type args');
  }

  const { ref = 'refContainer', onLoaded = () => {}, displayName } = options;

  return class extends React.Component {

    static displayName = displayName;

    constructor (props) {
      super(props);

      this.state= {
        dynamicComponent: null
      };

      this[ref] = React.createRef();
    }
    
    componentDidMount() {
      loadedFun().then((ComponentFunc) => {
        const dynamicComponent = <ComponentFunc.default ref={e => { this[ref] = e; }} { ...this.props }/>;
        this.setState({ dynamicComponent }, () => {
          setTimeout(onLoaded.bind(null, this));
        });
      })
    }
    
    render() {
      const { dynamicComponent, fallback } = this.state;
      return dynamicComponent || fallback || '';
    }
  }
}

export default dynamic;

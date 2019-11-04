import React from 'react';

const { Provider, Consumer } = React.createContext();

class GlobalProvider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      store: props.store || {}
    };
  }

  updateStore = (key, action) => {
    const { store } = this.state;
    const specifyStore = store[key];

    store[key] = typeof action === 'function' ? action(specifyStore) : action;

    this.setState({
      store: { ...store }
    });
  }

  render() {
    const { children } = this.props;
    const { store } = this.state;

    return (
      <Provider value={{
        store,
        updateStore: this.updateStore
      }}
      >
        {children}
      </Provider>
    );
  }
}

const connectGlobal = (mapStoreToProps) => (Component) => React.forwardRef((props, ref) => (
  <Consumer>
    {
      ({ store, updateStore }) => {
        const storeProps = mapStoreToProps ? mapStoreToProps(store) : { ...store };
        return (
          <Component ref={ref} {...props} {...storeProps} updateStore={updateStore} />
        );

      }
    }
  </Consumer>
));

export { GlobalProvider, connectGlobal };

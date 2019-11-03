import React from 'react';
import { Loading } from 'ten-design-react';
import debounce from 'lodash/debounce';
import dynamic from '@/site/common/dynamic';
import { SideNav } from '@/site/components';
import config from '@/site/config';

// const componentsConfig = [];

// function getComponents(config, result = []) {
//   if (Array.isArray(config)) {
//     config.forEach(c => getComponents(c, result));
//   } else if (config.children) {
//     getComponents(config.children, result);
//   } else if (config.component) {
//     result.push({ ...config });
//   }
//   return result;
// }
// getComponents(config.navs.components.docs, componentsConfig);

const ignoreComponents = ['start', 'icon', 'animate', 'breadcrumb', 'slider', 'menu', 'grid'];
let componentNavConfig = [];
let componentsConfig = [];

function filterConfig(configs, componentsConfig = []) {
  const filteredConfigs = configs.map(config => {
    if (ignoreComponents.indexOf(config.name) > -1) {
      return false;
    }

    if (config.children) {
      const cloneConfig = { ...config };
      cloneConfig.children = filterConfig(config.children, componentsConfig);
      return cloneConfig;
    } else if (config.component) {
      componentsConfig.push(config);
      return config;
    }
  }).filter(c => c);
  return filteredConfigs;
}

componentNavConfig = filterConfig(config.navs.components.docs, componentsConfig);

export default class ThemeComponents extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      componentsConfig
    };
    this.refContainer = React.createRef();
  }

  componentDidMount() {
    const componentWrappers = [...this.refContainer.current.querySelectorAll('.spfx-theme-component')];

    this.componentWrappers = componentWrappers;

    this.refContainer.current.addEventListener("scroll", this.onScroll);
    this.onScroll();
  }

  componentWillUnmount() {
    this.refContainer.current.removeEventListener("scroll", this.onScroll);
  }

  onScroll = debounce(() => {
    const { componentsConfig } = this.state;
    let needUpdate = false;

    this.componentWrappers.forEach(componentWrapper => {
      const name = componentWrapper.dataset.component;
      const componentConfig = componentsConfig.find(c => c.name === name); if (componentConfig.load) {
        return;
      }

      const top = componentWrapper.getBoundingClientRect().top;
      // console.log(top);
      if (top >= 0 && top < window.innerHeight + 200) {
        componentConfig.load = true;
        componentConfig.LoadedComponent = dynamic(componentConfig.component, { displayName: componentConfig.name });
        needUpdate = true;
      }
    }, 50);

    if (needUpdate) {
      this.setState({
        componentsConfig: [...componentsConfig]
      });
    }
  });

  scrollTo(componentName) {
    const targetComponentWrapper = this.componentWrappers.find(componentWrapper => {
      return componentWrapper.dataset.component === componentName;
    });

    if (targetComponentWrapper) {
      const top = targetComponentWrapper.offsetTop;

      this.refContainer.current.scrollTo(0, top);
    }
  }

  renderComponentNav = (nav) => {
    return <a className="spfx-main-link" href="javascript:;" data-component={nav.name} onClick={() => this.scrollTo(nav.name)}>{nav.title}</a>;
  }

  render() {
    const { componentsConfig } = this.state;
    return (
      <div className="spfx-theme-components">
        <div className="spfx-theme-components__content" ref={this.refContainer}>
          {
            componentsConfig.map(componentConfig => {

              return (
                <div className="spfx-theme-component" key={componentConfig.name} data-component={componentConfig.name}>
                  {
                    componentConfig.LoadedComponent ? <componentConfig.LoadedComponent /> :
                      <Loading type="block" />
                  }
                </div>
              );
            })
          }
        </div>
        <nav className="spfx-theme-components__nav">
          <SideNav data={componentNavConfig} renderItem={this.renderComponentNav}></SideNav>
        </nav>
      </div>
    );
  }
}

const linkTag = document.createElement('link');
const linkTag2 = document.createElement('link');
linkTag.setAttribute('rel', 'stylesheet');
linkTag.setAttribute('type', 'text/less');
linkTag.setAttribute('href', './theme/index.less');
linkTag2.setAttribute('rel', 'stylesheet');
linkTag2.setAttribute('type', 'text/less');
linkTag2.setAttribute('href', './theme/docs/index.less');
document.head.appendChild(linkTag);
document.head.appendChild(linkTag2);

window.less = {
  logLevel: 1,
  errorReporting: 'console',
  modifyVars: {
    // '@primary-color': '#f00'
  },
  plugins: [{
    install(less, pluginManager) {
      // console.log(less, pluginManager);
      pluginManager.addPreProcessor({
        process(src, extra) {
          // return src;
          if (extra.fileInfo.filename.match(/(var|mixins|index)/)) {
            return src;
          }



          const importLastIndex = src.lastIndexOf('@import');
          const importRegx = /@import.+?;/g;
          let index = 0;

          if (importLastIndex > -1) {
            importRegx.lastIndex = importLastIndex;
            importRegx.exec(src);
            index = importRegx.lastIndex;
          }

          let wrapped = '';
          if (index > 0) {
            wrapped = src.substring(0, index);
            wrapped += '.spfx-theme-components{ ';
            wrapped += src.substring(index);
            wrapped += '}';
          } else {
            wrapped = src;
          }
          // if (extra.fileInfo.filename.indexOf('input.less') > -1) {
          //   console.log(wrapped);
          // }
          // console.log(wrapped)
          return wrapped;
        }
      });
    }
  }]
};

require('script-loader!./less.js');
const less = window.less;

export default less;

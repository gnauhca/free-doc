const path = require('path');
const md = require('markdown-it')({
  xhtmlOut: true,
});
const mdContainer = require('markdown-it-container');
const Markdownitfence = require('markdown-it-fence');
const camelCase = require('camelcase');

md.use(mdContainer, 'demo', {
  validate(params) {
    return params.trim().match(/^demo\s+([\\/.\w-]+)(\s+(.+?))?(\s+--dev)?$/);
  },
  render(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      const match = tokens[idx].info.trim().match(/^demo\s+([\\/.\w-]+)(\s+(.+?))?(\s+--dev)?$/);
      const demoPath = match[1];
      const demoPathOnlyLetters = demoPath.replace(/[^a-zA-Z\d]/g, '');
      const demoName = path.basename(demoPath);
      const testOnly = match[4];
      const title = match[3];
      const demoDefName = `Demo${demoPathOnlyLetters}`;
      const demoCodeDefName = `Demo${demoPathOnlyLetters}Code`;

      const titleTpl = title ? `<h4>${title}</h4>` : '';

      const tpl = `
      <Demo code={${demoCodeDefName}}>
        <${demoDefName} />
      </Demo>`;

      tokens.tttpl = tpl;

      if (testOnly && process.env.NODE_ENV === 'production') {
        tokens.tttpl = '';
        return '';
      }

      return `
      <div className="spfx-demo-wrapper spfx-demo-$$-${demoName} demo-$$ demo-$$-${demoName}">
        ${titleTpl}
      `;

    }

    if (tokens.tttpl) {
      return `
      ${tokens.tttpl || ''}
    </div>`;
    }
    return '';
  }
});

md.use(mdContainer, 'doc', {
  validate(params) {
    return params.trim().match(/^doc\s+(.+)$/);
  },
  render(tokens, idx) {
    if (tokens[idx].nesting === 1) {
      const match = tokens[idx].info.trim().match(/^doc\s+(.+)$/);
      const componentPath = match[1];
      const componentName = path.basename(componentPath);
      const componentPathOnlyLetters = componentPath.replace(/[^a-zA-Z\d]/g, '');
      const pascalCaseComponentName = camelCase(componentName, { pascalCase: true });
      const docDefName = `Doc${componentPathOnlyLetters}`;

      return `
      <div className="spfx-cdoc-wrapper spfx-cdoc-${componentName}">
        <DocTables doc={${docDefName}} name="${pascalCaseComponentName}" />
      `;

    }
    return '</div>';
  }
});

function mdInJsx(_md) {
  return new Markdownitfence(_md, 'md_in_jsx', {
    render(tokens, idx) {
      return '<pre><code>{`' + tokens[idx].content.replace(/`/g, '\\`') + '`}</code></pre>';
    },
    validate() {
      return true;
    }
  });
}

md.use(mdInJsx);

module.exports = function (source) {
  this.sourceMap = false;

  const demoImports = {};
  const docImports = {};
  const name = path.basename(this.resourcePath, '.md');
  let mdResult = md.render(source);

  mdResult = mdResult.replace(/\$\$/g, name);
  mdResult = mdResult.replace(/".*?(jpg|png|gif|jpeg)"/g, imgstr => `{require(${imgstr})}`);

  source.replace(/:::\s*demo\s+([\\/.\w-]+)/g, (demoStr, demoPath) => {
    const demoPathOnlyLetters = demoPath.replace(/[^a-zA-Z\d]/g, '');
    const demoDefName = 'Demo' + demoPathOnlyLetters;
    const demoCodeDefName = 'Demo' + demoPathOnlyLetters + 'Code';
    demoImports[demoDefName] = `import ${demoDefName} from './${demoPath}';`;
    demoImports[demoCodeDefName] = `import ${demoCodeDefName} from '!!raw-loader!./${demoPath}';`;
  });

  source.replace(/:::\s*doc\s+(.+)/g, (docStr, componentPath) => {
    const componentPathOnlyLetters = componentPath.replace(/[^a-zA-Z\d]/g, '');
    const docDefName = 'Doc' + componentPathOnlyLetters;
    docImports[docDefName] = `import ${docDefName} from '!!doc-loader!./${componentPath.trim()}';`;
  });

  const demoDefsStr = Object.keys(demoImports).map(key => demoImports[key]).join('\n');

  const docImportsStr = Object.keys(docImports).map(key => docImports[key]).join('\n');

  const reactSource = `
import React from 'react';
import { Demo, DocTables } from '~/site/components';
${demoDefsStr}
${docImportsStr}

export default React.forwardRef((props, ref) => (
  <div className="spfx-document" ref={ref}>
    ${mdResult}
  </div>
))
`;

  // console.log(reactSource); 
  return reactSource;
};

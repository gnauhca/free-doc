#!/usr/bin/env node
const program = require('commander');
const fse = require('fs-extra');
const pkg = require('../package.json');
const utils = require('../utils');
const doc = require('../index');


function getDocConfig() {
  const defaultDocConfigPath = utils.resolveCwd('./doc.config.js');
  let docConfigPath;
  // console.log(defaultDocConfigPath);

  if (program.config) {
    docConfigPath = utils.resolveCwd(program.config);
  } else {
    docConfigPath = defaultDocConfigPath;
  }
  
  if (!fse.pathExistsSync(docConfigPath)) {
    console.error('doc.config.js is require');
    process.exit(1);
    return;
  }
  return docConfigPath;
}

program.version(pkg.version);

program.option('-c, --config <type>', 'doc configure file', )


program
  .command('serve')
  .action(() => {
    doc.init(getDocConfig());
    doc.serve();
  });

program
  .command('build')
  .action(() => {
    doc.init(getDocConfig());
    doc.build();
  });

program.parse(process.argv);

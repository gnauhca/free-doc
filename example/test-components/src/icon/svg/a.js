/* eslint-disable */
const fs = require('fs');

const svgMap = {};
let files = fs.readdirSync('./');


files = files.filter(file => /[a-zA-Z_]+\.svg$/.test(file));

// console.log(files);
files.forEach(file => {
  let content = fs.readFileSync(file, { encoding: 'utf8' });
  if (file.indexOf('loading_gradient') === -1) {

    content = content.replace(/<\?xml.+?>/, '');
    content = content.replace(/<!--\s*Generator.+?-->/, '');
    content = content.replace(/<title.+?>/, '');
    content = content.replace(/<desc.+?>/, '');
    content = content.replace('<rect fill="#FFFFFF" x="0" y="0" width="24" height="24"></rect>', '');
    // content = content.replace(/fill(-rule)?=".*"/g, '');
    content = content.replace(/"#000000"/gi, '"currentColor"');
    content = content.replace(/"#333333"/gi, '"currentColor"');
    content = content.replace(/fill="#.+?"/gi, 'fill="currentColor"');
    content = content.replace(/\sid=".+?"/gi, '');
  
  
    content = content.replace(/<svg.+?>/, function() {
      return `<svg fill="currentColor" width="24px" height="24px" viewBox="0 0 24 24">`;
    });
  
  
    content = content.replace(/\n\s+?\n+/g, '\n');
  }

  svgMap[file.replace('.svg', '')] = content;

  // console.log(content);
});

fs.writeFileSync('./keys.json', JSON.stringify(Object.keys(svgMap)), { encoding: 'utf8' });

fs.writeFileSync('./index.json', JSON.stringify(svgMap, null, 2), { encoding: 'utf8' });

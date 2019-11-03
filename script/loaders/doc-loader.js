const reactDocs = require('react-docgen');
const doctrine = require('doctrine');

module.exports = function (source) {

  const doc = reactDocs.parse(source);

  doc.tags = doctrine.parse(doc.description).tags;

  doc.methods = doc.methods.map(method => {
    const docblock = method.docblock;
    if (!docblock) return false;
    method.tags = doctrine.parse(docblock).tags;
    return method;
  }).filter(m => m);

  Object.keys(doc.props).forEach(key => {
    const des = doc.props[key].description;
    const result = doctrine.parse(des);
    const tags = {};
    doc.props[key].description = result.description;
    if (Array.isArray(result.tags)) {
      result.tags.forEach(tag => {
        
        if (tag.title === 'ignore') {
          tags[tag.title] = true;
        } else if (tag.title === 'param') {
          if (!tags.param) tags.param = [];
          tags.param.push({ 
            name: tag.name,
            type: tag.type,
            description: tag.description
          });
        } else {
          tags[tag.title] = tag.description;
        }
      });
    } else {
      tags = result.tags;
    }
    doc.props[key].tags = tags;
  })

  return `module.exports=${JSON.stringify(doc)}`;
}

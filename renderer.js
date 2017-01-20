const fs = require('fs');
const path = require('path');
const Handebars = require('handlebars');

const rootDirectory = './templates';
const extension = '.hbs';


exports.render = (templateName, data)=> {
  let template = Handebars.compile(fs.readFileSync(path.join(rootDirectory, `${templateName}${extension}`), 'utf8'));
  return template(data);
};

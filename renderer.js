const fs = require('fs');
const path = require('path');
const Handebars = require('handlebars');

const rootDirectory = './templates';
const extension = '.hbs';

const compiledTemplatesCache = {};


function getTemplate(templateName) {
  if (!compiledTemplatesCache[templateName]) {
    compiledTemplatesCache[templateName] = Handebars.compile(fs.readFileSync(path.join(rootDirectory, `${templateName}${extension}`), 'utf8'));
  }
  return compiledTemplatesCache[templateName];
}

exports.render = (templateName, data)=> {
  let template = getTemplate(templateName);
  return template(data);
};

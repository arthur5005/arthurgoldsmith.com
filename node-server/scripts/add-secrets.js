/**
 * This script takes a template and using EJS syntax replaces the needed environment variables with what's 
 * available on the system. The resuling replacement is appended to the existing app.yaml to include 
 * on deplopy to GAE.
 */
const fs = require('fs');

// Changes the working directory to this file. Easier to reason about, and also allows for easier refactoring
process.chdir(__dirname);

function renderTemplate(template, variables) {
  Object
    .entries(variables)
    .forEach(([key, value]) => {
      template = template.replace(new RegExp(`<% ${key} %>`, 'g'), value);
    });
    return template;
}

const template = fs.readFileSync('./../app/app.env.tpl.yaml').toString();
const content = renderTemplate(template, process.env);

fs.appendFileSync('./../app/app.yaml', `\r\n${content}`);

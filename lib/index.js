const inquirer = require('inquirer'),
      colors = require('colors'),
      { readFile, writeFile, lstatSync, readdirSync } = require('fs'),
      { join, resolve } = require('path');

const app = {
  prompt: function() {
    const questions = [{
      type: 'input',
      name: 'currentGitOrigin',
      message: 'Enter Old (Current) Git Origin',
    },
    {
      type: 'input',
      name: 'replaceGitOrigin',
      message: 'Enter New Git Origin',    
    }];
    return inquirer.prompt(questions).then(this.init.bind(this));
  },

  init: function(answers) {
    const isDirectory = source => lstatSync(source).isDirectory();
    const getDirectories = source =>
      readdirSync(source).map(name => join(source, name)).filter(isDirectory);
    
    const currentDir = resolve('.'),
          dirList = getDirectories(resolve('.')),
          oldOrigin = answers.currentGitOrigin,
          oldOriginReg = new RegExp(answers.currentGitOrigin, "g"),
          newOrigin = answers.replaceGitOrigin;

    for(const i in dirList) {
      const gitConfig = dirList[i] + '/.git/config',
            repoName = dirList[i].substring(dirList[i].length, currentDir.length);

      readFile(gitConfig, 'utf8', (err,data) => {
        if (err) {
          return console.log('[!]NO GIT CONFIG FOUND IN: '.red + `.${repoName}/`);
        }

        if(data.includes(oldOrigin)) { 
          const result = data.replace(oldOriginReg, newOrigin);
          
          writeFile(gitConfig, result, 'utf8', (err) => {
             if (err) {
                return console.log(err);
              }
              return console.log('[*]UPDATED: '.green + `.${repoName}/.git/config`);
          });
        }
        else {
          console.log('[-]GIT ORIGIN NOT FOUND '.yellow + `"${oldOrigin}" `.blue  + `in .${repoName}/.git/config`);
        }
      });
    }
  }
};

module.exports = app;
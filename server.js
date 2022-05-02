const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const menuStart = require('./lib/menu');

const console = require('console');
  

console.log(
    chalk.yellow(
        figlet.textSync('EMPLOYEE MANAGER', { width: 50,  verticalLayout: 'default' })
      )
);

menuStart();
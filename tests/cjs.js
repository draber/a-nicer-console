const console = require('../src');
const tasks = require('./tasks.js');
const chalk = require('chalk');

console.log("\n")
console.log(chalk.bgGreen.black(' `console-extra` with CommonJS and `require` '));
tasks(console)
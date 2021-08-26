const console = require('../src');
const tasks = require('./tasks.js');
const chalk = require('chalk');

console.log("\n")
console.log(chalk.bgGreen.black(' `a-nicer-console` with CommonJS and `require` '));
tasks(console)
import console from '../src/index.js';
import tasks from './tasks.js';
import chalk from 'chalk';

console.log("\n")
console.log(chalk.bgGreen.black(' `console-extra` with ESM imports '));
tasks(console)
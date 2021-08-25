const console = require('console');
const util = require('util');
const chalk = require('chalk');
const fs = require('fs-extra');
const Color = require('color');
const ansiStyles = require('ansi-styles');

const configFile = 'console-config.json';

const defaultConfig = {
    log: 'console.log',
    colors: {
        error: '#FF5E5B',
        warn: '#FFBA5B',
        info: '#4DBDD9',
        success: '#ACDB4E',
        log: 'reset'
    }
}

const userConfig = fs.pathExists(configFile) ? fs.readJSONSync(configFile) : {}
const config = {
    colors: {
        ...defaultConfig.colors,
        ...userConfig.colors
    }
}
config.log = userConfig.log || defaultConfig.log;


for (let [type, color] of Object.entries(config.colors)) {
    if (!Object.keys(ansiStyles).includes(color)) {
        config.colors[type] = Color(color).hex();
    }
}

for (const [fn, color] of Object.entries(config.colors)) {
    console['_' + fn] = console[fn] ? console[fn] : console.log;
    console[fn] = (...msg) => {
        msg.forEach(part => {
            if (Object.prototype.toString.call(part) === '[object Object]') {
                console['_' + fn](util.inspect(part, false, null, true));
            } else {
                console['_' + fn](color.startsWith('#') ? chalk.hex(color)(part) : chalk[color](part));
            }
        })
    }
}

console.file = (...msg) => {
    const line = '\n' + '-'.repeat(75) + "\n";    
    fs.ensureFile(config.log)
        .then(() => {
            const stream = fs.createWriteStream(config.log, {
                flags: 'a'
            });
            stream.write(new Date().toISOString() + line);
            msg.forEach(part => {
                if (Object.prototype.toString.call(part) === '[object Object]') {
                    part = JSON.stringify(part, null, '\t');
                }
                stream.write(part + line);
            })
            stream.end();
        })
        .catch(err => {
            console.error(err)
        })
};

module.exports = console;
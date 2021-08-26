const console = require('console');
const util = require('util');
const fs = require('fs-extra');
const helpers = require('./helpers.js');

for (const [fn, color] of Object.entries(helpers.getColors())) {
    console['_' + fn] = console[fn] ? console[fn] : console.log;
     /**
     * Colorize string messages, expand objects
     * @param msg
     */
    console[fn] = (...msg) => {
        msg.forEach(part => {
            if (Object.prototype.toString.call(part) === '[object Object]') {
                console['_' + fn](util.inspect(part, false, null, true));
            } else {
                console['_' + fn](helpers.colorize(color, part));
            }
        })
    }
}

/**
 * Write console output to a log file
 * @param msg
 * @returns {Promise<void>}
 */
console.file = async (...msg) => {
    const line = '\n' + '-'.repeat(75) + "\n";  
    const logFile = helpers.getLog();
    fs.ensureFile(logFile)
        .then(() => {
            const stream = fs.createWriteStream(logFile, {
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
            console.info(`${msg.length === 1 ? "Message" : "Message"} logged in ${logFile}`);
        })
        .catch(error => {
            console.error(error);
        })
};

module.exports = console;
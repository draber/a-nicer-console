const fs = require('fs-extra');
const chalk = require('chalk');
const ansiKeywords = Object.keys(require('ansi-styles'));

const configFile = 'console-config.json';

const defaultConfig = {
    log: 'logs/console.log',
    colors: {
        error: '#FF5E5B',
        warn: '#FFBA5B',
        info: '#4DBDD9',
        success: '#ACDB4E',
        log: 'reset'
    }
}

const userConfig = fs.pathExistsSync(configFile) ? fs.readJsonSync(configFile) : {};

/**
 * Return all function names and their decorations
 * @returns {{warn: string, log: string, success: string, error: string, info: string, ...}}
 */
exports.getColors = () => {
    return {
        ...defaultConfig.colors,
        ...(userConfig.colors || {})
    }
}

/**
 * Colorize string messages
 * @param color
 * @param part
 * @returns {String}
 */
exports.colorize = (color, part) => {
    if (Array.isArray(color)) {
        return chalk.rgb(...color)(part);
    }
    else if (color.startsWith('#')) {
        return chalk.hex(color)(part);
    }
    else if (ansiKeywords.includes(color)) {
        return chalk[color](part);
    }
    return part;
}

/**
 * Path to log file
 * @returns {String}
 */
exports.getLog = () => {
    return userConfig.log || defaultConfig.log;
}
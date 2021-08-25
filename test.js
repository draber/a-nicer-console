const console = require('console-extra');

// Colored console output when using `console.error|warn|info|success`
console.error('This is an error and should be red~ish');
console.warn('This is a warning and should be yellow~ish');
console.info('This is some information and should be blue~ish');
console.success('This is a success message and should be green~ish');

// Logging of deeply nested objects
const obj = {
    a: {
        deeply: {
            nested: {
                object: {
                    that: {
                        has: {
                            a: [
                                'large',
                                'number',
                                'of',
                                'layers'
                            ]
                        }
                    }
                }
            }
        }
    }
}

console.log(obj); // will print the above object whereas the native console at some point would only print `[object Object]`


// `console.file` writes the log to a file of you choice
console.file('This message should be written to `logs/my-log.txt`'); // will write to the log file

// adding own functions to the configuration file
// {
//     colors: {
//         customFunction: 'rebeccapurple'
//     }
// }
console.customFunction('This is a message which should be rebeccapurple');

// test if all native functions still work
for (let fn of Object.keys(console)) {
    let msg = fn;
    if (typeof console[fn] === 'function' && fn !== 'Console') {
        console.info('Current function is `console.' + fn + '()`')
        switch (fn) {

            case 'dir':
            case 'table':
                msg = {
                    some: 'object'
                }
                break;
            case 'time':
            case 'timeEnd':
            case 'timeLog':
                msg = 'time'
                break;
            case 'count':
            case 'countReset':
                msg = 'count'
                break;
        }
        console[fn](msg)
    }
}
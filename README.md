# console-extra
Fancy extras for the Node console

## Installation
You can add `console-extra` to your project with
```bash
npm i console-extra
```

## Features
This is a drop-in replacement for Node's native console; all the original `console` functions remain intact.
- Colored console output when using `console.error|warn|info|success`
- Logging of deeply nested objects
- Adds function `console.success` which is essentially `console.log` in a green tone
- Adds function `console.file` which writes the log to a file instead of `stdout`
- You can add your own functions by adding a key-value pair to the color configuration. This will, just like `console.success`, be a colorized version of `console.log`

# Usage
```bash
import console from 'console-extra' // or const console = require('console-extra')

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

console.log(obj); // will print the above object whereas the native console would 
                  // print '{ a: { deeply: { nested: [Object] } } }'. 
                  // You could achieve the same with `console.dir` but would have to 
                  // add a configuration object


// `console.file` writes the log to a file of you choice
console.file('This message should be written to `logs/my-log.txt`'); // will write to the log file

// adding own functions to the configuration file
// {
//     colors: {
//         customFunction: 'rebeccapurple'
//     }
// }
console.customFunction('This is a message which should be rebeccapurple');

```

## Configuration

The default configuration is 
```bash
{
    log: 'console.log',
    colors: {
        error: '#FF5E5B',
        warn: '#FFBA5B',
        info: '#4DBDD9',
        success: '#ACDB4E',        
        log: 'reset'
    }
}
```
To overwrite these values create a file called `console-config.json` at the root of your project, all values are optional. 

There are types of acceptable values:

- [ANSI escape codes](https://github.com/chalk/ansi-styles/blob/main/index.js#L11)
- CSS color names
- CSS color functions
- CSS hex colors

Besides the ANSI codes, pretty much anything you could [use in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/color) will also work in this configuration. Color conversion is done with the [color package](https://www.npmjs.com/package/color), see their site for more options. 

Your configuration could for instance look like this:
```bash
{
    log: 'logs/my-log.txt',
    colors: {
        error: 'hsl(0, 100%, 50%)',
        warn: 'rgb(255, 204, 0)',
        info: 'azure',
        success: '#ACDB4E',
        log: 'reset',
        customFunction: 'rebeccapurple'
    }
}
```

## Credits

Under the hood, `console-extra` uses [chalk](https://www.npmjs.com/package/chalk), [color](https://www.npmjs.com/package/color) and [fs-extra](https://www.npmjs.com/package/fs-extra). And then of course whatever they are using as well. Thanks to all of them for their work!


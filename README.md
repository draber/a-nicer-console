# a-nicer-console
Fancy extras for the Node console.

## Features
This is a drop-in replacement for Node's native console; all the original `console` functions remain intact.
- Adds colors to the output when using `console.error|warn|info|success`
- Logs deeply nested objects
- Adds the function `console.success` which is essentially `console.log` in a, by default, green tone
- Adds the function `console.file` which writes the log to a file instead of `stdout`
- Allows adding your own functions by adding a key-value pair to the color configuration. This will, just like `console.success`, be a colorized version of `console.log`

## Installation
You can add `a-nicer-console` to your project with:
```bash
npm i a-nicer-console
```

## Usage

```javascript
import console from 'a-nicer-console' 
// alternatively: const console = require('a-nicer-console')

// Colored console output when using `console.error|warn|info|success`
console.error('This is an error message');
console.warn('This is a warning message');
console.info('This is an info message');
console.success('This is a success message, a functionality provided by this package');

// Outputting of deeply nested objects
const obj = { /* some deeply nested Object */ };

// Output the whole object; the native console would only print: 
// { a: { deeply: { nested: [Object] } } }. 
// In difference to `console.dir` you don't need to provide a configuration object.
console.log(obj); 

// Write to a log file, by default
console.file(obj, 'The large object and this message should be written to your log file');
```

## Configuration

Maybe you like this package but the colors aren’t to your taste. Or you want to add `console.foo()` in some fancy color. Finally, if you are using a log file, you have to provide the path to this file somewhere. This is where the configuration file comes into the game.

Let’s see how this works. The default configuration looks like this: 
```javascript
{
    log: 'logs/console.log',
    colors: {
        error: '#FF5E5B',
        warn: '#FFBA5B',
        info: '#4DBDD9',
        success: '#ACDB4E',
        log: 'reset'
    }
}
```
To overwrite these values create a file called `console-config.json` at the root of your project, all values are optional. This package contains a file called [console-config.example](https://github.com/draber/a-nicer-console/blob/main/console-config.example) that you can use as a template. 

### Acceptable values

- [ANSI escape codes](https://github.com/chalk/ansi-styles/blob/main/index.js#L11). Some of these values allow adding formats such as bold or italic etc.
- RGB arrays (e.g. `[51, 51, 102]`)
- Colors in hex format (e.g. `#333366` or `#336`)

### Adding custom functions

Custom functions provide a new flavor of `console.log` with your own colors, nothing complex. Add a key-value pair to your configuration file like in this example:
```json
{
    "colors": {
        "customFunction": [253, 134, 18]
    }
}
```
You can use this new flavor like so:
```javascript
console.customFunction('This is a message which should be orange');
```
### Example configuration

Your `console-config.json` should look about like this, again, all values are optional:
```json
{
   "log": "logs/my-log.txt",
   "colors": {
      "error": [255, 0, 0],
      "warn": "#ff0",
      "info": "blueBright",
      "success": "#00ff00",
      "log": "reset",
      "customFunction": [253, 134, 18]
   }
}
```

## Credits

Under the hood, `a-nicer-console` uses [chalk](https://www.npmjs.com/package/chalk) and a bit of [fs-extra](https://www.npmjs.com/package/fs-extra). And then of course whatever they are using as well. Thanks to the authors for their work!


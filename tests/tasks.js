/**
 * Dummy object to demonstrate output of deeply nested objects
 */
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

/**
 * Perform the tests, results will be appear either on the CLI or in the log file
 * @param console
 * @returns {Promise<void>}
 */
const tasks = console => {

    // Colored console output when using `console.error|warn|info|success`
    console.error('This is an error message');
    console.warn('This is a warning message');
    console.info('This is an info message');
    console.success('This is a success message, a functionality provided by this package');

    // Use a custom function (only available when configured in `console.config.json`)
    if(console.customFunction){
        console.customFunction('This is a message printed with a custom function');
    }
    
    // Print all levels of  nested object
    console.log(obj); 

    // Write to the log file
    console.file(obj, 'The large object and this message should be written to your log file');

}


module.exports = tasks;
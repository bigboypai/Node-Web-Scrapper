const decompress = require('decompress');
 
decompress('data/spreadsheet/2024-01-31.zip', 'dist').then(files => {
    console.log('done!');
});
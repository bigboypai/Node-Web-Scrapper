const decompress = require('decompress');

const decompressZIP = (sourcePath, destinationPath) => {
    decompress(sourcePath, destinationPath)
        .then(files => {
            console.log('Successfully extracted the data');
        })
        .catch(error => {
            console.error('Error during decompression:', error);
        });
};

module.exports = { decompressZIP };

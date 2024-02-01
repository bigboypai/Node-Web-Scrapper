const decompress = require('decompress');

const decompressZIP = (sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        decompress(sourcePath, destinationPath)
            .then(files => {
                console.log('Successfully extracted the data');
                resolve(files);
            })
            .catch(error => {
                console.error('Error during decompression:', error);
                reject(error);
            });
    });
};

module.exports = { decompressZIP };

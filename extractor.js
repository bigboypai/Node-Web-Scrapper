const decompress = require('decompress');
const fs = require('fs')

const decompressZIP = (sourcePath, destinationPath) => {
    return new Promise((resolve, reject) => {
        console.log(`Attempting to decompress ZIP file from ${sourcePath} to ${destinationPath}...`);
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

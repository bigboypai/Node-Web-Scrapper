// const fs = require('fs');

// const fileExists = (path) => {
//     try {
//         fs.statSync(path);
//         return true;
//     } catch (err) {
//         if (err.code === 'ENOENT') {
//             return false;
//         } else {
//             throw err;
//         }
//     }
// };

// const cleanUpFunction = (file) => {
//     if (!fileExists(file)) {
//         return;
//     } else {
//         fs.unlink(file, (err) => {
//             if (err) {
//                 console.error(`Error deleting file ${file}:`, err);
//             } else {
//                 console.log(`File ${file} deleted successfully.`);
//             }
//         });
//     }
// };

// const filePath = 'data/spreadsheet/2024-02-01.zip';

// cleanUpFunction(filePath);

// module.exports = { cleanUpFunction };
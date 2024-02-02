const fs = require('fs').promises;
const path = require('path');

const cleanUpFolder = async (folderPath) => {
    try {
        const files = await fs.readdir(folderPath);

        // Use Promise.all to await all removal operations
        await Promise.all(files.map(async (file) => {
            const filePath = path.join(folderPath, file);
            const stats = await fs.stat(filePath);

            if (stats.isDirectory() && !['data', 'database'].includes(file)) {
                // If it's a directory (excluding 'data' and 'database'), recursively call cleanUpFolder
                await cleanUpFolder(filePath);
            } else if (stats.isFile()) {
                // If it's a file, unlink (delete) the file
                await fs.unlink(filePath);
            }
        }));

        console.log(`Cleaned up folder: ${folderPath}`);
    } catch (error) {
        console.error(`Error during cleanup: ${error}`);
        throw error;
    }
};

module.exports = { cleanUpFolder };

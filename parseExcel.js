const fs = require('fs').promises;
const ExcelJS = require('exceljs');

async function parseExcel(files, outputFilePath) {
    try {
        // Create a new Excel workbook
        const workbook = new ExcelJS.Workbook();

        // Add each file to the workbook
        for (const file of files) {
            const worksheet = await workbook.xlsx.readFile(file);
            const worksheetName = file.replace('.xlsx', ''); // Extracting name from the file path
            workbook.addWorksheet({ properties: { name: worksheetName } });
        }

        // Save the combined workbook to a single Excel file
        await workbook.xlsx.writeFile(outputFilePath);

        console.log(`Combined Excel file saved to: ${outputFilePath}`);
    } catch (err) {
        console.error('Exception encountered while parsing Excel files', err);
        throw err;
    }
}

module.exports = { parseExcel };

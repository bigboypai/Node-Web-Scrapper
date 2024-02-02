const { downloadPDF } = require('./webscrapper');
const { pdfToExcel } = require('./formatter');
const { decompressZIP } = require('./extractor');
const { cleanUpFolder } = require('./cleanup')
const { parseExcel } = require('./parseExcel')

const URL = 'https://www.pima.go.cr/boletin/';
const zipFilePath = 'data/spreadsheet/2024-02-01.zip';
const outputDirectory = 'database';

async function main() {
    try {
        await cleanUpFolder('data');
        await cleanUpFolder('database');
        
        await downloadPDF(URL);
        await pdfToExcel();
        await decompressZIP(zipFilePath, outputDirectory);
        const excelFiles = ['database/tables/fileoutpart0.xlsx', 'database/tables/fileoutpart1.xlsx']; // Update with your actual file names
        const outputExcelFilePath = createOutputFilePath('xlsx');

        // await parseExcel(excelFiles, outputExcelFilePath);

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

function createOutputFilePath(extension) {
    let date = new Date();
    let dateString = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2);
    return `data/spreadsheet/${dateString}.${extension}`;
}

main();
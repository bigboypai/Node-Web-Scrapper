const { downloadPDF } = require('./webscrapper');
const { pdfToExcel } = require('./formatter');

const URL = 'https://www.pima.go.cr/boletin/';

async function main() {
    try {
        console.log('Starting PDF download...');
        await downloadPDF(URL);
        console.log('PDF download completed.');

        console.log('Starting PDF to Excel conversion...');
        await pdfToExcel();
        console.log('PDF to Excel conversion completed.');

        // Add additional steps here

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

main();

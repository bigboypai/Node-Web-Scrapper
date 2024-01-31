const { downloadPDF } = require('./webscrapper');
const { pdfToExcel } = require('./formatter');

const URL = 'https://www.pima.go.cr/boletin/';

downloadPDF(URL)
  .then(() => {
    console.log('PDF download completed.');
    return pdfToExcel();
  })
  .then(() => {
    console.log('PDF to Excel conversion completed.');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });

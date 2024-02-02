require('dotenv').config();
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

const pdfToExcel = async () => {
    try {
        // Initial setup, create credentials instance.
        const credentials = PDFServicesSdk.Credentials
            .servicePrincipalCredentialsBuilder()
            .withClientId(process.env.PDF_SERVICES_CLIENT_ID)
            .withClientSecret(process.env.PDF_SERVICES_CLIENT_SECRET)
            .build();

        // Create an ExecutionContext using credentials
        const executionContext = PDFServicesSdk.ExecutionContext.create(credentials);

        // Build extractPDF options
        const options = new PDFServicesSdk.ExtractPDF.options.ExtractPdfOptions.Builder()
            .addElementsToExtract(PDFServicesSdk.ExtractPDF.options.ExtractElementType.TEXT, PDFServicesSdk.ExtractPDF.options.ExtractElementType.TABLES)
            .build();

        // Create a new operation instance.
        const extractPDFOperation = PDFServicesSdk.ExtractPDF.Operation.createNew(),
            input = PDFServicesSdk.FileRef.createFromLocalFile(
                'data/SIMM-Boletin de Precios PIMA-Plaza 2024-02-01.pdf',
                PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
            );

        // Set operation input from a source file.
        extractPDFOperation.setInput(input);

        // Set options
        extractPDFOperation.setOptions(options);

        // Generating a file name
        let outputFilePath = createOutputFilePath();

        // Use await for the asynchronous execute method
        const result = await extractPDFOperation.execute(executionContext);

        // Use await for the asynchronous saveAsFile method
        await result.saveAsFile(outputFilePath);

        console.log(result);
    } catch (err) {
        console.error('Exception encountered while executing operation', err);
        throw err; // Throw the error to be caught by the calling function
    }
};

function createOutputFilePath() {
    let date = new Date();
    let dateString = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
        ("0" + date.getDate()).slice(-2);
    return ("data/spreadsheet/" + dateString + ".zip");
}

module.exports = { pdfToExcel };

require('dotenv').config();
const PDFServicesSdk = require('@adobe/pdfservices-node-sdk');

const pdfToExcel = () => {
    return new Promise((resolve, reject) => {
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
                    'data/SIMM-Boletin de Precios PIMA-Plaza 2024-01-31.pdf',
                    PDFServicesSdk.ExtractPDF.SupportedSourceFormat.pdf
                );

            // Set operation input from a source file.
            extractPDFOperation.setInput(input);

            // Set options
            extractPDFOperation.setOptions(options);

            // Generating a file name
            let outputFilePath = createOutputFilePath();

            extractPDFOperation.execute(executionContext)
                .then(result => {
                    result.saveAsFile(outputFilePath);
                    console.log(result);
                    resolve(); // Resolve the promise when done
                })
                .catch(err => {
                    if (err instanceof PDFServicesSdk.Error.ServiceApiError
                        || err instanceof PDFServicesSdk.Error.ServiceUsageError) {
                        console.log('Exception encountered while executing operation', err);
                        reject(err); // Reject the promise if an error occurs
                    } else {
                        console.log('Exception encountered while executing operation', err);
                        reject(err); // Reject the promise if an error occurs
                    }
                });

            function createOutputFilePath() {
                let date = new Date();
                let dateString = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" +
                    ("0" + date.getDate()).slice(-2);
                return ("data/spreadsheet/" + dateString + ".zip");
            }

        } catch (err) {
            console.log('Exception encountered while executing operation', err);
            reject(err); // Reject the promise if an error occurs
        }
    });
};

module.exports = { pdfToExcel };

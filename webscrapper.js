const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const fs = require('fs')

async function downloadPDF(url, outpath) {
  const downloadFolder = path.resolve(__dirname, 'boletines'); // Set your desired download folder here

  const options = new chrome.Options();
  options.setUserPreferences({ 'download.default_directory': downloadFolder });
  options.addArguments('--headless');

  const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

  try {
    await driver.get(url);

    const iframeElement = await driver.findElement(By.tagName('iframe'));
    await driver.switchTo().frame(iframeElement);

    await driver.wait(until.elementLocated(By.xpath('//a[contains(text(), "Documentos adjuntos")]')), 5000);

    await driver.findElement(By.xpath('//a[contains(text(), "Documentos adjuntos")]')).click();

    await driver.wait(async () => {
      const files = await fs.promises.readdir(downloadFolder);
      return files.some(file => file.endsWith('.pdf'));
    }, 10000);

    console.log('PDF downloaded successfully to ' + downloadFolder); 
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await driver.switchTo().defaultContent();
    await driver.quit();
  }
}

const URL = 'https://www.pima.go.cr/boletin/';
const OUTPATH = 'boletin.pdf';

downloadPDF(URL), OUTPATH;

const browserObject = require('./browser');
const scraperController = require('./pageController');

//Start the browser and create a browser instance
let browserInstance = browserObject.startBrowser();

async function doSomething(endOfUrl) {
    // Pass the browser and end of url to the scraper controller
    const result = scraperController(browserInstance, endOfUrl)
    return result
}

module.exports = doSomething
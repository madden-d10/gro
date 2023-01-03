const pageScraper = require('./pageScraper');
async function scrapeAll(browserInstance, endOfURL){
	let browser;
	try{
		browser = await browserInstance;
		const result = await pageScraper.scraper(browser, endOfURL);	
		return result;
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance, endOfUrl) => scrapeAll(browserInstance, endOfUrl)
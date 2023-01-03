const fs = require('fs')

const scraperObject = {
	async scraper(browser, endOfURL){
		const url = `https://www.gardenersworld.com/${endOfURL}`
		let page = await browser.newPage();
		console.log(`Navigating to ${url}`);
		await page.goto(url);

		// Wait for the required DOM to be rendered
		await page.waitForSelector('.editor-content');

		let results = []
		results = await page.$$eval('.editor-content', items => {
			items = items.map(el => el.querySelector('p')?.textContent)
			return items;
		});
		
		return results
	}
}

module.exports = scraperObject;
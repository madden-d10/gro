const fs = require('fs')

const scraperObject = {
	async scraper(browser, endOfURL){
		const url = `https://www.rhs.org.uk/${endOfURL}`
		let page = await browser.newPage();
		console.log(`Navigating to ${url}`);
		await page.goto(url);

		// Wait for the required DOM to be rendered
		await page.waitForSelector('body');

		let results = []
		results = await page.$$eval('.accordion-v2__panel', items => {
			const itemsP = items.map(el => el.querySelector('p')?.textContent)
			const itemsLI = items.map(el => el.querySelector('li')?.textContent)
			return [...itemsP, ...itemsLI];
		});
		
		return results
	}
}

module.exports = scraperObject;
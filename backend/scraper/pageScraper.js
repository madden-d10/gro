const fs = require('fs')

const scraperObject = {
	url: 'https://www.gardenersworld.com/how-to/grow-plants/page/1/',
	async scraper(browser){
		const allURLs = []
		let urls = []
		let page = await browser.newPage();

		let i = 1
		while (i <= 95) {
			this.url = `https://www.gardenersworld.com/how-to/grow-plants/page/${i}/`
			await page.goto(this.url);
			console.log(`Navigating to ${this.url}`);

			// Wait for the required DOM to be rendered
			await page.waitForSelector('#main-content');
			urls = await page.$$eval('.standard-card-new__display-row', links2 => {
				// Extract the links from the data
				links2 = links2.map(el => el.querySelector('.qa-card-link')?.href)
				return links2;
			});

			allURLs.concat(...urls)
			console.log(urls)
			i++
		}
		console.log('DONE')
		fs.appendFile('file.json', JSON.stringify(allURLs), err => {
			if (err) {
			  console.error(err);
			}
		  });
	}
}

module.exports = scraperObject;
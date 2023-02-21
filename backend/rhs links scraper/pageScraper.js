const fs = require('fs')
const partialUrls = require('./typesLinks.json')

const scraperObject = {
	url: 'https://www.rhs.org.uk/plants/popular',
    async scraper(browser){
        // const allURLs = []
        // let urls = []
        let page = await browser.newPage();
		// await page.goto(this.url);
		// console.log(`Navigating to ${this.url}`);
		// await this.autoScroll(page)

		// // Wait for the required DOM to be rendered
		// await page.waitForSelector('body');
		// urls = await page.$$eval('.u-faux-block-link', links => {
		// 	// Extract the links from the data
		// 	return links.map(el => el.querySelector('a')?.href)
		// });

		// console.log(urls)
		let growingGuides = []
		for (const url of partialUrls) {
			await page.goto('https://www.rhs.org.uk/' + url);
			await page.waitForSelector('body');

			typePageLinks = await page.$$eval('.u-faux-block-link', links => {
				// Extract the links from the data
				return links.map(el => el.querySelector('a')?.href)
			});

			const growingGuideLinks = typePageLinks.filter(link => link.includes('growing-guide'))
			growingGuides.push(growingGuideLinks[0])
			
			console.log(growingGuides)
		}
		
		console.log(growingGuides)

        // console.log('DONE')
        // fs.appendFile('file.json', JSON.stringify(allURLs), err => {
        //     if (err) {
        //       console.error(err);
        //     }
        //   });

		console.log('DONE')
		fs.appendFile('file2.json', JSON.stringify(growingGuides), err => {
			if (err) {
			console.error(err);
			}
		});
    },

	async autoScroll(page){
		await page.evaluate(async () => {
			await new Promise((resolve) => {
				var totalHeight = 0;
				var distance = 100;
				var timer = setInterval(() => {
					var scrollHeight = document.body.scrollHeight;
					window.scrollBy(0, distance);
					totalHeight += distance;
	
					if(totalHeight >= scrollHeight - window.innerHeight){
						clearInterval(timer);
						resolve();
					}
				}, 100);
			});
		});
	}

	// async scraper(browser, endOfURL){
	// 	const url = `https://www.gardenersworld.com/${endOfURL}`
	// 	let page = await browser.newPage();
	// 	console.log(`Navigating to ${url}`);
	// 	await page.goto(url);

	// 	// Wait for the required DOM to be rendered
	// 	await page.waitForSelector('.editor-content');

	// 	let results = []
	// 	results = await page.$$eval('.editor-content', items => {
	// 		items = items.map(el => el.querySelector('p')?.textContent)
	// 		return items;
	// 	});
		
	// 	return results
	// }
}

module.exports = scraperObject;
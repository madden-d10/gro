const fs = require('fs')

const scraperObject = {
	url: 'https://www.gardenersworld.com/how-to/grow-plants/page/1/',
	async scraper(browser){
		const allURLs = []
		let urls = []
		let page = await browser.newPage();
		// console.log(`Navigating to ${this.url}`);
		// await page.goto(this.url);

		// Wait for the required DOM to be rendered
		// await page.waitForSelector('#main-content');
		// // Get the link to all the required books
		// urls = await page.$$eval('.standard-card-new__display-row', links => {
		// 	// Make sure the book to be scraped is in stock
		// 	// links = links.filter(link => link.querySelector('.instock.availability > i').textContent !== "In stock")
		// 	// Extract the links from the data
		// 	links = links.map(el => el.querySelector('h4 > a').href)
		// 	return links;
		// });

		// allURLs.push(...urls)

		let i = 1
		while (i <= 95) {
			this.url = `https://www.gardenersworld.com/how-to/grow-plants/page/${i}/`
			await page.goto(this.url);
			console.log(`Navigating to ${this.url}`);

			// Wait for the required DOM to be rendered
			await page.waitForSelector('#main-content');
			// Get the link to all the required books
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


        // Loop through each of those links, open a new page instance and get the relevant data from them
		// let pagePromise = (link) => new Promise(async(resolve, reject) => {
		// 	let dataObj = {};
		// 	let newPage = await browser.newPage();
		// 	await newPage.goto(link);
		// 	dataObj['bookTitle'] = await newPage.$eval('.product_main > h1', text => text.textContent);
		// 	dataObj['bookPrice'] = await newPage.$eval('.price_color', text => text.textContent);
		// 	dataObj['noAvailable'] = await newPage.$eval('.instock.availability', text => {
		// 		// Strip new line and tab spaces
		// 		text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
		// 		// Get the number of stock available
		// 		let regexp = /^.*\((.*)\).*$/i;
		// 		let stockAvailable = regexp.exec(text)[1].split(' ')[0];
		// 		return stockAvailable;
		// 	});
		// 	dataObj['imageUrl'] = await newPage.$eval('#product_gallery img', img => img.src);
		// 	dataObj['bookDescription'] = await newPage.$eval('#product_description', div => div.nextSibling.nextSibling.textContent);
		// 	dataObj['upc'] = await newPage.$eval('.table.table-striped > tbody > tr > td', table => table.textContent);
		// 	resolve(dataObj);
		// 	await newPage.close();
		// });

		// for(link in urls){
		// 	let currentPageData = await pagePromise(urls[link]);
		// 	// scrapedData.push(currentPageData);
		// 	console.log(currentPageData);
		// }
	}
}

module.exports = scraperObject;
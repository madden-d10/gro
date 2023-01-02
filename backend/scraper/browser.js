const puppeteer = require('puppeteer-core');
const {executablePath} = require('puppeteer-core')

async function startBrowser(){
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: false,
	        args: ["--disable-setuid-sandbox"],
	        'ignoreHTTPSErrors': true,
          executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};
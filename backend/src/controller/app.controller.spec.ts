const puppeteer = require('puppeteer');

describe('App styling', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000'); 
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should apply styles to the heading', async () => {
    const headingStyle = await page.evaluate(() => {
      const heading = document.querySelector('h1');
      return window.getComputedStyle(heading).getPropertyValue('color');
    });

    expect(headingStyle).toEqual('rgb(0, 0, 0)'); 
  });


});

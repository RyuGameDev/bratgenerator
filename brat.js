const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://www.bratgenerator.com/'); 
  await page.locator('#onetrust-accept-btn-handler').click(); 
  await page.locator('#toggleButtonWhite').waitFor({ state: 'visible' });
  await page.click('#toggleButtonWhite');
  await page.fill('#textInput', 'KONTOLL'); 
  await page.waitForTimeout(500); 
  const memeContainer = page.locator('#textOverlay');
  await memeContainer.screenshot({ path: 'meme-container.png' });
  await browser.close();
})();

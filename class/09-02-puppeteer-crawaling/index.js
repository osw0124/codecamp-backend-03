import puppeteer from "puppeteer";

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.goodchoice.kr/product/search/2");
  await page.waitForTimeout(1000);

  const stage = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.name > div > span", (el) => {
    return el.textContent.trim();
  });

  const location = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.name > p:nth-child(4)", (el) => {
    return el.textContent.trim();
  });

  const price = await page.$eval("#poduct_list_area > li:nth-child(2) > a > div > div.price > p > b", (el) => {
    return el.textContent.trim();
  });

  console.log(stage, location, price);
}

startCrawling();

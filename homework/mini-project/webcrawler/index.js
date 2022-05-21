import puppeteer from "puppeteer";
import mongoose from "mongoose";

import { Menu } from "./models/menuSchema.js";

mongoose.connect("mongodb://localhost:27017/miniProject").catch((error) => handleError(error));

async function startCrawling() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");
  await page.waitForTimeout(1000);

  const dd_len = await page.$$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd`, (el) => el.length * 2);
  let li_len;

  for (let i = 2; i <= dd_len; i += 2) {
    li_len = await page.$$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul > li`, (el) => el.length);
    for (let j = 1; j <= li_len; j++) {
      let name = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul > li:nth-child(${j}) > dl > dd`, (el) =>
        el.textContent.trim()
      );
      let img = await page.$eval(`#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${i}) > ul > li:nth-child(${j}) > dl > dt > a > img`, (el) =>
        el.getAttribute("src")
      );

      const menu = new Menu({
        name: name,
        img: img,
      });

      await menu.save();
    }
  }

  await browser.close();
}

startCrawling();

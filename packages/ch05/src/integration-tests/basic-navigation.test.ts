import portfinder from 'portfinder';
import puppeteer from 'puppeteer';
import app from '../meadowlark';
import { Server } from 'http';

let server: Server = null;
let port: number = null;
beforeEach(async () => {
  port = await portfinder.getPortPromise();
  server = app.listen(port);
});
afterEach(() => {
  server.close();
});
test('домашняя страница ссылается на страницу Описание', async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`);
  await Promise.all([
    page.waitForNavigation(),
    page.click('[data-test-id="about"]'),
  ]);
  expect(page.url()).toBe(`http://localhost:${port}/about`);
  await browser.close();
});

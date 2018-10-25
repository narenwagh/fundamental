const {
  setWorldConstructor
} = require("cucumber");
const {
  expect
} = require("chai");
const puppeteer = require("puppeteer");

const PAGES = {
  main: "http://localhost:4000/"
};

class FundamentalWorld {
  constructor() {
  }

  async openPage() {
    this.browser = await puppeteer.launch({
      headless: false
    });
    this.page = await this.browser.newPage();
    await this.page.goto(PAGES.main);
  }

  async closePage() {
    await this.browser.close();
  }

  checkPage(p) {
    if (p === 'main') expect(this.page.url()).to.eql(PAGES.main);
  }

  async supportLinkExists() {
    const supportLinkSelector = 'a.docs-top-nav__support';
    await this.page.evaluate((x) => document.querySelector(x), supportLinkSelector);
  }

  async checkSupportDropdown() {
    const supportDropdownSelector = '#aqn0K794';

    // Checks for a hidden dropdown
    let optionsState = await this.page.evaluate((x) => document.querySelector(x).getAttribute('aria-hidden'), supportDropdownSelector);
    expect(optionsState).to.be.eql('true');

    // Clicks on support link
    const supportLinkSelector = 'a.docs-top-nav__support';
    await this.page.click(supportLinkSelector);

    // Checks if the dropdown is visible
    optionsState = await this.page.evaluate((x) => document.querySelector(x).getAttribute('aria-hidden'), supportDropdownSelector);
    expect(optionsState).to.be.eql('false');

    // Checks the number of options in dropdown
    const optionsCount = await this.page.evaluate((x) =>
      document.querySelector(x).childElementCount, supportDropdownSelector);
    expect(optionsCount).to.eql(2);
  }
}

setWorldConstructor(FundamentalWorld);
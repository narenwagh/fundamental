const {
  Given,
  When,
  Then,
  After,
  Before
} = require("cucumber");

Before(async function (testCase) {
  return await this.openPage();
});

After(async function () {
  return await this.closePage();
});

When("I click enter", async function () {
  return await this.submit();
});

Given("I am in {string} page", function (p) {
  this.checkPage(p);
});

Then('Support link exists', async function () {
  return await this.supportLinkExists();
});

Then("I click on Support", async function () {
  return await this.checkSupportDropdown();
});
  import { Given, When, Then } from "@cucumber/cucumber";
  import { fixture } from "../../hooks/pageFixture";
  import { LoginPage } from "../../pages/loginPage";
  let loginPage: LoginPage;
  Given('User is on login page', async function () {
    loginPage = new LoginPage(fixture.page);
    await loginPage.goto();
  });

  Given('User enters the username as {string} and password as {string}', async function (username: string, password: string) {
    await loginPage.login(username, password);
  });

  When('User clicks on login', async function () {
    await loginPage.clickLogin();
  });

  Then('User successfully logs in', async function () {
    await loginPage.searchProduct();
  });

import { Given, Then, When } from "@cucumber/cucumber";
import { formyPage } from "../../pages/formyPage";
import { fixture } from "../../hooks/pageFixture";
let formypage: formyPage;
    Given('user is on home page', async function () {
        formypage=new formyPage(fixture.page);
        await formypage.goto();
    });

    Given('user opens form', async function () {
        await formypage.fillForm();
        await formypage.scrollPage();
        await formypage.dialog();
      });

    Then('user fills Form', async function () {
        console.log("user");
    });

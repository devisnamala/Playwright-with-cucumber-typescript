// LoginPage.ts
import UIActions from "../utils/UIActions";
export class LoginPage {
    private Elements = {
        url: "https://www.saucedemo.com/v1/",
        email: "//input[@id='user-name']",
        password: "//input[@id='password']",
        submit: "//input[@id='login-button']",
        title: "//a[normalize-space()='hotukdeals']"
    };
    uiActions: UIActions;

    constructor(private page: import("@playwright/test").Page) {
        // Initialize UIActions with the page instance
        this.uiActions = new UIActions(this.page);
    }

    async goto() {
        await this.uiActions.navigateTo(this.Elements.url);
    }

    async login(email: string, password: string) {
        await this.uiActions.fillText(this.Elements.email, email);
        await this.uiActions.fillText(this.Elements.password, password);
    }

    async clickLogin() {
        await this.uiActions.click(this.Elements.submit);
    }

    async searchProduct() {
        await this.uiActions.click("//div[@class='inventory_list']//div[1]//div[3]//button[1]");
    }
}

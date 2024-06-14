// UIActions.ts
import { Page } from "@playwright/test";

export default class UIActions {
    constructor(private page: Page) {}

    async navigateTo(url: string) {
        await this.page.goto(url);
    }

    async click(locator: string) {
        await this.page.locator(locator).click();
    }

    async fillText(locator: string, text: string) {
        await this.page.locator(locator).fill(text);
    }
}

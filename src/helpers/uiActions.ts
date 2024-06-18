import { Page, expect } from "@playwright/test";
import Log from "../utils/log";

export default class UIActions {
    constructor(private page: Page) {}

    async navigateTo(url: string) {
        try {
            await this.page.goto(url);
            Log.info("Navigated to url " + url);
        } catch (error) {
            Log.error(`Error navigating to ${url}: ${error}`);
            throw error; // Rethrow the error to propagate it up the call stack
        }
    }

    async click(locator: string) {
        try {
            await this.page.locator(locator).click();
            Log.info("Clicked the locator");
        } catch (error) {
            Log.error(`Error clicking element with locator ${locator}: ${error}`);
            throw error;
        }
    }

    async fillText(locator: string, text: string) {
        try {
            await this.page.locator(locator).fill(text);
            Log.info("Filled text");
        } catch (error) {
            Log.error(`Error filling text into element with locator ${locator}: ${error}`);
            throw error;
        }
    }

    async dropdown(locator: string, option: string) {
        try {
            await this.page.locator(locator).selectOption(option);
            Log.info("Selected value from dropdown");
        } catch (error) {
            Log.error(`Error selecting option '${option}' from dropdown with locator ${locator}: ${error}`);
            throw error;
        }
    }

    async buttonSelect(locator: string) {
        try {
            const isChecked = await this.page.locator(locator).isChecked();
            if (!isChecked) {
                await this.page.locator(locator).check();
                Log.info("Checked option");
            }
        } catch (error) {
            Log.error(`Error selecting button with locator ${locator}: ${error}`);
            throw error;
        }
    }

    async verifyIfChecked(locator: string) {
        try {
            expect(await this.page.locator(locator).isChecked()).toBeTruthy();
            Log.info("Verified Checked option");
        } catch (error) {
            Log.error(`Error verifying if element with locator ${locator} is checked: ${error}`);
            throw error;
        }
    }

    async datePicker(locator: string, value: string) {
        try {
            await this.page.locator(locator).fill(value);
            Log.info("Filled date picker with value: " + value);
        } catch (error) {
            Log.error(`Error filling date picker with locator ${locator} with value ${value}: ${error}`);
            throw error;
        }
    }

    async getValue(locator: string) {
        try {
            const element = await this.page.locator(locator);
            const text = await element.innerText();
            Log.info(`Got value from element with locator ${locator}: ${text}`);
            return text;
        } catch (error) {
            Log.error(`Error getting value from element with locator ${locator}: ${error}`);
            throw error;
        }
    }

    async dialogHandle() {
        try {
            await this.page.on('dialog', dialog => dialog.accept());
            Log.info("Accepted dialog");
        } catch (error) {
            Log.error(`Error handling dialog: ${error}`);
            throw error;
        }
    }

    public async scrollToElement(locator: string) {
        try {
            await this.page.locator(locator).scrollIntoViewIfNeeded();
            Log.info(`Scrolled to element: ${locator}`);
        } catch (error) {
            Log.error(`Error scrolling to element with locator ${locator}: ${error}`);
            throw error;
        }
    }

    public async fileUpload(locator: string, filePath: string) {
        try {
            const input = await this.page.locator(locator);
            await input.setInputFiles(filePath);
            Log.info(`Uploaded file ${filePath}`);
        } catch (error) {
            Log.error(`Error uploading file: ${error}`);
            throw new Error(`File upload failed: ${error}`);
        }
    }

    public async takeScreenshot(path:string){
    try{
        await this.page.screenshot({path});
    }
    catch(error){
        Log.error(`Error taking screenshot: ${error}`);
    }
}
}

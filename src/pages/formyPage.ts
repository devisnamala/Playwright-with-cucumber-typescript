import UIActions from "../helpers/uiActions";

export class formyPage {
    private Elements = {
        url: "https://formy-project.herokuapp.com/form",
        firstName: "//input[@id='first-name']",
        lastName: "//input[@id='last-name']",
        jobTitle: "//input[@id='job-title']",
        radio1: "#radio-button-1",
        radio2:"#radio-button-2",
        radio3:"#radio-button-3",
        checkbox: "//input[@id='checkbox-1']",
        dropdown: "//select[@id='select-menu']",
        value: "2-4",
        datePicker: "//input[@id='datepicker']",
        date: "06/26/2024",
        submitButton: "//a[normalize-space()='Submit']"
    };

    uiActions: UIActions;

    constructor(private page: import("@playwright/test").Page) {
        this.uiActions = new UIActions(this.page);
    }

    public async goto() {
        await this.uiActions.navigateTo(this.Elements.url);
    }

    public async fillForm() {
        await this.uiActions.fillText(this.Elements.firstName, "Siri");
        await this.uiActions.fillText(this.Elements.lastName, "Namala");
        await this.uiActions.fillText(this.Elements.jobTitle, "Tester"),
        await this.uiActions.buttonSelect(this.Elements.radio1);
        await this.uiActions.buttonSelect(this.Elements.radio2);
        await this.uiActions.buttonSelect(this.Elements.radio3);
        await this.uiActions.buttonSelect(this.Elements.checkbox);
        await this.uiActions.dropdown(this.Elements.dropdown, this.Elements.value);
        await this.uiActions.verifyIfChecked(this.Elements.checkbox);
        await this.uiActions.datePicker(this.Elements.datePicker, this.Elements.date);
        await this.uiActions.click(this.Elements.submitButton);
    }

    public async dialog(){
        await this.uiActions.navigateTo("https://formy-project.herokuapp.com/switch-window");
        await this.uiActions.click("//button[@id='alert-button']");
        await this.uiActions.dialogHandle();
    }

    public async scrollPage(){
        await this.uiActions.navigateTo("https://formy-project.herokuapp.com/scroll");
        await this.uiActions.scrollToElement("//input[@id='name']");
    }

    public async uploadFile(locator: string, filePath: string) {
        const input = await this.page.locator(locator);
        await input.setInputFiles(filePath);
    }
    
}

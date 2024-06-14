import { BeforeAll, AfterAll, After, Status } from "@cucumber/cucumber";
import { Browser, chromium, BrowserContext } from 'playwright';
import { fixture } from "./pageFixture";
import fs from 'fs';
import * as path from 'path';
import { exec } from "child_process";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext({
        recordVideo: {
            dir: 'test-results/recordings'
        }
    });
    fixture.page = await context.newPage(); 
});

AfterAll(async function () {
    await context.close();  
    await browser.close(); 

    // Execute cleanup script 
    const cleanupScript = path.join(__dirname, '../utils/cleanup.ts');  
    exec(`ts-node ${cleanupScript}`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error executing cleanup script: ${err}`);
        }
        if (stderr) {
            console.error(`Cleanup script stderr: ${stderr}`);
        }
        console.log(`Cleanup script stdout: ${stdout}`);
    });
});

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshotPath = await takeScreenshot(scenario.pickle.name);
        fixture.screenshotPath = screenshotPath;
        this.attach(fs.readFileSync(screenshotPath), 'image/png');

        const videoPath = await getVideoPath();
        if (videoPath) {
            fixture.videoPath = videoPath;
            this.attach(fs.readFileSync(videoPath), 'video/webm');
        }
    }
});

async function takeScreenshot(scenarioName: string): Promise<string> {
    try {
        const screenshotPath = path.resolve(`./test-results/screenshots/${scenarioName}.png`);
        await fixture.page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Screenshot saved to ${screenshotPath}`);
        return screenshotPath;
    } catch (error) {
        console.error('Error while taking screenshot:', error);
        return ''; 
    }
}

async function getVideoPath(): Promise<string | undefined> {
    try {
        const video = fixture.page.video();
        if (video) {
            await fixture.page.close(); 
            const videoPath = await video.path();
            console.log(`Video saved to ${videoPath}`);
            return videoPath;
        }
        return undefined; 
    } catch (error) {
        console.error('Error while getting video path:', error);
        return undefined; 
    }
}

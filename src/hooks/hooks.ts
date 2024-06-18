import { BeforeAll, After, AfterAll, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from 'playwright';
import { fixture } from "./pageFixture";
import * as fs from 'fs';
import * as path from 'path';
import { invokeBrowser } from "../utils/browsers"; // Adjusted import

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    try {
        browser = await invokeBrowser(); // Invoke desktop browser
        context = await browser.newContext({
            recordVideo: {
                dir: 'test-results/recordings'
            },
        });
        
        // Start tracing
        await context.tracing.start({ screenshots: true, snapshots: true });

        fixture.page = await context.newPage(); // Create a new page in the context
    } catch (error) {
        console.error('Error in BeforeAll hook:', error);
        throw error; // Ensure the test suite fails if BeforeAll hook fails
    }
});

After(async function (scenario) {
    if (scenario.result?.status === Status.FAILED) {
        const screenshotPath = await takeScreenshot(scenario.pickle.name);
        if (screenshotPath) {
            fixture.screenshotPath = screenshotPath;
            this.attach(fs.readFileSync(screenshotPath), 'image/png');
        }

        const videoPath = await getVideoPath();
        if (videoPath) {
            fixture.videoPath = videoPath;
            this.attach(fs.readFileSync(videoPath), 'video/webm');
        }

        const tracePath = await stopAndSaveTrace(scenario.pickle.name);
        if (tracePath) {
            fixture.tracePath = tracePath;
            this.attach(fs.readFileSync(tracePath), 'application/zip');
        }
    }
});

AfterAll(async function () {
    try {
        await context.close(); 
        await browser.close();
        const cleanupScript = path.join(__dirname, '../utils/cleanup.ts');
    } catch (error) {
        console.error('Error in AfterAll hook:', error);
    }
});

async function takeScreenshot(scenarioName: string): Promise<string | undefined> {
    try {
        const screenshotPath = path.resolve(`./test-results/screenshots/${scenarioName}.png`);
        await fixture.page?.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Screenshot saved to ${screenshotPath}`);
        return screenshotPath;
    } catch (error) {
        console.error('Error while taking screenshot:', error);
        return undefined;
    }
}

async function getVideoPath(): Promise<string | undefined> {
    try {
        const video = fixture.page?.video();
        if (video) {
            await fixture.page?.close();
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

async function stopAndSaveTrace(scenarioName: string): Promise<string | undefined> {
    try {
        const tracePath = path.resolve(`./test-results/traces/${scenarioName}-trace.zip`);
        await context.tracing.stop({ path: tracePath });
        console.log(`Trace saved to ${tracePath}`);
        return tracePath;
    } catch (error) {
        console.error('Error while saving trace:', error);
        return undefined;
    }
}

// utils/browsers.ts

import { LaunchOptions, Browser, BrowserContext, chromium, firefox, webkit, devices } from "@playwright/test";
import * as dotenv from 'dotenv';

dotenv.config({ path: 'src/.env' });

const desktopOptions: LaunchOptions = {
    headless: process.env.HEADLESS === 'true',
};

export const invokeBrowser = async (): Promise<Browser> => {
    const browserType = process.env.BROWSER?.toLowerCase();

    switch (browserType) {
        case "chromium":
            return chromium.launch(desktopOptions);
        case "firefox":
            return firefox.launch(desktopOptions);
        case "webkit":
            return webkit.launch(desktopOptions);
        default:
            throw new Error("Please set the proper browser in the .env file (chrome, firefox, webkit)");
    }
};

// export const invokeMobileDevice = async (): Promise<BrowserContext> => {
//     const deviceName = process.env.DEVICE;
//     const mobileBrowserType = process.env.MOBILE_BROWSER?.toLowerCase();

//     if (!deviceName || !devices[deviceName]) {
//         throw new Error(`Device ${deviceName} is not supported or specified in the .env file`);
//     }

//     switch (mobileBrowserType) {
//         case "chromium":
//             const browser = await chromium.launch(mobileOptions);
//             const context = await browser.newContext({
//                 ...devices[deviceName],
//                 ...mobileOptions,
//                 recordVideo: { dir: 'test-results/recordings' }
//             });
//             return context;
//         case "firefox":
//             const firefoxBrowser = await firefox.launch(mobileOptions);
//             const firefoxContext = await firefoxBrowser.newContext({
//                 ...devices[deviceName],
//                 ...mobileOptions,
//                 recordVideo: { dir: 'test-results/recordings' }
//             });
//             return firefoxContext;
//         case "webkit":
//             const webkitBrowser = await webkit.launch(mobileOptions);
//             const webkitContext = await webkitBrowser.newContext({
//                 ...devices[deviceName],
//                 ...mobileOptions,
//                 recordVideo: { dir: 'test-results/recordings' }
//             });
//             return webkitContext;
//         default:
//             throw new Error("Please set the proper mobile browser in the .env file (chrome, firefox, webkit)");
//     }
// };

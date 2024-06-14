import { Page } from "@playwright/test";

export const fixture = {
    //@ts-ignore
    page: undefined as Page,
    screenshotPath: 'test-results/screenshots' as string,
    videoPath: 'test-results/recordings' as string,
};

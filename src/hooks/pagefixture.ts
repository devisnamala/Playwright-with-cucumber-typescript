// src/test/pageFixture.ts

import { Page } from '@playwright/test';

export const fixture = {
    page: undefined as Page | undefined,
    screenshotPath: 'test-results/screenshots/',
    videoPath: 'test-results/recordings/',
    tracePath: 'test-results/traces'
};
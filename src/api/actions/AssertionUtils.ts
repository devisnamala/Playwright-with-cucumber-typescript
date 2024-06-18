import { APIResponse } from '@playwright/test';
import { expect } from '@playwright/test';
import RESTResponse from '../utils/RESTResponse';

export default class AssertionUtils {
    public static async verifyStatusCode(response: RESTResponse, expectedStatusCode: number) {
        let actualStatusCode: number;
        actualStatusCode = await response.getStatusCode();
        expect(actualStatusCode).toBe(expectedStatusCode);
        console.log(`Verified status code: Expected ${expectedStatusCode}, got ${actualStatusCode}`);
    }

    public static async assertJsonValue(response: RESTResponse, key: string, expectedValue: any) {
        const responseBody = JSON.parse(await response.getBody());
        expect(responseBody[key]).toBe(expectedValue);
        console.log(`Verified JSON value: Key ${key}, Expected ${expectedValue}, got ${responseBody[key]}`);
    }
}

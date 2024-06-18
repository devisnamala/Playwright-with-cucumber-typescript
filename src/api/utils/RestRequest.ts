import { APIResponse, Page } from '@playwright/test';
import logger from '../../utils/log';
import RequestHeader from './RequestHeader';
import AssertionUtils from '../actions/AssertionUtils';
import RESTResponse from './RESTResponse';
import Log from '../../utils/log';
import { ICreateAttachment } from '@cucumber/cucumber/lib/runtime/attachment_manager';

export default class RESTRequest {
    constructor(private page: Page) {}

    public async setRestResponse(attach: ICreateAttachment, response: APIResponse, description: string): Promise<RESTResponse> {
        const body = await response.text();
        const headers = response.headers();
        const statusCode = response.status();
        const restResponse: RESTResponse = new RESTResponse(headers, body, statusCode, description);  
        const responseBody = JSON.stringify(JSON.parse(body), undefined, 2);
        Log.attachText(attach, `Response body: ${responseBody}`);    
        return restResponse;
    }

    public async get(attach: ICreateAttachment, endPoint: string, requestHeader: any, description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making GET request for ${description}`);
        this.printRequest(attach, endPoint, headersAsJson, null, 'GET');
        const response = await this.page.request.get(endPoint, { headers: headersAsJson });
        return await this.setRestResponse(attach, response, description);
    }

    public async post(attach: ICreateAttachment, endPoint: string, requestHeader: any, jsonAsString: string, description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making POST request for ${description}`);
        this.printRequest(attach, endPoint, headersAsJson, jsonAsString, 'POST');
        const response = await this.page.request.post(endPoint, { headers: headersAsJson, data: JSON.parse(jsonAsString) });
        return await this.setRestResponse(attach, response, description);
    }

    public async put(attach: ICreateAttachment, endPoint: string, requestHeader: any, jsonAsString: string, description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making PUT request for ${description}`);
        this.printRequest(attach, endPoint, headersAsJson, jsonAsString, 'PUT');
        const response = await this.page.request.put(endPoint, { headers: headersAsJson, data: JSON.parse(jsonAsString) });
        return await this.setRestResponse(attach, response, description);
    }

    public async patch(attach: ICreateAttachment, endPoint: string, requestHeader: any, jsonAsString: string, description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making PATCH request for ${description}`);
        this.printRequest(attach, endPoint, headersAsJson, jsonAsString, 'PATCH');
        const response = await this.page.request.patch(endPoint, { headers: headersAsJson, data: JSON.parse(jsonAsString) });
        return await this.setRestResponse(attach, response, description);
    }

    public async delete(attach: ICreateAttachment, endPoint: string, requestHeader: any, description: string): Promise<RESTResponse> {
        const headersAsJson = JSON.parse(JSON.stringify(requestHeader));
        Log.info(`Making DELETE request for ${description}`);
        this.printRequest(attach, endPoint, headersAsJson, null, 'DELETE');
        const response = await this.page.request.delete(endPoint, { headers: headersAsJson });
        return await this.setRestResponse(attach, response, description);
    }

    private printRequest(attach: ICreateAttachment, endPoint: string, requestHeader: any, jsonRequestBody: string | null, method: string) {
        let requestBody = jsonRequestBody;
        if (jsonRequestBody !== null) {
            requestBody = JSON.stringify(JSON.parse(jsonRequestBody), undefined, 2);
        }
        Log.attachText(attach, `Request Method: ${method}\nEndpoint: ${endPoint}\nHeaders: ${JSON.stringify(requestHeader, undefined, 2)}\nBody: ${requestBody || 'null'}`);
    }
}

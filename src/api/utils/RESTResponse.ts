import * as jp from 'jsonpath';
import logger from "../../utils/log";

export default class RESTResponse {
    public constructor(private headers: any, private body: string, private status: number,
        private description: string) { }


    /**
     * Get header value by header key
     * @param key 
     * @returns 
     */
    public async getHeaderValueByKey(key: string): Promise<string> {
        logger.info(`Getting header value of ${key}`);
        const jsonHeaders = await JSON.parse(JSON.stringify(this.headers));
        return jsonHeaders[key];
    }

    /**
     * Get response status code
     * @returns 
     */
    public async getStatusCode(): Promise<number> {
        logger.info(`Getting status code of ${this.description}`);
        return this.status;
    }

    /**
    * Get response body
    * @returns 
    */
    public async getBody(): Promise<string> {
        logger.info(`Getting response body of ${this.description}`);
        return this.body;
    }

    /**
     * Get response headers 
     * @returns 
     */
    public async getHeaders(): Promise<string> {
        logger.info(`Getting response Headers of ${this.description}`);
        return this.headers;
    }

    public async getTagContentByJsonPath(jsonPath: string, description: string, responseBody: string): Promise<string> {
        logger.info(`Getting content of ${description}`);
        try {
            const jsonData = JSON.parse(responseBody);
            const result = jp.query(jsonData, jsonPath);
            if (result.length === 0) {
                throw new Error(`No content found for JSON path: ${jsonPath}`);
            }
            return result[0];
        } catch (error) {
            logger.error(`Error getting content for ${description}: ${error}`);
            throw error;
        }
    }
}
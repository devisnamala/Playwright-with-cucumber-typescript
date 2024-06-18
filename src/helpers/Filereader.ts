import Ajv from 'ajv';
import * as fs from 'fs';
import * as path from 'path';

export function readJsonFromFile(filePath:string) {
    try {
      // Read file synchronously to get JSON data
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      
      // Parse JSON data into a JavaScript object
      const jsonObject = JSON.parse(jsonData);
      console.log(jsonObject);
      return jsonObject;
    } catch (error) {
      console.error(`Error reading JSON file from path: ${filePath}`, error);
      throw error; // Optionally handle or rethrow the error
    }
  }
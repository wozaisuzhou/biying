import axios from 'axios';
import https from 'https';
import fs from 'fs';

const httpOptions = {
    cert: fs.readFileSync('../server/ssl/cert.pem'),
    key: fs.readFileSync('../server/ssl/key.pem'),
    rejectUnauthorized: false,
  }

const httpsAgent = new https.Agent(httpOptions);

const instance = axios.create({
  baseURL: process.env.baseURL,
  httpsAgent: httpsAgent,
});

export default instance;
// pages/api/my-page.js
import fs from 'fs';
import https from 'https';

const httpOptions = {
    cert: fs.readFileSync('../server/ssl/cert.pem'),
    key: fs.readFileSync('../server/ssl/key.pem'),
    rejectUnauthorized: false,
  }

const httpsAgent = new https.Agent(httpOptions);

export default async function handler(req, res) {

    console.log("this is request method" + req);

    if (req.method === 'POST') {
      const { body } = req;
       
      console.log("this is request body" + { body });

      try {
        const response = await axios.post(process.env.insertServiceProviderUrl, body, {
          headers: {
            "Content-Type": "application/json",
          },
          httpsAgent: httpsAgent
        });
        
        console.log("this is response" + response);

        res.status(response.status).json(response.data);
      } catch (error) {
        res.status(error.response.status).json(error.response.data);
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
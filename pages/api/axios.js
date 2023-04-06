// pages/api/my-page.js
import fs from 'fs';
import https from 'https';
import axios from 'axios';

const httpOptions = {
    cert: fs.readFileSync('../server/ssl/cert.pem'),
    key: fs.readFileSync('../server/ssl/key.pem'),
    rejectUnauthorized: false,
  }

const httpsAgent = new https.Agent(httpOptions);

export default async function handler(req, res) {

    if (req.method === 'POST') {
      const { data } = req.body;

      // Make a request to an external API endpoint using axios
      axios.post('https://api.example.com/myEndpoint', { data }, {
        headers: {
          "Content-Type": "application/json",
        },
        httpsAgent: httpsAgent 
      })
        .then(response => {
          res.status(200).json(response.data);
        })
        .catch(error => {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
      // const { body } = req;
       
      // console.log("this is request body" + { body });

      // try {
      //   const response = await axios.post(process.env.insertServiceProviderUrl, body, {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     httpsAgent: httpsAgent
      //   });
        
      //   console.log("this is response" + response);

      //   res.status(response.status).json(response.data);
      // } catch (error) {
      //   res.status(error.response.status).json(error.response.data);
      // }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
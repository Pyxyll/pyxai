import * as dotenv from "dotenv";
dotenv.config()

const https = require('https');
const fs = require('fs');
const querystring = require('querystring');

const options = {
    hostname: 'id.twitch.tv',
    path: '/oauth2/token',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

const data = querystring.stringify({
    client_id: '',
    client_secret: '',
    grant_type: ''
});

if (!process.env.ACCESS_TOKEN) {
    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
            body += chunk;
        });
        res.on('end', () => {
            const response = JSON.parse(body);
            fs.appendFileSync('.env', `\nACCESS_TOKEN=${response.access_token}`);
            console.log('Access token saved to .env file.');
        });
    });

    req.on('error', (error) => {
        console.error(`Error: ${error.message}`);
    });

    req.write(data);
    req.end();
} else {
    console.log('Access token already exists in .env file.');
}
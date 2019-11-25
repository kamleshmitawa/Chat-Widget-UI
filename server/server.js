const express = require('express');
const twilio = require('twilio');
const app = express();
const cors = require('cors');
require('dotenv').config();

const AccessToken = twilio.jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

app.use(cors())

app.get('/', (req, res) => {
    console.log(process.env, '=====env');
    res.send('hey');
});

app.post('/get-token/:id', (req, res) => {
    console.log(process.env.TWILIO_CHAT_SERVICE_SID, 'env');
    const token = TokenGenerator(req.params.id);

    res.send({
        identity: token.identity,
        jwt: token.toJwt()
    })
})

function TokenGenerator(identity) {
    const appName = 'TwilioChat';

    const endpoint = appName + ':' + identity;
    const chatGrant = new ChatGrant({
        serviceSid: process.env.TWILIO_CHAT_SERVICE_SID,
        endpointId: endpoint,
    });

    const token = new AccessToken(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET);

    token.addGrant(chatGrant);
    token.identity = identity;

    console.log('tokennnn', token);
    return token;
}

app.listen(3001, () => console.log('listening 3001'));


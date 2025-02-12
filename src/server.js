require('dotenv').config();
const express = require('express');
const assistant = require('./services/assistant');

const hostname = process.env.HOSTNAME || "127.0.0.1";
const port = process.env.PORT || 4069;

const app = express();
app.use(express.json());
app.use(apiKeyProtection); // Enables API key protection for all the endpoints. Disable it in config file.

assistant.init();

app.post('/start-thread', async (req, res) => {
    try {
        const thread = await assistant.startNewThread();
        res.json({ "threadId": thread.id });
    } catch (error) {
        console.error("An error occurred when trying to start new thread.");
        console.error(error);
        res.status(500).json({ "error": "Failed to start new thread." });
    }
});

app.post('/chat', async (req, res) => {
    const data = req.body;
    const threadId = data.threadId;
    const userInput = data.message || '';
  
    if (!threadId) {
      console.error("Error: Missing 'threadId'");
      return res.status(400).json({ "error": "Missing 'threadId'" });
    }

    try {
        const response = await assistant.chat(userInput, threadId);
        res.json({ "response": response });
    } catch (error) {
        console.error("An error occurred when trying to create chat message.");
        console.error(error);
        res.status(500).json({ "error": "Failed to create chat message." });
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at: http://${hostname}:${port}`);
});

function apiKeyProtection(req, res, next) {
    if (process.env.ENABLE_API_KEY == 'false') {
        next();
        return;
    }

    const apiKey = req.get('X-API-Key');
    if (apiKey !== process.env.API_KEY) {
        console.log(`Unauthorized request was made to '${req.url}'`);
        res.status(401).json({ "error": "Invalid or missing API key." });
        return;
    }

    next();
}
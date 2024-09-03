import dotenv from 'dotenv';
import OpenAI from 'openai';
import DB from '../db/DB.js';
import { getScriptSpeechLinesOptions, extractOpenAiResponse } from './chatgpt/index.js';

dotenv.config();

OpenAI.apiKey = process.env.OPENAI_API_KEY;

class ChatGptLinesExtractController {
    async getChatGPT(req, res) {
        const { script } = req.body;
        const options = getScriptSpeechLinesOptions(script);
        console.log('options', options);
        const openai = new OpenAI();
        const results = await openai.chat.completions.create(options);
        const resObj = extractOpenAiResponse(results);
        console.log('resObj', resObj);

        const dbAiResults = new DB('aiResults.db');
        await dbAiResults.insert({
            options,
            results
        });

        res.json(resObj);
    }
}

export default ChatGptLinesExtractController;

import dotenv from 'dotenv';
import OpenAI from 'openai';
import PQueue from 'p-queue';
import DB from '../db/DB.js';
import { getScriptSoundEffectsOptions, getScriptHelper, getListOptions, extractOpenAiResponse } from './chatgpt/index.js';

dotenv.config();

class ChatGptController {
    constructor() {
        this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        this.queue = new PQueue({ interval: 1000, intervalCap: 1 }); // 1 request per second
    }

    async processOpenAIRequest(options) {
        return this.queue.add(async () => {
            const results = await this.openai.chat.completions.create(options);
            return extractOpenAiResponse(results);
        });
    }

    async saveToDatabase(dbName, data) {
        const db = new DB(dbName);
        await db.insert(data);
    }

    async updateOrInsertList(dataType, list) {
        const dbLists = new DB('lists.db');
        const existingDoc = await dbLists.findOne({ dataType });

        if (existingDoc) {
            const updatedDoc = this.mergeUniqueListItems(existingDoc, { dataType, list });
            await dbLists.replace({ _id: existingDoc._id }, updatedDoc);
        } else {
            await dbLists.insert({ dataType, list });
        }
    }

    mergeUniqueListItems(existingDoc, newDoc) {
        const mergedDoc = { ...existingDoc };
        if (Array.isArray(newDoc.list)) {
            const oldList = Array.isArray(existingDoc.list) ? existingDoc.list : [];
            const oldSet = new Set(oldList);

            newDoc.list.forEach((item) => {
                if (item !== null && !oldSet.has(item)) {
                    oldList.push(item);
                    oldSet.add(item);
                }
            });

            mergedDoc.list = oldList;
        }
        return mergedDoc;
    }

    async getScriptSoundFx(req, res) {
        const { script } = req.body;
        console.log('script', script);
        const options = getScriptSoundEffectsOptions(script);
        const results = await this.processOpenAIRequest(options);
        await this.saveToDatabase('aiResults.db', { options, results });
        await this.saveToDatabase('soundfx.db', { script, results });
        res.json(results);

    }

    async getChatGPTList(req, res) {
        const { prompt, dataType } = req.body;
        const options = getListOptions(prompt, dataType);

        try {
            const results = await this.processOpenAIRequest(options);
            console.log('results', results);
            await this.saveToDatabase('aiResults.db', { options, results });
            await this.updateOrInsertList(dataType, results.list);

            res.json(results);
        } catch (error) {
            console.error('Error in getChatGPTList:', error);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }

    async getChatGptScriptHelper(params, res) {
        const { prompt, key } = params;
        const scriptOptions = getScriptHelper(prompt, key);
        if (!scriptOptions) {
            res.status(400).json({ error: 'Invalid request' });
            return;
        }
        try {
            const results = await this.processOpenAIRequest(scriptOptions);
            const payload = {
                key: key,
                results
            };
            this.saveScriptResponse(payload);
            res.json(results);
        } catch (error) {
            console.error('Error in getChatGptScriptHelper:', error);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }

    async getChatGptScriptImproveHelper(params, res) {
        const { prompt, key, script } = params;
        const scriptOptions = getScriptHelper(prompt, key, 5000, script);
        if (!scriptOptions) {
            res.status(400).json({ error: 'Invalid request' });
            return;
        }
        try {
            const results = await this.processOpenAIRequest(scriptOptions);
            const payload = {
                key: key,
                results
            };
            this.saveScriptResponse(payload);
            res.json(results);
        } catch (error) {
            console.error('Error in getChatGptScriptHelper:', error);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }

    async getChatGPTPromptIdea(req, res) {
        const prompt = req.query.prompt;
        const key = "idea";
        const scriptOptions = getScriptHelper(prompt, key);
        if (!scriptOptions) {
            res.status(400).json({ error: 'Invalid request' });
            return;
        }
        try {
            const results = await this.processOpenAIRequest(scriptOptions);
            const payload = {
                key: key,
                results
            };
            this.saveScriptResponse(payload);
            res.json(results);
        } catch (error) {
            console.error('Error in getChatGptScriptHelper:', error);
            res.status(500).json({ error: 'An error occurred while processing your request.' });
        }
    }

    async saveScriptResponse(data) {
        const db = new DB('scripts.db');
        await db.insert(data);
    }
}

export { ChatGptController };

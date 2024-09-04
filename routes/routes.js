import { Router } from 'express';
import BaseController from '../controllers/baseController.js';
import { ChatGptController } from '../controllers/chatGptController.js';
import dotenv from 'dotenv';
import DB from '../db/DB.js';
import path from 'path';
import fs from 'fs';
import { ElevenLabsClient } from "elevenlabs";

dotenv.config();

const router = Router();

const setupRoutes = (controller, endpoint) => {
    router.get(`/${endpoint}`, controller.getAll.bind(controller));
    router.post(`/${endpoint}`, controller.create.bind(controller));
    router.get(`/${endpoint}/:id`, controller.getById.bind(controller));
    router.put(`/${endpoint}/:id`, controller.update.bind(controller));
    router.delete(`/${endpoint}/:id`, controller.delete.bind(controller));
};

const tables = [
    'lists',
    'themes',
    'genres',
    'scripts',
    'characters',
    'soundfx',
    'script-types',
    'script-descriptions',
    'script-audio'
];

tables.forEach(table => {
    const controller = new BaseController(`${table}`);
    setupRoutes(controller, table);
});

router.post('/chatgpt/list', (req, res, next) => {
    const chatgptController = new ChatGptController();
    chatgptController.getChatGPTList(req, res);
});

router.post('/chatgpt/soundfx', (req, res, next) => {
    const chatgptController = new ChatGptController();
    chatgptController.getScriptSoundFx(req, res);
});

router.post('/chatgpt/lines', (req, res, next) => {
    const chatgptController = new ChatGptController();
    chatgptController.getScriptLines(req, res);
});

router.get(`/script/`, (req, res, next) => {
    const chatgptController = new ChatGptController();
    chatgptController.getChatGptScriptHelper(req, res);
});

router.get(`/story/create`, (req, res) => {
    const chatgptController = new ChatGptController();
    const params = {
        prompt: req.query.prompt,
        key: req.query.key,
    };
    chatgptController.getChatGptScriptHelper(params, res);
});

router.get(`/story/improve`, (req, res) => {
    const chatgptController = new ChatGptController();
    req.query.key = 'improve';
    const params = {
        prompt: req.query.prompt,
        key: req.query.key,
        script: req.query.script
    };
    chatgptController.getChatGptScriptImproveHelper(params, res);
});

router.post('/elevenlabs', async (req, res) => {
    try {

        const voiceEleventLabsClient = new ElevenLabsClient({
            apiKey: process.env.ELEVENLABS_API_KEY,
        });

        const voiceName = "George"; // Set the voice ID here or use an environment variable

        // Generate audio
        const audioStream = await voiceEleventLabsClient.generate({
            text: req.body.text,
            voice: voiceName,
            model_id: "eleven_turbo_v2",
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5
            }
        });

        // Generate a unique filename
        const filename = `audio_${Date.now()}.mp3`;
        const filePath = path.join('./audio', filename);

        // Save the audio file
        const writer = fs.createWriteStream(filePath);
        audioStream.pipe(writer);

        await new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });

        const db = new DB('eleventlabs.db');
        await db.insert({ response: filename });
        res.json({ filename: filename });
    } catch (error) {
        console.error('Error in /elevenlabs route:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/prompt/idea', async (req, res) => {
    const chatgptController = new ChatGptController();
    chatgptController.getChatGPTPromptIdea(req, res);
});

export default router;
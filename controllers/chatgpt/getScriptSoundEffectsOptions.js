
const openAiModel4 = 'gpt-4';
const maxTokens4 = 4000;

export default function getScriptSoundEffectsOptions(script) {
    return {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${script}` },
            { "role": "user", "content": `You are a script reading sound fx generator. Analyze the user prompt line by line identifying sound effects that create atmosphere for every scene and expecially sounds of events. Also return a separate list of musical backgrounds to set the mood.` },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": "get_script_soundfx_music" } },
        tools: [{
            "type": "function",
            "function": {
                "name": "get_script_soundfx_music",
                "description": `Gets the sound effects and music for a script.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "soundfx": {
                            "type": "array",
                            "description": "list of sound effects for the script.",
                            "items": {
                                "type": "string",
                                "description": "A sound effect or background sound."
                            }
                        }, 
                        "music": {
                            "type": "array",
                            "description": "music for the script.",
                            "items": {
                                "type": "string",
                                "description": "description of the music."
                            }
                        }
                    },
                    "required": ["soundfx", "music"]
                }
            }
        }]
    };
}

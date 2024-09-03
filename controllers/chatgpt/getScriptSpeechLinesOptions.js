
const openAiModel4 = 'gpt-4';
const maxTokens4 = 4000;

export default function getScriptSpeechLinesOptions(script) {
    return {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${script}` },
            { "role": "user", "content": `You are a script reading expert. Analyze the user prompt line by line and return distinct lines by distinct speakers as a new item. This may include narrator. Each object in the response will contain the speaker name and speakers lines. For example if the script was: "BOB: Hi  TED: Hey  BOB: sup?" you would create three objects in order of: [{speaker: 'BOB', text: 'Hi'}, {speaker: 'TED', text: 'Hey'}, {speaker: 'BOB', text: 'sup?'}]. 
            
            However if the script was: 
            "Well, we shall soon find that out!" Thought the old queen. But she said nothing, and went into the sleeping room, took off all the bedclothes, and laid a pea on the bottom of the bed. Then she put twenty mattresses on top of the pea, and twenty eiderdown quilts on the top of the mattresses. This was the bed in which the princess was to sleep.

            The next morning she was asked how she had slept.

            "Oh, very badly!" Said the princess. "I scarcely closed my eyes all night! I am sure I don’t know what was in the bed. I laid on something so hard that my whole body is black and blue. It was dreadful!"

            Then the respose would be: [{
                speaker: 'old queen',
                text: 'Well, we shall soon find that out!'
            }, {
                speaker: 'narrator',
                text: 'Thought the old queen. But she said nothing, and went into the sleeping room, took off all the bedclothes, and laid a pea on the bottom of the bed. Then she put twenty mattresses on top of the pea, and twenty eiderdown quilts on the top of the mattresses. This was the bed in which the princess was to sleep. The next morning she was asked how she had slept.'
            }, {
                speaker: 'princess',
                text: 'Oh, very badly! I scarcely closed my eyes all night! I am sure I don’t know what was in the bed. I laid on something so hard that my whole body is black and blue. It was dreadful!'
            }, {
                speaker: 'narrator',
                text: 'Said the princess.'
            }, {
                speaker: 'princess',
                text: 'I scarcely closed my eyes all night! I am sure I don’t know what was in the bed. I laid on something so hard that my whole body is black and blue. It was dreadful!'
            }]
            ` },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": "get_script_speech_lines" } },
        tools: [{
            "type": "function",
            "function": {
                "name": "get_script_speech_lines",
                "description": `Gets the lines for script in user prompt.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "lines": {
                            "type": "array",
                            "description": "A list of for the script broken up by speaker name and speaker lines.",
                            "items": {
                                "type": "object",
                                "description": "Individual lines in the script.",
                                "properties": {
                                    "speaker": {
                                        "type": "string",
                                        "description": "The speakers name."
                                    },
                                    "text": {
                                        "type": "string",
                                        "description": "The speakers lines."
                                    }
                                },
                            }
                        }
                    },
                    "required": ["lines"]
                }
            }
        }]
    };
}


const openAiModel4 = 'gpt-4';
const maxTokens4 = 4000;
export default function getListOptions(prompt, dataType) {
    return {
        model: openAiModel4,
        messages: [
            { "role": "user", "content": `${prompt}` },
            { "role": "system", "content": `Generate a list of ${prompt} ${replaceUnderscores(dataType)}. Check the user prompt instructions for customizing the list.` },
        ],
        max_tokens: maxTokens4,
        tool_choice: { "type": "function", "function": { "name": `get_${dataType}` } },
        tools: [{
            "type": "function",
            "function": {
                "name": `get_${dataType}`,
                "description": `Gets well-written list of 20 ${replaceUnderscores(dataType)}.`,
                "parameters": {
                    "type": "object",
                    "properties": {
                        "list": {
                            "type": "array",
                            "description": `A list of ${replaceUnderscores(dataType)}.`,
                            "items": {
                                "type": "string",
                                "description": `The ${dataType}.`
                            }
                        }
                    },
                    "required": ["list"]
                }
            }
        }]
    };
}

function replaceUnderscores(str) {
    return str.replace(/_/g, ' ');
}
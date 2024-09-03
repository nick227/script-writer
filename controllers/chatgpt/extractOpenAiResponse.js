
export default function extractOpenAiResponse(response) {
    if (!response || !response.choices || response.choices.length === 0) {
        return null;
    }
    const firstChoice = response.choices[0];
    if (!firstChoice.message || !firstChoice.message.tool_calls || firstChoice.message.tool_calls.length === 0) {
        return null;
    }
    const firstToolCall = firstChoice.message.tool_calls[0];
    if (firstToolCall.function && firstToolCall.function.arguments) {
        return typeof firstToolCall.function.arguments === 'object'
            ? firstToolCall.function.arguments
            : safeJsonParse(firstToolCall.function.arguments);
    }
    return null;
}

function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        return str;
    }
}
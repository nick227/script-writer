import { createElement } from './formUtils.js';
import { getAllScripts } from './getAllScripts.js';
import { playFinishedSound } from './eventHandlers.js';
let cycleCounter = 0;

export const createAiButton = (type, textareaName) => {
    const className = type === 'create' ? 'create-btn fas fa-dice' : 'improve-btn fa-solid fa-wand-magic-sparkles';

    const button = createElement('i', { className: className });
    button.addEventListener('click', handleAiButtonClick.bind(null, textareaName, type));
    return button;
};

export const createCycleCountSelect = () => {
    const select = createElement('select', { name: 'cycleCount' });
    select.classList.add('count-select');
    let options = ``;
    for (let i = 1; i <= 3; i++) {
        options += `<option>${i}</option>`;
    }
    select.innerHTML = options;
    return select;
};

function checkForCycles() {
    let isRunning = false;
    const cycleMax = document.querySelector('select[name="cycleCount"]').value;
    const maxCycles = document.querySelectorAll('select[name="cycleCount"] option').length;
    if (parseInt(cycleMax) === 1 || parseInt(cycleCounter) === maxCycles) {
        cycleCounter = 0;
        return;
    } else {
        isRunning = true;
        handleAiButtonClick('script', 'create');
        cycleCounter++;
    }
    return isRunning;
}

export const handleAiButtonClick = async (textareaName, endpoint) => {
    console.log('textareaName', textareaName);
    const elements = {
        script: document.querySelector('textarea[name="script"]'),
        prompt: document.querySelector('textarea[name="prompt"]')
    };
    let scriptType = null;

    if (textareaName === 'script' && elements.script.disabled) {
        return;
    }

    const prompt = elements.prompt.value;
    let url, textValue;

    if (textareaName === 'script') {
        console.log('mk');
        scriptType = document.querySelector('input[name="scriptType"]:checked').value;
        const scriptParam = endpoint === 'improve' ? `&script=${encodeURIComponent(elements.script.value)}` : '';
        url = `/api/story/${endpoint}?prompt=${encodeURIComponent(prompt)}&key=${scriptType}${scriptParam}`;
    } else if (textareaName === 'prompt') {
        url = `/api/prompt/idea?prompt=${encodeURIComponent(prompt)}`;
    }

    try {
        console.log('scriptType', scriptType);

        toggleLoading();
        const response = await fetch(url);
        const results = await response.json();
        
        if (textareaName === 'script') {
            textValue = getTextResponse(scriptType, results, endpoint);
        } else if (textareaName === 'prompt') {
            textValue = results.idea;
        }
        elements[textareaName].value = textValue;
    } catch (error) {
        console.error('Error:', error);
    } finally {
        toggleLoading();
        getAllScripts();
        const isRunning = checkForCycles();
        if(!isRunning){
            playFinishedSound();
        }

    }
};

export const getTextResponse = (key, results, endpoint = null) => {
    console.log('### ', key, endpoint, results.title);
    let textValue = '';
    if (key === 'horror') {
        textValue = results.title + "\n" + results.introduction + "\n\n" + results.script;
    } else if(results.title) {
        textValue = results.title + "\n" + results.script;
    } else if(results.script){
        textValue = results.script;
    } else {
        textValue = JSON.stringify(results);
    }
    return textValue;
};

export const toggleLoading = () => {
    const iconElements = document.querySelectorAll('i');
    const scriptElement = document.querySelector('textarea[name="script"]');
    const promptElement = document.querySelector('textarea[name="prompt"]');
    if (scriptElement.disabled) {
        scriptElement.disabled = false;
        scriptElement.classList.remove('disabled');
        promptElement.disabled = false;
        promptElement.classList.remove('disabled');
        iconElements.forEach(icon => {
            icon.classList.remove('loading');
        });
    } else {
        scriptElement.disabled = true;
        scriptElement.classList.add('disabled');
        promptElement.disabled = true;
        promptElement.classList.add('disabled');
        iconElements.forEach(icon => {
            icon.classList.add('loading');
        });
    }
};

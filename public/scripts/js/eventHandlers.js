export const handleGetLines = async (e) => {
    e.preventDefault();
    const script = document.querySelector('textarea[name="script"]').value;
    const url = 'chatgpt/lines';
    const body = { script };
    const results = await api.post(url, body);
    console.log(results);
};

export async function handleGenVoiceClick(event, scriptObject) {
    const confirmContinue = confirm(`Really generate voice for: ${scriptObject.title}`);
    if (confirmContinue) {
        const script = scriptObject.script;
        const response = await sendScriptToElevenLabsGetVoice(script);
        console.log('ElevenLabs response');
        console.log(response);
    } 
}

export function playFinishedSound(){
    const audio = new Audio('/sounds/ding.webm');
    audio.play();
}

async function sendScriptToElevenLabsGetVoice(script) {
    console.log('sendScriptToElevenLabsGetVoice', script);
    if(!script){
        alert('No script to generate voice for');
        return;
    }
    const url = '/api/elevenlabs';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: script }),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

export function handleSearch() {
    const searchInput = document.querySelector('.search-bar input');
    const searchQuery = searchInput.value.trim().toLowerCase();
    const scripts = document.querySelectorAll('.script-container');

    if (!searchQuery) {
        scripts.forEach(scriptElm => {
            scriptElm.style.display = 'block'; // Show all scripts if the search query is empty
        });
        return;
    }

    scripts.forEach(scriptElm => {
        const matches = searchInScript(scriptElm, searchQuery);
        scriptElm.style.display = matches ? 'block' : 'none';
    });
}

export function createSearchBar() { // Renamed for clarity
    const searchBar = document.createElement('div');
    searchBar.classList.add('search-bar'); // Added class for easier styling
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search scripts...';
    searchBar.appendChild(searchInput);

    searchInput.addEventListener('input', debounce(handleSearch, 300)); // Replaced keyup with input event
    return searchBar;
}

function searchInScript(scriptElm, searchQuery) {
    const title = scriptElm.querySelector('h2');
    const subtitle = scriptElm.querySelector('h3');
    const contentDivs = scriptElm.querySelectorAll('div');

    return (
        startsWithWord(title?.textContent, searchQuery) ||
        startsWithWord(subtitle?.textContent, searchQuery) ||
        Array.from(contentDivs).some(div => startsWithWord(div.textContent, searchQuery))
    );
}

function startsWithWord(text, searchQuery) {
    if (!text) return false; // Added null check
    const words = text.toLowerCase().split(/\s+/); // Split text into words by spaces
    return words.some(word => word.startsWith(searchQuery) && /^[a-zA-Z]/.test(word));
}


function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}
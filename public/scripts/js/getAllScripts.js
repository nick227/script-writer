import { handleGenVoiceClick, createSearchBar } from './eventHandlers.js';

export const getAllScripts = async (event) => {
    const url = '/api/scripts';
    const response = await fetch(url);
    const scripts = await response.json();
    const constainerCheck = document.getElementById('scripts-all');
    if (constainerCheck) {
        constainerCheck.remove();
    }
    const containerElm = document.createElement('div');
    containerElm.id = 'scripts-all';

    const searchBar = createSearchBar();
    containerElm.appendChild(searchBar);

    scripts.forEach(script => {
        const scriptElm = getElementsFromScript(script);
        if (scriptElm) {
            containerElm.appendChild(scriptElm);
        }
    });

    document.body.appendChild(containerElm);
};

function getElementsFromScript(scriptObject) {
    const results = scriptObject.results;
    if (!results) return null;

    const html = document.createElement('div');
    html.dataset.scriptId = scriptObject._id;
    html.classList.add('script-container');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-wave-square');
    icon.addEventListener('click', function(event){
        handleGenVoiceClick(event, results);
    });

    const title = document.createElement('h2');
    title.textContent = results.title;
    const subtitle = document.createElement('h3');
    subtitle.textContent = scriptObject.key;

    html.appendChild(title);
    html.appendChild(subtitle);


    if (typeof results !== 'object') {
        try {
            const parsedResults = JSON.parse(results);
            appendKeyValuesToContainer(parsedResults, html);
        } catch (err) {
            const element = document.createElement('div');
            element.innerHTML = results;
            html.appendChild(element);
        }
    } else {
        appendKeyValuesToContainer(results, html);
    }

    html.appendChild(icon);
    return html;
}

function appendKeyValuesToContainer(results, container) {
    
    const prioritizedKeys = ['title', 'introduction']; // Define prioritized keys
    const otherKeys = Object.keys(results).filter(key => !prioritizedKeys.includes(key)); // Filter out prioritized keys

    // Append prioritized keys first
    prioritizedKeys.forEach(key => {
        if (results[key]) {
            const value = results[key];
            const element = document.createElement('div');
            element.innerHTML = `<strong>${key}:</strong> ${value}`;
            container.appendChild(element);
        }
    });

    // Append other keys
    otherKeys.forEach(key => {
        if (key) { // Ensure the key is not empty
            const value = results[key];
            const element = document.createElement('div');
            element.innerHTML = `<strong>${key}:</strong> ${value}`;
            container.appendChild(element);
        }
    });
}

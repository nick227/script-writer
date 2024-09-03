import { formConfig } from './config.js';
import { createFormElement, createElement } from './formUtils.js';
import { saveFormData, loadFormData } from './storageUtils.js';
import { getAllScripts } from './getAllScripts.js';

const buildForm = (config) => {
    const form = document.getElementById(config.formId);
    config.fields.forEach((field, index) => {
        const formElement = createFormElement(field);
        form.appendChild(formElement);
        if (index < config.fields.length - 1) {
            form.appendChild(createElement('br'));
        }
    });
};

const loadScriptsPage = () => buildForm(formConfig);

document.addEventListener('DOMContentLoaded', getAllScripts);

document.addEventListener('DOMContentLoaded', loadScriptsPage);
window.addEventListener('beforeunload', saveFormData);
window.addEventListener('DOMContentLoaded', loadFormData);

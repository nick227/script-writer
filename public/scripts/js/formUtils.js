import { createAiButton, createCycleCountSelect } from './aiUtils.js';

export const createElement = (tag, attributes = {}) => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => {
        if (typeof value !== 'undefined' && value !== null) {
            if (key === 'className') {
                element.className = value;
            } else {
                element.setAttribute(key, value);
            }
        }
    });
    return element;
};

export const createFormElement = (field) => {
    const row = createElement('div', { className: 'row' });

    if (field.children && Array.isArray(field.children)) {
        // If the field has children, create a wrapper div and recursively append the child elements
        const wrapper = createElement(field.element, { className: 'script-type-wrapper' });
        
        field.children.forEach((childField) => {
            const childElement = createFormElement(childField);
            wrapper.appendChild(childElement);
        });

        row.appendChild(wrapper);
    } else {
        const validAttributes = ['name', 'type', 'placeholder', 'value', 'id'];
        const elementAttributes = Object.fromEntries(
            Object.entries(field).filter(([key]) => validAttributes.includes(key))
        );

        const element = createElement(field.element, elementAttributes);

        if (field.type === 'radio' && field.checked) {
            element.checked = true;
        }

        if (field.type === 'radio' && field.label) {
            const label = createElement('label', { for: field.value + '-id' });
            element.setAttribute('id', field.value + '-id');
            label.textContent = field.label;
            row.appendChild(element);
            row.appendChild(label);
        } else if (field.type === 'checkbox' && field.label) {
            const label = createElement('label');
            label.appendChild(element);
            label.appendChild(document.createTextNode(field.label));
            row.appendChild(label);
        } else {
            row.appendChild(element);
        }

        if (field.name === 'prompt') {
            const aiCreateButton = createAiButton('create', field.name);
            row.appendChild(aiCreateButton);
        }

        if (field.name === 'script') {
            const aiCreateButton = createAiButton('create', field.name);
            const aiImproveButton = createAiButton('improve', field.name);
            const cycleCountSelect = createCycleCountSelect();
            row.appendChild(cycleCountSelect);
            row.appendChild(aiCreateButton);
            row.appendChild(aiImproveButton);
        }
    }

    return row;
};


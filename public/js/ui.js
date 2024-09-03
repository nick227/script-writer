document.addEventListener('DOMContentLoaded', () => {
    ui.initialize();
});

const ui = {
    initialize() {
        this.addListeners();
        this.loadTables();
        this.sortDataTypeSelect();
    },

    sortDataTypeSelect() {
        const select = this.getElement('dataTypeSelect');
        if (!select) return;
        const options = Array.from(select.options);
        options.sort((a, b) => a.text.localeCompare(b.text));
        options.forEach(option => select.appendChild(option));
    },

    addListeners() {
        this.addListener('submitBtn', 'click', this.handleSubmitClick);
        this.addListener('dataTypeInput', 'input', this.handleDataTypeInput);
        this.addListener('output', 'click', this.handleOutputClick);
        this.appendDataTypeDisabled();
    },

    addListener(id, event, handler) {
        const element = this.getElement(id);
        if (element) element.addEventListener(event, handler.bind(this));
    },

    getElement(id) {
        return document.getElementById(id);
    },

    getValue(id) {
        const element = this.getElement(id);
        return element ? element.value : '';
    },

    appendDataTypeDisabled() {
        const dataTypeInput = this.getElement('dataTypeInput');
        const dataTypeSelect = this.getElement('dataTypeSelect');
        if (!dataTypeInput || !dataTypeSelect) return;
        dataTypeSelect.disabled = !!dataTypeInput.value;
    },

    handleOutputClick(event) {
        if (event.target.tagName === 'LI') {
            navigator.clipboard.writeText(event.target.textContent);
        }
    },

    handleDataTypeInput() {
        this.appendDataTypeDisabled();
    },

    async handleSubmitClick(event) {
        const button = event.target;
        if (!button) return;
        button.disabled = true;

        const prompt = this.getValue('prompt');
        const dataType = this.getDataType();

        if (!dataType) {
            alert('Please enter or select a list type');
            button.disabled = false;
            return;
        }

        await api.post('chatgpt/list', { prompt, dataType });
        button.disabled = false;
        this.loadTables();
    },

    getDataType() {
        const inputValue = replaceSpaces(this.getValue('dataTypeInput'));
        const selectValue = this.getValue('dataTypeSelect');
        return inputValue || selectValue;
    },

    async loadTables() {
        const output = this.getElement('output');
        if (!output) return;
        output.innerHTML = '';
        const results = await api.fetch('lists');
        results.sort((a, b) => a.dataType.localeCompare(b.dataType));
        const dataTypesArray = results.map(result => result.dataType);
        this.appendDataTypeSelect(dataTypesArray);
        
        results.forEach(result => {
            const wrapper = this.createElement('div', 'list-wrapper');
            wrapper.appendChild(this.createHeader(result.dataType, result.list.length));
            wrapper.appendChild(this.createList(result));
            output.appendChild(wrapper);
        });
    },

    appendDataTypeSelect(dataTypesArray) {
        const dataTypeSelect = this.getElement('dataTypeSelect');
        if (!dataTypeSelect || !dataTypesArray) return;
        const options = Array.from(dataTypeSelect.options);
        dataTypesArray.forEach(dataType => {
            if (!options.some(option => option.value === dataType)) {
                const option = this.createElement('option');
                option.value = dataType;
                option.text = replaceUnderscores(dataType);
                dataTypeSelect.appendChild(option);
            }
        });
        this.sortDataTypeSelect();
    },

    createElement(tag, className) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    },

    createHeader(text, count=0) {
        const header = this.createElement('h2');
        header.textContent = text + ' (' + count + ')';
        header.addEventListener('click', this.handleListHeaderClick);
        return header;
    },

    handleListHeaderClick(event) {
        const parent = event.target.parentElement;
        if (parent) parent.classList.toggle('open');
    },

    createList(data) {
        const list = this.createElement('ul');
        data.list.sort().forEach(item => {
            const listItem = this.createElement('li');
            listItem.textContent = item;
            listItem.title = item;
            list.appendChild(listItem);
        });
        return list;
    }
};

function replaceUnderscores(str) {
    return str.replace(/_/g, ' ');
}

function replaceSpaces(str) {
    return str.replace(/\s/g, '_').toLowerCase();
}
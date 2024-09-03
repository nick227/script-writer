export const saveFormData = () => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        localStorage.setItem(textarea.name, textarea.value);
    });
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(radio => {
        if (radio.checked) {
            localStorage.setItem(radio.name, radio.value);
        }
        });
};

export const loadFormData = () => {
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        const savedValue = localStorage.getItem(textarea.name);
        if (savedValue) {
            textarea.value = savedValue;
        }
    });
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(radio => {
        const savedValue = localStorage.getItem(radio.name);
        if (savedValue && radio.value === savedValue) {
            radio.checked = true;
        }
    });
};
document.addEventListener('DOMContentLoaded', function () {
    loadSoundFxData();
    const submitBtn = document.getElementById('submitBtn');
    const scriptInput = document.getElementById('scriptInput');
    const outputDiv = document.querySelector('.output');

    submitBtn.addEventListener('click', async function () {
        const script = scriptInput.value;
        if (!script) {
            alert('Please enter a script first!');
            return;
        }

        try {
            const response = await fetch('/api/chatgpt/soundfx', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ script: script }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            loadSoundFxData();

        } catch (error) {
            console.error('Error:', error);
            outputDiv.textContent = 'An error occurred while generating sound effects.';
        }
    });
});

async function loadSoundFxData() {
    try {
        const response = await fetch('/api/soundfx');
        const data = await response.json();
        const outputDiv = document.querySelector('.output');
        outputDiv.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
    }
}
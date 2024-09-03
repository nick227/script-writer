const api = {
    async fetch(endpoint) {
        try {
            const response = await fetch(`/api/${endpoint}`);
            return await response.json();
        } catch (err) {
            console.error('Failed to fetch data', err);
        }
    },

    async post(endpoint, data) {
        try {
            const results = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (!results.ok) {
                console.error('Failed to create data', results);
            }

            return await results.json();

        } catch (err) {
            console.error('Failed to create data', err);
        }
    },

    async update(endpoint, id, data) {
        try {
            await fetch(`/api/${endpoint}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        } catch (err) {
            console.error('Failed to update data', err);
        }
    },

    async delete(endpoint, id) {
        try {
            await fetch(`/api/${endpoint}/${id}`, {
                method: 'DELETE'
            });
        } catch (err) {
            console.error('Failed to delete data', err);
        }
    }
};

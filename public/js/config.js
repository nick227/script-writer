const config = {
    endpoints: [
        {
            name: 'Scripts',
            endpoint: 'scripts',
            fields: [
                { name: 'title', type: 'text' },
                { name: 'content', type: 'textarea' },
                { name: 'genre', type: 'text' },
                { name: 'characters', type: 'text' }
            ]
        },
        {
            name: 'Themes',
            endpoint: 'themes',
            fields: [
                { name: 'name', type: 'text' },
                { name: 'description', type: 'text' }
            ]
        },
        {
            name: 'Genres',
            endpoint: 'genres',
            fields: [
                { name: 'name', type: 'text' },
                { name: 'description', type: 'text' }
            ]
        },
        {
            name: 'Characters',
            endpoint: 'characters',
            fields: [
                { name: 'name', type: 'text' },
                { name: 'role', type: 'text' },
                { name: 'description', type: 'text' }
            ]
        },
        {
            name: 'Script Types',
            endpoint: 'script-types',
            fields: [
                { name: 'type', type: 'text' },
                { name: 'description', type: 'text' }
            ]
        }
    ]
};

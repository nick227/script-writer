export const formConfig = {
    formId: 'main',
    fields: [
        { name: 'wrapper', type: 'div', element: 'div', children: [
            { name: 'scriptType', type: 'radio', label: 'Comedy Sketch', element: 'input', value: 'comedySketch' },
            { name: 'scriptType', type: 'radio', label: 'Dirty Song', element: 'input', value: 'dirtySong' },
            { name: 'scriptType', type: 'radio', label: 'Essay Documentary', element: 'input', value: 'essay' },
            { name: 'scriptType', type: 'radio', label: 'Fake Weather Report', element: 'input', value: 'weather' },
            { name: 'scriptType', type: 'radio', label: 'Horror Story', element: 'input', value: 'horror', checked: true },
            { name: 'scriptType', type: 'radio', label: 'Hypnosis Script', element: 'input', value: 'hypnosis' },
            { name: 'scriptType', type: 'radio', label: 'How-To Guide', element: 'input', value: 'howto' },
            { name: 'scriptType', type: 'radio', label: 'News Broadcast', element: 'input', value: 'news' },
            { name: 'scriptType', type: 'radio', label: 'One Joke', element: 'input', value: 'joke' },
            { name: 'scriptType', type: 'radio', label: 'Summarize Topic', element: 'input', value: 'summarize' },
            { name: 'scriptType', type: 'radio', label: 'Stand-up Comedy', element: 'input', value: 'comedy' },
            { name: 'scriptType', type: 'radio', label: 'Rap Lyrics', element: 'input', value: 'rap' },
            { name: 'scriptType', type: 'radio', label: 'Rock Lyrics', element: 'input', value: 'rock' },
            { name: 'scriptType', type: 'radio', label: 'Rock Opera', element: 'input', value: 'rockOpera' },
            { name: 'scriptType', type: 'radio', label: 'Techno Lyrics', element: 'input', value: 'techno' },
            { name: 'scriptType', type: 'radio', label: 'Emergency Bulletin', element: 'input', value: 'interrupt' },
           ] },
        { name: 'prompt', type: 'textarea', placeholder: 'Enter prompt', element: 'textarea' },
        { name: 'script', type: 'textarea', placeholder: 'Enter script', element: 'textarea' }
    ]
};

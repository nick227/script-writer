document.addEventListener('DOMContentLoaded', addNavigation.js);

function addNavigation() {
    const nav = document.createElement('nav');
    nav.innerHTML = `
        <ul>
        <li><a href="/">lists</a></li>
            <li><a href="/scripts">scripts</a></li>
            <li><a href="/soundfx">soundfx</a></li>
        </ul>
    `;
    document.body.prepend(nav);
}

addNavigation();
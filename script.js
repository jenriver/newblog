document.addEventListener('DOMContentLoaded', () => {
    renderHero();
    renderNav();

    // Render first section by default
    if (config.sections.length > 0) {
        renderSection(config.sections[0].id);
    }

    renderFooter();
});

function renderHero() {
    const hero = document.getElementById('hero');
    const p = config.profile;

    const linksHtml = p.links.map(link =>
        `<a href="${link.url}" target="_blank" class="hero-link">${link.label}</a>`
    ).join('');

    hero.innerHTML = `
        <h1 class="name">${p.name}</h1>
        <h2 class="role">${p.role}</h2>
        <p class="bio">${p.bio}</p>
        <div class="hero-links">
            <a href="mailto:${p.email}" class="hero-link">Email</a>
            ${linksHtml}
        </div>
    `;
}

function renderNav() {
    const nav = document.querySelector('.category-nav');
    nav.innerHTML = config.sections.map((section, index) =>
        `<div class="nav-item ${index === 0 ? 'active' : ''}" onclick="switchSection('${section.id}')">
            ${section.title}
        </div>`
    ).join('');
}

function renderFooter() {
    const footer = document.getElementById('footer');
    footer.innerHTML = `&copy; ${new Date().getFullYear()} ${config.profile.name}. All rights reserved.`;
}

window.switchSection = function (sectionId) {
    // Update Nav
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
        if (el.textContent.trim() === config.sections.find(s => s.id === sectionId).title) {
            el.classList.add('active');
        }
    });

    renderSection(sectionId);
}

function renderSection(sectionId) {
    const contentArea = document.getElementById('content-area');
    const sectionData = config.sections.find(s => s.id === sectionId);

    if (!sectionData) return;

    // Clear and animate
    contentArea.style.opacity = '0';

    setTimeout(() => {
        let html = '';

        if (sectionData.type === 'list') {
            html = renderList(sectionData.items);
        } else if (sectionData.type === 'grid') {
            html = renderGrid(sectionData.items);
        }

        contentArea.innerHTML = html;
        contentArea.style.opacity = '1';
    }, 200);
}

function renderList(items) {
    return items.map(item => `
        <div class="list-item">
            <h3 class="list-title">
                ${item.link ? `<a href="${item.link}" target="_blank">${item.title}</a>` : item.title}
            </h3>
            <span class="list-meta">
                ${item.subtitle ? item.subtitle : ''} 
                ${item.date ? (item.subtitle ? ' • ' : '') + item.date : ''}
            </span>
            <p class="list-desc">${item.description || ''}</p>
        </div>
    `).join('');
}

function renderGrid(items) {
    const gridItems = items.map(item => {
        const content = `
            ${item.image ? `<img src="${item.image}" alt="${item.title}" class="grid-image">` : ''}
            <h3 class="grid-title">${item.title}</h3>
            <p class="grid-desc">${item.description}</p>
        `;

        if (item.link) {
            return `<a href="${item.link}" target="_blank" class="grid-item" style="display: block;">
                ${content}
            </a>`;
        }

        return `<div class="grid-item">${content}</div>`;
    }).join('');

    return `<div class="grid-container">${gridItems}</div>`;
}

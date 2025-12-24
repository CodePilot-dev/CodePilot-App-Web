let projects = [
    { id: 1, name: "CodePilot App", lang: "react", path: "~/desktop/projects/codepilot", tags: ["Next.js", "Electron"] },
    { id: 2, name: "Mon Portfolio", lang: "vue", path: "~/web/my-portfolio", tags: ["Design"] },
    { id: 3, name: "API Gateway", lang: "node", path: "~/backend/api-gateway", tags: ["Microservices"] }
];

function renderProjects() {
    const grid = document.getElementById('projects-grid');
    const searchTerm = document.getElementById('project-search').value.toLowerCase();

    grid.innerHTML = '';

    const filtered = projects.filter(p => p.name.toLowerCase().includes(searchTerm));

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.onclick = () => openProjectModal(p);

        card.innerHTML = `
            <div class="project-header">
                <span class="fw-badge ${p.lang}">${p.lang.charAt(0).toUpperCase() + p.lang.slice(1)}</span>
                <div class="card-actions">
                    <span class="icon">⭐</span>
                </div>
            </div>
            <h3>${p.name}</h3>
            <p class="path">${p.path}</p>
            <div class="project-footer">
                <div class="tags">
                    ${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    document.getElementById('project-count-badge').innerText = projects.length;
}

// Search interaction
document.getElementById('project-search').addEventListener('input', renderProjects);

// Modal Management
function openProjectModal(project) {
    document.getElementById('modal-project-name').innerText = project.name;
    document.getElementById('project-modal').classList.remove('hidden');
}

function closeProjectModal() {
    document.getElementById('project-modal').classList.add('hidden');
}

function openCreateProjectModal() {
    document.getElementById('create-modal').classList.remove('hidden');
}

function closeCreateModal() {
    document.getElementById('create-modal').classList.add('hidden');
}

function saveNewProject() {
    const name = document.getElementById('new-project-name').value;
    const lang = document.getElementById('new-project-lang').value;

    if (!name) return alert("Veuillez donner un nom au projet");

    const newProject = {
        id: Date.now(),
        name: name,
        lang: lang,
        path: `~/web/${name.toLowerCase().replace(/ /g, '-')}`,
        tags: ["Nouveau"]
    };

    projects.push(newProject);
    renderProjects();
    closeCreateModal();

    // Reset fields
    document.getElementById('new-project-name').value = '';
}

function showDownloadPrompt() {
    document.getElementById('download-modal').classList.remove('hidden');
}

function closeDownloadModal() {
    document.getElementById('download-modal').classList.add('hidden');
}

// Close modals when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.add('hidden');
    }
}

// Initial render
renderProjects();

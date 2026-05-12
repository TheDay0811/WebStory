/**
 * VƯỜN TRUYỆN - Trang thư viện (library.html)
 */
document.addEventListener('DOMContentLoaded', () => {
    let currentTab = 'reading';
    renderLibrary(currentTab);

    // Tab switching
    document.querySelectorAll('.library-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.library-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentTab = tab.dataset.tab;
            renderLibrary(currentTab);
        });
    });

    // View switching
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const grid = document.getElementById('libraryGrid');
            if (btn.dataset.view === 'list') {
                grid.style.gridTemplateColumns = '1fr';
            } else {
                grid.style.gridTemplateColumns = 'repeat(5, 1fr)';
            }
        });
    });
});

function renderLibrary(tab) {
    const grid = document.getElementById('libraryGrid');
    const items = MY_LIBRARY.filter(item => item.tab === tab);

    if (items.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; padding:60px 0; color:var(--text-muted);">Chưa có truyện nào trong danh sách này.</p>';
        return;
    }

    grid.innerHTML = items.map(item => {
        const story = STORIES.find(s => s.id === item.storyId);
        if (!story) return '';
        return `
            <a href="story.html?id=${story.id}" class="lib-card">
                <div class="lib-card-cover">
                    <img src="${story.cover}" alt="${story.title}" loading="lazy">
                </div>
                <div class="lib-card-title">${story.title}</div>
                <div class="lib-card-author">${story.author}</div>
                <div class="lib-card-progress">${item.progress}% • CHƯƠNG ${item.currentChapter}/${item.totalChapters}</div>
            </a>
        `;
    }).join('');
}

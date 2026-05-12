/**
 * VƯỜN TRUYỆN - Trang chủ (index.html)
 */
document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    renderStoryGrid();
    renderRanking();
    renderGenres();
});

function renderFeatured() {
    const story = STORIES.find(s => s.featured);
    if (!story) return;
    document.getElementById('featuredTitle').textContent = story.title;
    document.getElementById('featuredDesc').textContent = story.summary;
    document.getElementById('featuredImage').src = story.cover;
    document.getElementById('featuredImage').alt = story.title;
    document.getElementById('featuredRead').href = `reader.html?id=${story.id}&ch=12`;
    document.getElementById('featuredDetail').href = `story.html?id=${story.id}`;
}

function renderStoryGrid() {
    const grid = document.getElementById('storyGrid');
    // Lấy 4 truyện mới cập nhật (không phải featured)
    const stories = STORIES.filter(s => !s.featured).slice(0, 4);
    grid.innerHTML = stories.map(s => `
        <a href="story.html?id=${s.id}" class="story-card">
            <div class="story-card-cover">
                <img src="${s.cover}" alt="${s.title}" loading="lazy">
            </div>
            <div class="story-card-chapter">Chương ${s.chapters}</div>
            <div class="story-card-title">${s.title}</div>
            <div class="story-card-genre">${s.genres.join(', ')}</div>
        </a>
    `).join('');
}

function renderRanking() {
    const list = document.getElementById('rankingList');
    // Top 3 theo views
    const top = [...STORIES].sort((a, b) => b.views - a.views).slice(0, 3);
    list.innerHTML = top.map((s, i) => `
        <a href="story.html?id=${s.id}" class="ranking-item">
            <span class="ranking-num">0${i + 1}</span>
            <div class="ranking-info">
                <div class="ranking-title">${s.title}</div>
                <div class="ranking-views">👁 ${(s.views / 1000).toFixed(1)}k views</div>
            </div>
            <div class="ranking-cover">
                <img src="${s.cover}" alt="${s.title}" loading="lazy">
            </div>
        </a>
    `).join('');

    // Ranking tab switching
    document.querySelectorAll('.ranking-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.ranking-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });
}

function renderGenres() {
    const container = document.getElementById('genreTags');
    container.innerHTML = GENRES.map((g, i) => `
        <span class="genre-tag${i === 1 ? ' active' : ''}">${g}</span>
    `).join('');

    container.querySelectorAll('.genre-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            container.querySelectorAll('.genre-tag').forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
        });
    });
}

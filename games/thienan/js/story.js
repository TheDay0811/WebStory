/**
 * VƯỜN TRUYỆN - Trang chi tiết truyện (story.html)
 */
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const storyId = parseInt(params.get('id')) || 1;
    const story = STORIES.find(s => s.id === storyId);

    if (!story) {
        document.querySelector('.detail-page').innerHTML = '<p style="text-align:center;padding:80px 0;color:#9e9690">Không tìm thấy truyện.</p>';
        return;
    }

    renderDetail(story);
    renderRecommendations(storyId);
});

function renderDetail(story) {
    document.title = `${story.title} - Vườn Truyện`;

    document.getElementById('detailCover').src = story.cover;
    document.getElementById('detailCover').alt = story.title;
    document.getElementById('detailGenres').textContent = story.genres.join(', ');
    document.getElementById('detailYear').textContent = story.year;

    const statusEl = document.getElementById('detailStatus');
    statusEl.textContent = story.status;
    if (story.status === 'Đang ra') statusEl.classList.add('status-active');

    // Quote
    const quoteSection = document.getElementById('detailQuoteSection');
    if (story.quote) {
        document.getElementById('detailQuote').textContent = story.quote;
        document.getElementById('detailQuoteAuthor').textContent = '— ' + (story.quoteAuthor || '');
    } else {
        quoteSection.style.display = 'none';
    }

    document.getElementById('detailGenreTag').textContent = story.genres.map(g => g.toUpperCase()).join(' · ');
    document.getElementById('detailTitle').textContent = story.title;
    document.getElementById('detailAuthor').textContent = story.author;
    document.getElementById('detailRating').innerHTML = `⭐ ${story.rating} <span style="color:var(--text-muted)">(${story.ratingCount.toLocaleString()})</span>`;

    // Summary
    const summaryEl = document.getElementById('detailSummary');
    const text = story.fullSummary || story.summary;
    summaryEl.innerHTML = text.split('\n').map(p => `<p style="margin-bottom:16px">${p.trim()}</p>`).join('');

    // Chapters
    document.getElementById('chapterCount').textContent = `${story.chapters} chương`;
    const listEl = document.getElementById('chapterList');
    const viewAllBtn = document.getElementById('viewAllChapters');
    const chapters = story.chapterList || [];
    
    const renderChapters = (chaps) => {
        return chaps.map(ch => `
            <a href="reader.html?id=${story.id}&ch=${ch.num}" class="chapter-item">
                <span class="chapter-item-title">Chương ${ch.num}: ${ch.title}</span>
                <span class="chapter-item-date">${ch.date}</span>
            </a>
        `).join('');
    };

    if (chapters.length <= 3) {
        listEl.innerHTML = renderChapters(chapters);
        if (viewAllBtn) viewAllBtn.style.display = 'none';
    } else {
        listEl.innerHTML = renderChapters(chapters.slice(0, 3));
        if (viewAllBtn) {
            viewAllBtn.style.display = 'block';
            viewAllBtn.addEventListener('click', () => {
                listEl.innerHTML = renderChapters(chapters);
                viewAllBtn.style.display = 'none';
            });
        }
    }

    // Buttons
    document.getElementById('btnRead').addEventListener('click', () => {
        window.location.href = `reader.html?id=${story.id}&ch=1`;
    });
    document.getElementById('btnSave').addEventListener('click', function() {
        this.textContent = '✓ Đã lưu';
        this.style.borderColor = 'var(--accent)';
        this.style.color = 'var(--accent)';
    });
}

function renderRecommendations(currentId) {
    const grid = document.getElementById('recommendGrid');
    const recs = STORIES.filter(s => s.id !== currentId).sort(() => Math.random() - 0.5).slice(0, 5);
    grid.innerHTML = recs.map(s => `
        <a href="story.html?id=${s.id}" class="recommend-card">
            <div class="recommend-cover">
                <img src="${s.cover}" alt="${s.title}" loading="lazy">
            </div>
            <div class="recommend-title">${s.title}</div>
            <div class="recommend-author">${s.author}</div>
        </a>
    `).join('');
}

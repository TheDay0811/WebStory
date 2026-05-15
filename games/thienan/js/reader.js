/**
 * VƯỜN TRUYỆN - Trang đọc truyện (reader.html)
 */
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const storyId = parseInt(params.get('id')) || 1;
    const chapterNum = parseInt(params.get('ch')) || 1;

    const story = STORIES.find(s => s.id === storyId);
    if (!story) return;

    // Cập nhật close link
    const closeBtn = document.querySelector('.reader-header-actions a[title="Đóng"]');
    if (closeBtn) closeBtn.href = `story.html?id=${storyId}`;

    // Kiểm tra xem có data chương không
    const chapterData = CHAPTER_CONTENT[storyId] && CHAPTER_CONTENT[storyId][chapterNum];

    if (chapterData) {
        renderChapter(chapterData, chapterNum, storyId);
    } else {
        // Fallback: tạo nội dung mẫu từ data truyện
        renderFallbackChapter(story, chapterNum, storyId);
    }

    document.title = `${story.title} - Vườn Truyện`;
});

function renderChapter(data, chapterNum, storyId) {
    document.getElementById('readerGenre').textContent = data.genre || '';
    document.getElementById('readerBookTitle').textContent = data.storyTitle;
    document.getElementById('readerChapterTitle').textContent = data.title;
    document.getElementById('readerChapterNum').textContent = `Chương ${chapterNum}: ${data.title}`;

    // Body
    const body = document.getElementById('readerBody');
    let html = '';
    data.content.forEach((paragraph, i) => {
        html += `<p>${paragraph}</p>`;
        // Thêm ảnh giữa đoạn văn
        if (i === 1 && data.image) {
            html += `<div class="reader-image"><img src="${data.image}" alt="Minh họa"></div>`;
        }
    });
    body.innerHTML = html;

    // Navigation
    if (data.prevChapter) {
        document.getElementById('prevTitle').textContent = data.prevChapter.title;
        document.getElementById('prevChapter').addEventListener('click', () => {
            window.location.href = `reader.html?id=${storyId}&ch=${data.prevChapter.num}`;
        });
        document.getElementById('prevChapter').style.cursor = 'pointer';
    } else {
        document.getElementById('prevChapter').style.visibility = 'hidden';
    }

    if (data.nextChapter) {
        document.getElementById('nextTitle').textContent = data.nextChapter.title;
        document.getElementById('nextChapter').addEventListener('click', () => {
            window.location.href = `reader.html?id=${storyId}&ch=${data.nextChapter.num}`;
        });
        document.getElementById('nextChapter').style.cursor = 'pointer';
    } else {
        document.getElementById('nextChapter').style.visibility = 'hidden';
    }

    // Nút giữa → quay về trang truyện
    document.querySelector('.reader-nav-center').addEventListener('click', () => {
        window.location.href = `story.html?id=${storyId}`;
    });
}

function renderFallbackChapter(story, chapterNum, storyId) {
    document.getElementById('readerGenre').textContent = story.genres.join(' · ');
    document.getElementById('readerBookTitle').textContent = story.title;

    const chapterInfo = story.chapterList && story.chapterList.find(ch => ch.num === chapterNum);
    const chapterTitle = chapterInfo ? chapterInfo.title : `Chương ${chapterNum}`;

    document.getElementById('readerChapterTitle').textContent = chapterTitle;
    document.getElementById('readerChapterNum').textContent = `Chương ${chapterNum}`;

    // Tạo nội dung mẫu
    const body = document.getElementById('readerBody');
    body.innerHTML = `
        <p>Ánh sáng buổi sớm chiếu qua cửa sổ, mang theo mùi hương của hoa dại ngoài vườn. ${story.title} – câu chuyện bắt đầu từ đây, từ những khoảnh khắc nhỏ bé mà ta thường bỏ lỡ trong cuộc sống hối hả.</p>
        <p>Trong thế giới này, mọi thứ đều có ý nghĩa riêng. Mỗi bước chân, mỗi hơi thở, mỗi giọt nước mắt đều dẫn đến một chặng đường mới. Và nhân vật chính của chúng ta, vẫn đang tìm kiếm câu trả lời cho những câu hỏi mà chính mình cũng chưa biết cách đặt ra.</p>
        <div class="reader-image"><img src="../images/reading.png" alt="Minh họa"></div>
        <p>Đôi khi, hành trình quan trọng hơn đích đến. Và có những bài học chỉ có thể học được khi ta dám bước ra khỏi vùng an toàn của mình. Chương này là khởi đầu của một cuộc phiêu lưu mới – nơi ranh giới giữa thực và mơ trở nên mờ nhạt.</p>
        <p>Gió thổi qua khe cửa, mang theo tiếng thì thầm từ quá khứ. Trong giấc mơ, anh thấy một con đường dài vô tận, hai bên là những cánh đồng hoa bất tận. Và ở cuối con đường ấy, có ai đó đang đợi. Ai đó mà anh đã quên từ lâu, nhưng trái tim vẫn luôn nhớ.</p>
    `;

    // Navigation
    if (chapterNum > 1) {
        document.getElementById('prevTitle').textContent = `Chương ${chapterNum - 1}`;
        document.getElementById('prevChapter').addEventListener('click', () => {
            window.location.href = `reader.html?id=${storyId}&ch=${chapterNum - 1}`;
        });
        document.getElementById('prevChapter').style.cursor = 'pointer';
    } else {
        document.getElementById('prevChapter').style.visibility = 'hidden';
    }

    document.getElementById('nextTitle').textContent = `Chương ${chapterNum + 1}`;
    document.getElementById('nextChapter').addEventListener('click', () => {
        window.location.href = `reader.html?id=${storyId}&ch=${chapterNum + 1}`;
    });
    document.getElementById('nextChapter').style.cursor = 'pointer';

    document.querySelector('.reader-nav-center').addEventListener('click', () => {
        window.location.href = `story.html?id=${storyId}`;
    });
}

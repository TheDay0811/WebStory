document.addEventListener('DOMContentLoaded', () => {
    // Trỏ nút Play sang Minigame 2 sắp tới
    const playBtn2 = document.getElementById('play-btn-2');
    
    if (playBtn2) {
        playBtn2.addEventListener('click', () => {
            // Hiệu ứng vật lý lún nút cảm ứng
            playBtn2.style.transform = 'scale(0.9)';
            setTimeout(() => {
                playBtn2.style.transform = '';
            }, 150);

            // Chuyển hướng người chơi dấn thân vào Minigame 2
            window.location.href = 'minigame2.html';
        });
    }
});

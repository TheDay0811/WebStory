document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    
    if (playBtn) {
        playBtn.addEventListener('click', () => {
            // Hiệu ứng tương tác
            playBtn.style.transform = 'scale(0.9)';
            setTimeout(() => {
                playBtn.style.transform = '';
            }, 150);

            // Chuyển luôn vô phòng Minigame
            window.location.href = 'minigame.html';
        });
    }
});

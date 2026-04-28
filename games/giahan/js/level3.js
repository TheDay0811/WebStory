document.addEventListener('DOMContentLoaded', () => {
    const playBtn3 = document.getElementById('play-btn-3');
    
    if (playBtn3) {
        playBtn3.addEventListener('click', () => {
            // Hiệu ứng tương tác
            playBtn3.style.transform = 'scale(0.9)';
            setTimeout(() => {
                playBtn3.style.transform = '';
            }, 150);

            // Chuyển luôn vô phòng Minigame 3
            window.location.href = 'minigame3.html';
        });
    }
});

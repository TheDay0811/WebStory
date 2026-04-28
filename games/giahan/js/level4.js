document.addEventListener('DOMContentLoaded', () => {
    // 1. CHỨC NĂNG NÚT PLAY Ở MÀN 4
    const playBtn4 = document.getElementById('play-btn-4');

    if (playBtn4) {
        playBtn4.addEventListener('click', () => {
            // Hiệu ứng tương tác
            playBtn4.style.transform = 'scale(0.9)';
            setTimeout(() => {
                playBtn4.style.transform = '';
            }, 150);

            // Tạm thời hiển thị Alert vì chưa có quy định đích đến cho Play 4
            alert("Đã đến giới hạn của Màn 4! Bạn muốn Minigame 4 tên là gì?");

            // Nếu sau này có Minigame 4:
            // window.location.href = 'minigame4.html';
        });
    }
});

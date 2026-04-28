document.addEventListener('DOMContentLoaded', () => {
    // 1. Hiệu ứng xuất hiện khi mới vào trang (Fade In + trượt lên nhẹ)
    gsap.from('.intro-wrapper > *', {
        y: 30,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power3.out'
    });

    const enterBtn = document.getElementById('enterBtn');
    
    // 2. Chuyển trang mượt mà khi nhấn nút
    if (enterBtn) {
        enterBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn trình duyệt chuyển trang ngay lập tức
            enterBtn.style.pointerEvents = 'none';

            // Hiệu ứng Fade out
            gsap.to('.intro-wrapper', {
                scale: 1.1,
                opacity: 0,
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    window.location.href = 'menu.html';
                }
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // ---- DOM ELEMENTS ----
    const skyStage = document.getElementById('sky-stage');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    
    // Screens
    const startScreen = document.getElementById('start-screen');
    const endScreen = document.getElementById('end-screen');
    const endTitle = document.getElementById('end-title');
    const endDesc = document.getElementById('end-desc');
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const nextBtn = document.getElementById('next-btn');

    // ÂM THANH
    const shootAudio = new Audio('../audio/shot.mp3'); // Tiếng súng "Đùng!"
    const bgmAudio = new Audio('../audio/Mưa Rơi Ngoài Hiên.mp3'); // Nhạc chiến game
    bgmAudio.loop = true;
    bgmAudio.volume = 0.5;

    // ---- THAM SỐ TRÒ CHƠI ----
    const TARGET_SCORE = 15;
    const TIME_LIMIT = 60; // 60 giây dập chim
    let BIRD_SPAWN_RATE = 1200; // Tốc độ đẻ 1 con chim (milliseconds)

    // Trạng thái
    let score = 0;
    let timeLeft = TIME_LIMIT;
    let isGameRunning = false;
    let timerInterval = null;
    let spawnInterval = null;
    let isMuted = false;
    let birds = []; // Mảng chứa các sinh vật bay

    // ---- ĐIỀU CHỈNH AUDIO TẮT BẬT ----
    audioToggleBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            bgmAudio.pause();
            audioToggleBtn.innerText = '🔇';
        } else {
            bgmAudio.play().catch(e => console.log(e));
            audioToggleBtn.innerText = '🔊';
        }
    });

    // ---- BẮT ĐẦU GAME ----
    startBtn.addEventListener('click', startGame);
    retryBtn.addEventListener('click', startGame);
    nextBtn.addEventListener('click', () => {
        window.location.href = 'level3.html';
    });

    function startGame() {
        // Càn quét tàn dư cũ
        removeAllBirds();
        score = 0;
        timeLeft = TIME_LIMIT;
        isGameRunning = true;

        // Bật màn hình
        scoreDisplay.innerText = score;
        timerDisplay.innerText = timeLeft;
        startScreen.classList.add('hide');
        endScreen.classList.add('hide');
        retryBtn.classList.add('hide');
        nextBtn.classList.add('hide');

        // Bật BGM
        if (!isMuted) {
            bgmAudio.currentTime = 0;
            bgmAudio.play().catch(e=>console.log("Audio chặn autoplay"));
        }

        // Chạy đồng hồ Time
        timerInterval = setInterval(() => {
            if (!isGameRunning) return;
            timeLeft--;
            timerDisplay.innerText = timeLeft;

            if (timeLeft <= 0) {
                concludeGame();
            }
        }, 1000);

        // Kỹ xảo đẻ sinh vật định kì
        spawnInterval = setInterval(spawnBird, BIRD_SPAWN_RATE);
    }

    // ---- LÒ ẤP CHIM YẾU ĐIỂM (SPAWN AI) ----
    function spawnBird() {
        if (!isGameRunning) return;

        const birdImg = document.createElement('img');
        birdImg.className = 'game-bird';
        
        // Random Vị trí (Từ Trái sang Phải, hoặc Phải sang Trái)
        const isFromLeft = Math.random() > 0.5;
        
        // Cao độ: Tự chọn 1 cao độ ngẫu nhiên từ 15% đến 75% độ cao màn hình
        const randomTop = Math.floor(Math.random() * 60) + 15;
        birdImg.style.top = `${randomTop}%`;

        // Tốc độ bay con này bự hay mập (Từ 3.5s đến 6s)
        const flyDuration = (Math.random() * 2500) + 3500;
        birdImg.style.transitionDuration = `${flyDuration}ms`; // css transition speed

        // Bố trí xuất phát điểm
        if (isFromLeft) {
            birdImg.style.left = '-10%'; // Lấp lửng ngoài màn hình bên Tả
        } else {
            birdImg.style.left = '110%'; // Lấp lửng ngoài màn hình bên Hữu
            birdImg.classList.add('flip'); // Ngược đầu đuôi
        }

        // Kích hoạt nhịp đập Cánh 3 Frames ngay trong thẻ img
        let frameIndex = 1;
        // Chu kỳ bay mượt: Giữa (1) -> Nhấc Lên (2) -> Giữa (1) -> Cụp Xuống (3)
        const frameSequence = [1, 2, 1, 3]; 
        birdImg.src = `../image/bird${frameSequence[0]}.png`;
        
        const flapInterval = setInterval(() => {
            if (!birdImg.isDead) {
                birdImg.src = `../image/bird${frameSequence[frameIndex]}.png`;
                frameIndex = (frameIndex + 1) % frameSequence.length;
            }
        }, 120); // 120ms tốc độ vỗ cánh nhanh hơn dồn dập hơn

        // Đổ chích thuốc Động lệnh click
        birdImg.addEventListener('mousedown', (e) => handleShoot(e, birdImg, flapInterval));
        birdImg.addEventListener('touchstart', (e) => handleShoot(e, birdImg, flapInterval), {passive: false});

        // Bỏ vô bầu trời HTML
        skyStage.appendChild(birdImg);
        birds.push({ element: birdImg, interval: flapInterval });

        // Tung bay: Wait 50ms cho DOM Render, xong chích thẳng biến Left về phía bên kia để kích hoạt Transition CSS
        setTimeout(() => {
            if (!birdImg.isDead) { // Check hờ lỡ nó bị bắn cực chuẩn khi vừa ló mặt
                birdImg.style.left = isFromLeft ? '110%' : '-10%';
            }
        }, 50);

        // Hủy diệt nó sau khi nó bay lố màn hình thoát xác (dù sống hay chết cũng hủy rác DOM)
        setTimeout(() => {
            if (birdImg.parentNode) {
                birdImg.parentNode.removeChild(birdImg);
                clearInterval(flapInterval);
            }
        }, flyDuration + 200);
    }

    // ---- HÀNH ВИ BÓP CÒ (SHOOT) ----
    function handleShoot(e, birdConfig, flapInterval) {
        if (e.type === 'touchstart') e.preventDefault();
        
        if (!isGameRunning || birdConfig.isDead) return;

        // Âm vang cái "Đùng!"
        if (!isMuted) {
            // Clone audio để bắn lẹ liên thanh
            let gunshot = shootAudio.cloneNode();
            gunshot.volume = 0.8;
            gunshot.play().catch(e => console.log(e));
        }

        // Kết án tử
        birdConfig.isDead = true;
        clearInterval(flapInterval);
        birdConfig.src = '../image/bird_die.png'; // Đổi hình Rớt cắm đầu

        // Điểm Cấp Số
        score++;
        scoreDisplay.innerText = score;

        // Trọng Lực CSS rớt ngiêng
        birdConfig.classList.add('bird-dive');

        // Bắt lấy vị trí Left hiện tại nó đang bay dở dang để đóng băng
        const currentLeft = window.getComputedStyle(birdConfig).getPropertyValue('left');
        birdConfig.style.left = currentLeft; 
        
        // Đứt transition left liền lặp tức, nhồi transition Top (CSS top 1s ease-in có sẵn)
        birdConfig.style.transition = 'top 1s ease-in, opacity 0.5s'; 
        
        // Trì hoãn tí ti tạo lực va đập xong ném lao xuống
        setTimeout(() => {
            birdConfig.style.top = '120%'; // Lao xuống đáy
            birdConfig.style.opacity = '0';
        }, 20);

        // Nếu bắn đủ Target ngay lập tức Win luôn khỏi cần chờ
        if (score >= TARGET_SCORE) {
            concludeGame();
        }
    }

    // ---- KẾT ĐỌA VÁN TRANH TÀI ----
    function concludeGame() {
        isGameRunning = false;
        clearInterval(timerInterval);
        clearInterval(spawnInterval);

        endScreen.classList.remove('hide');
        
        if (score >= TARGET_SCORE) {
            // Thắng vinh quang
            endTitle.innerText = "🎉 CÁC ĐẢNG CHIM ĐÃ BỊ LÀM GỎI!";
            endTitle.style.color = "#0b6623";
            endDesc.innerText = `Đỉnh của chóp! Bạn bắn hạ ${score} con!`;
            nextBtn.classList.remove('hide');
        } else {
            // Thua thê thảm
            endTitle.innerText = "😭 CHIM ĐÃ CHIẾM LẤY BẦU TRỜI!";
            endTitle.style.color = "#d00";
            endDesc.innerText = `Bạn chỉ đập rơi ${score}/${TARGET_SCORE} con. Luyện ngắm lại đi!`;
            retryBtn.classList.remove('hide');
        }
    }

    function removeAllBirds() {
        birds.forEach(b => b.interval && clearInterval(b.interval));
        document.querySelectorAll('.game-bird').forEach(el => el.remove());
        birds = [];
    }
});

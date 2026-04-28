document.addEventListener('DOMContentLoaded', () => {
    const imgElement = document.getElementById('character-img');
    const scoreDisplay = document.getElementById('score');
    const timerDisplay = document.getElementById('timer');
    const audioToggleBtn = document.getElementById('audio-toggle-btn');

    // Khởi tạo kênh Nhạc Nền (BGM)
    const bgmAudio = new Audio('../audio/Vừa Trên Hiên.mp3');
    bgmAudio.loop = true;
    bgmAudio.volume = 0.6; // Đặt âm lượng 60%

    // Thiết lập Tham số
    const TARGET_SCORE = 25;
    const TIME_LIMIT = 120; // 2 phút = 120s

    // Thiết lập Biến trạng thái
    let score = 0;
    let timeLeft = TIME_LIMIT;
    let isTurned = false; // Đèn Đỏ: Mặt quay xuống
    let isGameOver = false; // Thu cuộc
    let isWon = false; // Thắng cuộc
    let timerInterval = null;
    let turnTimeout = null;
    let safeTimeout = null;
    let flickTimeout = null;
    let isMuted = false;

    // CÔNG TẮC BẬT TẮT NHẠC
    audioToggleBtn.addEventListener('click', () => {
        if (bgmAudio.paused) {
            bgmAudio.play().catch(e => console.log("Không thể phát nhạc:", e));
            audioToggleBtn.innerText = '🔊';
            isMuted = false;
        } else {
            bgmAudio.pause();
            audioToggleBtn.innerText = '🔇';
            isMuted = true;
        }
    });

    // ----- KHỞI TẠO LUỒNG GAME -----
    function startGame() {
        score = 0;
        timeLeft = TIME_LIMIT;
        isTurned = false;
        isGameOver = false;
        isWon = false;
        
        scoreDisplay.innerText = score;
        timerDisplay.innerText = timeLeft;
        imgElement.src = '../image/1.png'; // Bắt đầu ở Hình 1: An toàn
        
        imgElement.style.pointerEvents = 'auto'; // Cho phép chọt
        
        clearInterval(timerInterval);
        clearTimeout(turnTimeout);
        clearTimeout(safeTimeout);
        clearTimeout(flickTimeout);

        // Kích nhạc ngay và luôn khi vừa vào trang
        if (!isMuted) {
            bgmAudio.currentTime = 0; // Kéo về đầu bài khi game start
            bgmAudio.play().then(() => {
                audioToggleBtn.innerText = '🔊';
            }).catch(e => {
                console.log("Trình duyệt chặn Autoplay. Đợi User tap cái đầu tiên.");
                audioToggleBtn.innerText = '🔇';
            });
        }

        // Chạy đồng hồ
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.innerText = timeLeft;

            if (timeLeft <= 0) {
                // Timeout bị báo thua luôn
                triggerGameOverMode();
            }
        }, 1000);

        // Kích hoạt AI của hình quay lưng
        scheduleTurn();
    }

    // ----- BỘ NÃO ĐÈN XANH/ĐÈN ĐỎ -----
    function scheduleTurn() {
        if (isGameOver || isWon) return;

        // Máy sẽ cho bạn từ 1.2s đến 3.5s an toàn
        const safeDuration = Math.random() * 2300 + 1200;
        
        turnTimeout = setTimeout(() => {
            if (isGameOver || isWon) return;
            
            // Xoay sang Lệnh Đèn Đỏ: Đổi qua HÌNH 3
            isTurned = true;
            imgElement.src = '../image/3.png';

            // Quét xem bạn có chọc ngay lúc này không (Hiệu lực từ 0.5s đến 1.5s)
            const dangerDuration = Math.random() * 1000 + 500;
            
            safeTimeout = setTimeout(() => {
                if (isGameOver || isWon) return;
                
                // Nếu an toàn nấp thành công, cho quay lại Hình 1
                isTurned = false;
                imgElement.src = '../image/1.png'; 
                
                // Kích động vòng quay kế tiếp
                scheduleTurn();
            }, dangerDuration);
            
        }, safeDuration);
    }

    // ----- XỬ LÝ KHÁCH HÀNG TƯƠNG TÁC (CHỌC) -----
    // MouseDown và TouchStart để dập ngay lập tức (Xóa độ trễ click trên dtdd)
    function handleTap(e) {
        if (e.type === 'touchstart') {
            e.preventDefault(); // Tránh dời màn hình trên di động
        }
        
        // Nếu đang ở màn hình Thua và bấm vào ẢNH (chứa nút Chơi Lại tự vẽ) -> Chơi lại ngay
        if (isGameOver && imgElement.src.includes('6.png')) {
            startGame();
            return;
        }

        // Nếu đang ở màn hình Thắng và bấm vào ẢNH (chứa nút Qua Màn tự vẽ) -> Đi tiếp
        if (isWon && imgElement.src.includes('4.png')) {
            window.location.href = 'level2.html';
            return;
        }

        if (isGameOver || isWon) return; // Khoá thao tác nếu đang quá trình chuyển cảnh

        if (isTurned) {
            // Chọc trúng ngay lúc máy đang rình (Hình 3) -> Quẳng vô GameOver
            triggerGameOverSequence();
        } else {
            // Chọc an toàn ở Hình 1 -> Thêm Lệnh Đánh, Nảy KPIs
            if (score === 0 && !isMuted && bgmAudio.paused) {
                // Lách luật trình duyệt: Phát nhạc nền mượt mà ngay cái click đầu tiên nếu Autoplay bị chặn
                bgmAudio.play().then(() => {
                    audioToggleBtn.innerText = '🔊';
                }).catch(e => console.log("Trình duyệt chặn Audio ẩn:", e));
            }
            
            score++;
            scoreDisplay.innerText = score;

            if (score >= TARGET_SCORE) {
                triggerWin();
            } else {
                // Effect: Đánh cái thì nhảy qua Hình 2 (Biểu hiện đau đớn) một chớp rồi nhả về.
                imgElement.src = '../image/2.png';
                clearTimeout(flickTimeout);
                flickTimeout = setTimeout(() => {
                    // Cẩn dặn: Chỉ nhả về nếu không bị GameOver và không dính chu trình xoay
                    if (!isTurned && !isGameOver && !isWon) {
                        imgElement.src = '../image/1.png';
                    }
                }, 100); 
            }
        }
    }

    // Lắng nghe ấn 
    imgElement.addEventListener('mousedown', handleTap);
    imgElement.addEventListener('touchstart', handleTap, {passive: false});

    // ----- CHỐT HẠ THUA THÊ THẢM -----
    function triggerGameOverSequence() {
        isGameOver = true;
        haltEngines();

        // Hình 5: Bắt quả tang tại trận
        imgElement.src = '../image/5.png';
        imgElement.style.pointerEvents = 'none';

        // Nghỉ 1.2s rồi văng hình 6 (Thất bại tràn trề)
        setTimeout(() => {
            imgElement.src = '../image/6.png';
            imgElement.style.pointerEvents = 'auto'; // Mở lại cho người chơi bấm vô hình
        }, 1200);
    }

    function triggerGameOverMode() {
        // Đây do Hết Giờ TimeOut
        isGameOver = true;
        haltEngines();
        
        // Quá giờ cũng xem như rớt KPIs
        imgElement.src = '../image/6.png';
        imgElement.style.pointerEvents = 'auto'; // Mở lại cho bấm vô hình
    }

    // ----- CHỐT HẠ CHIẾN THẮNG VINH QUANG -----
    function triggerWin() {
        isWon = true;
        haltEngines();

        // Hình 4: Win vinh quang
        imgElement.src = '../image/4.png';
        imgElement.style.pointerEvents = 'auto'; // Mở lại cho bấm vô hình
    }

    // Xóa bộ não chạy nền
    function haltEngines() {
        clearInterval(timerInterval);
        clearTimeout(turnTimeout);
        clearTimeout(safeTimeout);
        clearTimeout(flickTimeout);
        bgmAudio.pause(); // Tắt nhạc khi kết thúc màn/thua
    }

    // Vừa vào trang là MÚC LUÔN!
    startGame();

});

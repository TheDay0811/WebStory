document.addEventListener('DOMContentLoaded', () => {
    // ---- DOM GUI ELEMENTS ----
    const audioToggleBtn = document.getElementById('audio-toggle-btn');
    const startBtn = document.getElementById('start-btn');
    const retryBtn = document.getElementById('retry-btn');
    const nextBtn = document.getElementById('next-btn');
    
    const startScreen = document.getElementById('start-screen');
    const endScreen = document.getElementById('end-screen');
    const endTitle = document.getElementById('end-title');
    const endDesc = document.getElementById('end-desc');
    const timerDisplay = document.getElementById('timer');

    // ---- AUDIO DUMMY ----
    const bgmAudio = new Audio('../audio/Về Với Mẹ Cha.mp3');
    bgmAudio.loop = true;
    bgmAudio.volume = 0.6;
    
    let isMuted = false;
    audioToggleBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        if (isMuted) {
            bgmAudio.pause();
            audioToggleBtn.innerText = '🔇';
        } else {
            // Chỉ phát nhạc nếu Game đang chạy (tránh lỗi Play khi chưa ai tương tác)
            if (isGameRunning) {
                bgmAudio.play().catch(e => console.log(e));
            }
            audioToggleBtn.innerText = '🔊';
        }
    });

    // ---- THREE.JS ENGINE SETUP ----
    const canvas = document.getElementById('webgl-canvas');
    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111111, 20, 100);

    // Tính toán Tỉ lệ khung hình và Camera sao cho màn chơi luôn phủ vừa vặn
    // Khung nhìn Orthographic (hoặc Perspective xa) để biến 3D thành 2D Gameplay
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 30; // Camera nhìn thẳng từ trên xuống độ cao 30

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Ánh sáng
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffeedd, 0.8);
    dirLight.position.set(10, 20, 20);
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0x88bbff, 0.5);
    dirLight2.position.set(-10, -20, 10);
    scene.add(dirLight2);

    // ---- XÂY DỰNG MODEL 3D TỪ CODE (PROCEDURAL GENERATION) ----
    
    // 1. CHỦ THỂ: VI KHUẨN (VIRUS)
    function createVirus() {
        const virusGroup = new THREE.Group();
        
        // Lõi Cầu
        const bodyGeo = new THREE.IcosahedronGeometry(1.5, 2);
        const bodyMat = new THREE.MeshPhongMaterial({ 
            color: 0x2efa35, 
            emissive: 0x054f0a,
            shininess: 100,
            flatShading: true
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        virusGroup.add(body);

        // Các Xúc tu (Gai)
        const spikeGeo = new THREE.CylinderGeometry(0.1, 0.3, 1.5, 8);
        const spikeMat = new THREE.MeshPhongMaterial({ color: 0x15a620, flatShading: true });
        
        // Tạo 12 Gai đâm ra bằng toán học hình cầu
        const fibonacci = 12;
        for (let i = 0; i < fibonacci; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / fibonacci);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            const spike = new THREE.Mesh(spikeGeo, spikeMat);
            
            // Tọa độ cầu sang Đề các
            spike.position.x = 1.6 * Math.cos(theta) * Math.sin(phi);
            spike.position.y = 1.6 * Math.sin(theta) * Math.sin(phi);
            spike.position.z = 1.6 * Math.cos(phi);
            
            // Xoay gai hướng ra ngoài
            spike.lookAt(0, 0, 0);
            spike.rotateX(Math.PI / 2); // xoay đít gai vào tâm
            
            virusGroup.add(spike);
        }
        
        // Hitbox Giao diện 2D cho con vi khuẩn (Khoảng Cầu 2.0)
        virusGroup.userData = { radius: 2.0, type: 'player' };
        return virusGroup;
    }

    // 2. KẺ THÙ: LÁ KHIÊN BAY (SHIELD)
    function createShield() {
         // Vẽ 2D Shape của Shield
         const shape = new THREE.Shape();
         shape.moveTo(0, -2);
         shape.quadraticCurveTo(1.5, -1, 1.5, 1);
         shape.lineTo(1.5, 2);
         shape.lineTo(0, 1.5);
         shape.lineTo(-1.5, 2);
         shape.lineTo(-1.5, 1);
         shape.quadraticCurveTo(-1.5, -1, 0, -2);

         const extrudeSettings = {
            depth: 0.5,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 1,
            bevelSize: 0.1,
            bevelThickness: 0.1
         };

         const shieldGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
         // Do ExtrudeGeometry chênh tâm, ta cần dời nó về trung tâm
         shieldGeo.center(); 
         
         const shieldMat = new THREE.MeshPhongMaterial({ 
             color: 0xaabbcc, 
             shininess: 150, 
             specular: 0xffffff,
             flatShading: true
         });
         
         const shield = new THREE.Mesh(shieldGeo, shieldMat);
         // Hiệu chỉnh tỉ lệ cho nhỏ lại hợp khung hình
         shield.scale.set(0.8, 0.8, 0.8);

         // Bọc trong Group để dễ thao tác
         const shieldGroup = new THREE.Group();
         shieldGroup.add(shield);

         // Hitbox 2D cho Lá khiên
         shieldGroup.userData = { 
             radius: 1.5, 
             type: 'enemy',
             rotSpeedX: (Math.random() - 0.5) * 0.1,
             rotSpeedY: (Math.random() - 0.5) * 0.1,
             rotSpeedZ: (Math.random() - 0.5) * 0.1,
             speed: 0
         };
         
         return shieldGroup;
    }

    // ---- BIẾN TRẠNG THÁI GAME ----
    const VIRUS_MAX_X = 15; // Giới hạn bay
    const VIRUS_MAX_Y = 10;

    let player = createVirus();
    scene.add(player);

    let enemies = [];
    
    let isGameRunning = false;
    let surviveTime = 0; // Giây
    let targetTime = 120; // 2 Phút
    let lastTime = 0; // ms
    let timeAccumulator = 0; // Để đếm sang giây

    let spawnTimer = 0;
    
    // Khung chữ nhật lấy tọa độ click -> 3D
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // ---- HÀNH VI ĐIỀU KHIỂN BẰNG CHUỘT / CẢM ỨNG ----
    function onPointerMove(event) {
        if (!isGameRunning) return;
        event.preventDefault(); // Cấm lướt web mobile

        // Quy đổi tọa độ
        let clientX = event.clientX;
        let clientY = event.clientY;
        
        if (event.changedTouches) {
            clientX = event.changedTouches[0].clientX;
            clientY = event.changedTouches[0].clientY;
        }

        // Toán vec-tơ: chuẩn hóa tọa độ thiết bị màn hình sang -1 đến +1
        mouse.x = (clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(clientY / window.innerHeight) * 2 + 1;

        // Bắn tia Raycaster từ Camera xuyên qua mặt phẳng Vector Z=0
        raycaster.setFromCamera(mouse, camera);
        
        // Tìm điểm giao cắt của tia với mặt phẳng ảo (z=0)
        const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const targetPos = new THREE.Vector3();
        raycaster.ray.intersectPlane(planeZ, targetPos);

        if (targetPos) {
            // Giới hạn tọa độ để vi khuẩn không bay tuốt ra ngoài lề
            player.position.x = Math.max(-VIRUS_MAX_X, Math.min(VIRUS_MAX_X, targetPos.x));
            player.position.y = Math.max(-VIRUS_MAX_Y, Math.min(VIRUS_MAX_Y, targetPos.y));
        }
    }

    window.addEventListener('mousemove', onPointerMove, false);
    window.addEventListener('touchmove', onPointerMove, {passive: false});

    // Resize
    window.addEventListener('resize', () => {
        width = window.innerWidth;
        height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });

    // ---- GAME LOGIC ----
    startBtn.addEventListener('click', startGame);
    retryBtn.addEventListener('click', startGame);
    nextBtn.addEventListener('click', () => {
        bgmAudio.pause(); // Tắt nhạc khi chạm Level 4
        window.location.href = 'level4.html';
    });

    function startGame() {
        // Dọn dẹp chiến trường
        enemies.forEach(e => scene.remove(e));
        enemies = [];
        
        surviveTime = 0;
        timerDisplay.innerText = surviveTime;
        player.position.set(0, -5, 0); // Đặt vi khuẩn ở dưới
        
        startScreen.classList.add('hide');
        endScreen.classList.add('hide');
        
        lastTime = performance.now();
        isGameRunning = true;
        
        // Chờ người chơi nhấp chạm để pass rào cản Autoplay policy của web
        if (!isMuted) {
            bgmAudio.currentTime = 0;
            bgmAudio.play().catch(e => {
                console.log("Trình duyệt chặn Autoplay Audio", e);
                isMuted = true;
                audioToggleBtn.innerText = '🔇';
            });
        }
    }

    function triggerGameOver(win) {
        isGameRunning = false;
        endScreen.classList.remove('hide');
        retryBtn.classList.add('hide');
        nextBtn.classList.add('hide');
        
        if (win) {
            endTitle.innerHTML = "TUYỆT ĐỈNH SINH TỒN!";
            endTitle.style.color = "#0b6623";
            endDesc.innerText = `Làm tốt lắm! Bạn đã lách qua mọi đầu đạn trong 2 phút!`;
            nextBtn.classList.remove('hide');
        } else {
            endTitle.innerHTML = "VIRUS BỊ TIÊU DIỆT!";
            endTitle.style.color = "#ff3b3b";
            endDesc.innerText = `Bạn đã nát mầm bệnh ở giây thứ ${surviveTime}.`;
            retryBtn.classList.remove('hide');
        }
    }

    // ---- VÒNG LẶP ENGINE CHÍNH 60FPS ----
    function animate(currentTime) {
        requestAnimationFrame(animate);

        const dt = (currentTime - lastTime); // Deltal Time
        lastTime = currentTime;

        // Cho Virus xoay đều đẹp mắt (lúc nào cũng xoay)
        player.rotation.x += 0.01;
        player.rotation.y += 0.02;

        if (isGameRunning) {
            // Đếm giây (Hạt nhân sống sót)
            timeAccumulator += dt;
            if (timeAccumulator >= 1000) {
                timeAccumulator -= 1000;
                surviveTime++;
                timerDisplay.innerText = surviveTime;
                
                if (surviveTime >= targetTime) {
                    triggerGameOver(true);
                }
            }

            // TÍNH ĐỘ KHÓ: Phù hợp cho màn hình điện thoại
            const difficultyScale = 1 + (surviveTime / 120) * 1; 
            
            // Sinh Khiên thưa hơn: từ 3600ms xuống 1200ms
            const spawnIntervalMs = Math.max(1200, 3600 - (surviveTime / 120) * 2400);

            // SINH KẺ ĐỊCH
            spawnTimer += dt;
            if (spawnTimer >= spawnIntervalMs) {
                spawnTimer = 0;
                let s = createShield();
                
                // Mọc từ ngẫu nhiên 4 viền: 0=Top, 1=Bottom, 2=Left, 3=Right
                const edge = Math.floor(Math.random() * 4);
                const boundX = width / 40; 
                const boundY = height / 40; 
                
                let startX = 0, startY = 0;
                
                switch (edge) {
                    case 0: // Top
                        startX = (Math.random() - 0.5) * boundX * 2;
                        startY = boundY + 5;
                        break;
                    case 1: // Bottom
                        startX = (Math.random() - 0.5) * boundX * 2;
                        startY = -boundY - 5;
                        break;
                    case 2: // Left
                        startX = -boundX - 5;
                        startY = (Math.random() - 0.5) * boundY * 2;
                        break;
                    case 3: // Right
                        startX = boundX + 5;
                        startY = (Math.random() - 0.5) * boundY * 2;
                        break;
                }
                
                s.position.set(startX, startY, 0); 
                
                // Tính Vector nhắm thẳng vào vị trí hiện tại của Vi Khuẩn để săn đuổi
                const dx = player.position.x - startX;
                const dy = player.position.y - startY;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                // Tốc độ bay chậm để dễ chơi trên điện thoại
                const rawSpeed = (0.027 + Math.random() * 0.02) * difficultyScale; 
                
                // Cài đặt vector bay cho Khiên
                s.userData.speedX = (dx / dist) * rawSpeed;
                s.userData.speedY = (dy / dist) * rawSpeed;
                
                scene.add(s);
                enemies.push(s);
            }

            // CẬP NHẬT TRẠNG THÁI TỪNG KẺ ĐỊCH & KIỂM TRA VA CHẠM (COLLISION)
            for (let i = enemies.length - 1; i >= 0; i--) {
                let e = enemies[i];

                e.position.x += e.userData.speedX;
                e.position.y += e.userData.speedY;
                // Xoay hỗn loạn
                e.rotation.x += e.userData.rotSpeedX;
                e.rotation.y += e.userData.rotSpeedY;
                e.rotation.z += e.userData.rotSpeedZ;

                // XÓA RÁC NGOÀI MÀN HÌNH (Ranh giới xa)
                if (Math.abs(e.position.y) > 40 || Math.abs(e.position.x) > 40) {
                    scene.remove(e);
                    enemies.splice(i, 1);
                    continue;
                }

                // KIỂM TRA VA CHẠM BẰNG PYTAGO 2D
                // Vì z=0 trên cùng mặt phẳng, ta xét d = sqrt( dx^2 + dy^2 )
                const dx = player.position.x - e.position.x;
                const dy = player.position.y - e.position.y;
                const distance = Math.sqrt(dx*dx + dy*dy);
                const sumRadius = player.userData.radius + e.userData.radius;

                if (distance < sumRadius) {
                    // ĐỤNG HITBOX
                    triggerGameOver(false); // Thua
                }
            }
        } else {
            // Màn hình PREVIEW: Máy tự cho ra Shield lượn vòng quay chậm làm nền
            if (Math.random() < 0.02) {
                 let s = createShield();
                s.position.set((Math.random() - 0.5) * 30, 20, Math.random() * -10); // Đẩy Z ra sau
                s.userData.speedX = (Math.random() - 0.5) * 0.05;
                s.userData.speedY = -0.05;
                scene.add(s);
                enemies.push(s);
            }
            
            for (let i = enemies.length - 1; i >= 0; i--) {
                let e = enemies[i];
                e.position.x += e.userData.speedX;
                e.position.y += e.userData.speedY;
                e.rotation.x += e.userData.rotSpeedX;
                e.rotation.y += e.userData.rotSpeedY;
                if (e.position.y < -30 || Math.abs(e.position.x) > 30) {
                    scene.remove(e);
                    enemies.splice(i, 1);
                }
            }
        }

        renderer.render(scene, camera);
    }

    // Chạy ngầm Engine
    animate(performance.now());
});

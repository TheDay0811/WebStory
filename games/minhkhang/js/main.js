// Ngăn browser tự khôi phục vị trí cuộn sau khi refresh (sẽ làm lệch GSAP ScrollTrigger)
history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
    // Đăng ký Plugin GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // --- RENDER DỮ LIỆU TỪ DATABASE ---
    const collectionContainer = document.getElementById('dynamicCollection');
    collectionContainer.innerHTML = ''; 

    // Nhóm các loại rượu theo category (type)
    const categorizedDrinks = DRINKS_DB.reduce((acc, drink) => {
        if (!acc[drink.type]) {
            acc[drink.type] = [];
        }
        acc[drink.type].push(drink);
        return acc;
    }, {});

    const tags = ["PRIORITY", "RARE", "SIGNATURE", "CLASSIC", "LIMITED"];

    for (const [type, drinks] of Object.entries(categorizedDrinks)) {
        // Tạo HTML Header cho từng category — luôn có nút THU GỌN
        const headerHTML = `
            <div class="collection-header">
                <p class="subtitle highlight">CURATED COLLECTION</p>
                <div class="collection-header-row">
                    <h2 class="section-title">${type.toUpperCase()} ARTIFACTS</h2>
                    <button class="explore-link explore-toggle" data-expanded="true">THU GỌN <span class="explore-count">↑</span></button>
                </div>
            </div>
        `;
        
        const grid = document.createElement('div');
        grid.className = 'drink-grid';

        drinks.forEach((drink, index) => {
            // Random Tag dựa theo Index để UI giống mẫu
            const tagText = tags[index % tags.length];
            const tagClass = (tagText === 'RARE' || tagText === 'PRIORITY') ? 'rare' : (tagText === 'CLASSIC' ? 'classic' : 'signature');

            const card = document.createElement('div');
            card.className = 'drink-card';
            // Mặc định hiện TẤT CẢ card
            card.innerHTML = `
                <div class="drink-img-container">
                    <img src="${drink.img}" alt="${drink.name}" class="drink-img">
                </div>
                <div class="card-title-row">
                    <h3 class="drink-name">${drink.name}</h3>
                    <span class="tag ${tagClass}">${tagText}</span>
                </div>
                <p class="drink-taste">${drink.taste}</p>
                <button class="btn-outline full-width">INQUIRE ACCESS</button>
            `;
            
            // Bấm vào card sẽ mở modal
            card.addEventListener('click', () => openModal(drink));
            grid.appendChild(card);
        });

        // Đóng gói Header và Grid vào 1 Section
        const categorySection = document.createElement('div');
        categorySection.className = 'category-section';
        categorySection.innerHTML = headerHTML;
        categorySection.appendChild(grid);

        // Gắn sự kiện toggle: THU GỌN ẩn TẤT CẢ, EXPLORE ALL hiện TẤT CẢ
        const toggleBtn = categorySection.querySelector('.explore-toggle');
        const allCards = Array.from(grid.querySelectorAll('.drink-card'));

        toggleBtn.addEventListener('click', () => {
            const isExpanded = toggleBtn.dataset.expanded === 'true';

            if (isExpanded) {
                // Thu gọn: ẩn TẤT CẢ card với animation trượt lên bằng GSAP
                allCards.forEach((card, i) => {
                    gsap.to(card, {
                        opacity: 0,
                        y: -15,
                        duration: 0.25,
                        delay: i * 0.03,
                        ease: 'power2.in',
                        onComplete: () => { card.style.display = 'none'; }
                    });
                });
                toggleBtn.dataset.expanded = 'false';
                toggleBtn.innerHTML = `EXPLORE ALL <span class="explore-count">(${drinks.length})</span>`;
            } else {
                // Mở rộng: hiện TẤT CẢ card
                allCards.forEach((card, i) => {
                    // CỰC KỲ QUAN TRỌNG: Xoá inline styles (opacity: 0) mà GSAP vừa gán ở bước thu gọn
                    gsap.set(card, { clearProps: "all" });
                    
                    card.style.display = 'flex';
                    // Xóa class để reset CSS animation
                    card.classList.remove('card-visible');
                    
                    // Delay ngắn để trình duyệt nhận diện trạng thái mới rồi mới apply CSS transition
                    setTimeout(() => {
                        card.classList.add('card-visible');
                    }, i * 60 + 20);
                });
                toggleBtn.dataset.expanded = 'true';
                toggleBtn.innerHTML = `THU GỌN <span class="explore-count">↑</span>`;
            }
        });

        collectionContainer.appendChild(categorySection);
    }

    // --- ANIMATIONS VỚI GSAP SCROLLTRIGGER ---

    // 1. Hero section fade-in lúc vừa load trang
    gsap.from('.hero-content > *', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.5
    });

    // 2. Story section trượt từ 2 bên vào khi cuộn chuột tới
    gsap.from('.story-image', {
        scrollTrigger: {
            trigger: '.story-section',
            start: 'top 80%'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.from('.story-content > *', {
        scrollTrigger: {
            trigger: '.story-section',
            start: 'top 80%'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // 3. Header animation dùng IntersectionObserver thay vì GSAP ScrollTrigger
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const headers = entry.target.querySelectorAll('.collection-header > *');
                headers.forEach((header, i) => {
                    setTimeout(() => {
                        header.classList.add('header-visible');
                    }, i * 150);
                });
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.category-section').forEach(section => {
        headerObserver.observe(section);
    });

    // 4. Card animation dùng IntersectionObserver (không bị lệch khi body overflow thay đổi)
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.drink-card');
                cards.forEach((card, i) => {
                    setTimeout(() => {
                        card.classList.add('card-visible');
                    }, i * 80);
                });
                cardObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.drink-grid').forEach(grid => {
        cardObserver.observe(grid);
    });




    // --- MODAL POPUP LOGIC ---
    const modalOverlay = document.getElementById('drinkModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalContent = document.querySelector('.modal-content');
    
    // Set mặc định ẩn và thu nhỏ
    gsap.set(modalContent, { scale: 0.8, opacity: 0 });

    function openModal(drink) {
        document.getElementById('modalImg').src = drink.img;
        document.getElementById('modalTitle').textContent = drink.name;
        document.getElementById('modalTaste').textContent = drink.taste;
        document.getElementById('modalDesc').innerHTML = drink.desc;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 

        // Hiệu ứng búng ra
        gsap.to(modalContent, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.5)'
        });
    }

    function closeModalFunc() {
        // Hiệu ứng thu lại
        gsap.to(modalContent, {
            scale: 0.8,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
                // Refresh ScrollTrigger sau khi scrollbar xuất hiện trở lại
                ScrollTrigger.refresh();
            }
        });
    }

    closeModalBtn.addEventListener('click', closeModalFunc);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModalFunc();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const accountInput = document.getElementById('account');
    const passwordInput = document.getElementById('password');

    loginBtn.addEventListener('click', (e) => {
        // Ngăn chặn bị load lại trang
        e.preventDefault();
        
        const account = accountInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (account !== '' && password !== '') {
            // Hiệu ứng đang tải (Mockup)
            const originalText = loginBtn.textContent;
            loginBtn.textContent = 'AUTHENTICATING...';
            loginBtn.style.pointerEvents = 'none'; // Không cho click đúp
            loginBtn.style.opacity = '0.7';
            
            // Giả lập thời gian load 1.2 giây
            setTimeout(() => {
                // Kiểm tra tài khoản trong CSDL
                const validUser = ACCOUNT_DB.find(u => u.username === account && u.password === password);

                if (validUser) {
                    // Đang thiết lập cảm giác ngầu của giao diện authenticating...
                    // TODO: (Sau này) Lưu trạng thái đăng nhập bằng localStorage để kiểm soát an ninh trang game
                    localStorage.setItem('loggedUser', JSON.stringify(validUser));
                    
                    // Reset trạng thái nút
                    loginBtn.textContent = originalText;
                    loginBtn.style.pointerEvents = 'auto';
                    loginBtn.style.opacity = '1';
                    
                    // Chuyển hướng trình tự vào đúng thế giới Game thuộc Account của họ
                    if (validUser.gameId === 'hoanglong') {
                        window.location.href = `../games/${validUser.gameId}/html/dashboard.html`;
                    } else {
                        window.location.href = `../games/${validUser.gameId}/html/index.html`;
                    }
                } else {
                    alert("Sai tên người dùng hoặc mật khẩu! Chìa khóa không hợp lệ.");
                    // Trả lại trạng thái cho nút
                    loginBtn.textContent = originalText;
                    loginBtn.style.pointerEvents = 'auto';
                    loginBtn.style.opacity = '1';
                }
            }, 1200);
        } else {
            // Cảnh báo nếu nhập chưa đủ
            alert("Vui lòng nhập một chìa khóa Account và Password bất kỳ để mở cửa!");
        }
    });

    // Cho phép ấn phím Enter để login
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            loginBtn.click();
        }
    });
});

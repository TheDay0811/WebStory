# Tổng quan dự án: STORY (Hành trình Mở khóa / Game Hub)

Đây là tài liệu mô tả kiến trúc cốt lõi của siêu dự án web cá nhân, giúp các AI Agent sau này đọc được và tiếp tục phát triển không bị sai lệch ý tưởng.

## 1. Mục tiêu Cốt lõi (Core Vision)
Dự án vận hành như một **Game Hub (Trung tâm chứa nhiều phân vùng trò chơi)**. 
Trang Đăng Nhập (`login.html`) không phải là cổng mở vào duy nhất 1 game, mà đóng vai trò như một cỗ máy **chọn và phân luồng**.
- **Mỗi tài khoản (Account/Key)** đại diện cho một "Thế giới câu chuyện / Game" hoàn toàn riêng biệt của một nhân vật.
- Khi người trải nghiệm nhập đúng "Chìa khóa" thuộc về "Ai", hệ thống sẽ chuyển hướng họ vào "Game của người đó" để chứng kiến và giải đố (đọc thông tin, xem ảnh, nghe ghi âm) qua các mốc thời gian (các Level).

## 2. Nền tảng Kỹ thuật
- **Kiến trúc Tĩnh (Zero-Server):** Không cài đặt Backend/Node.js để vận hành. Toàn bộ logic giải đố, mở khóa màn được mã hóa bằng Client-Side JS để trình duyệt hoạt động siêu mượt và offline.
- **Mock DB:** File `accounts.js` dùng để tra cứu định danh.
- **LocalStorage:** Tính năng bộ nhớ Trình duyệt để lưu lại người chơi đã tới được Level mấy.
- **Đồ họa 3D:** Minigame 3 sử dụng thư viện **Three.js** (CDN) để render đồ họa 3D hoàn toàn trên trình duyệt (không cần server, không cần file model ngoài).

## 3. Bản đồ Thư mục Mới Nhất (Directory Mapping)
```text
/d/web/
├── html/
│   └── login.html        # Màn hình chính (Cổng vào Game Hub)
├── css/
│   └── login.css         # Thiết kế UI cổng chính huyền bí
├── js/
│   └── login.js          # Logic xác định người dùng -> Redirect
├── data/
│   └── accounts.js       # Hệ thống chìa khóa & dữ liệu nhận dạng
├── games/                # [QUAN TRỌNG] Vùng không gian độc lập
│   └── giahan/           # KHU VỰC ĐÃ THIẾT KẾ MẪU
│       ├── html/
│       │   ├── index.html       # Cốt truyện Màn 1 Scrapbook
│       │   ├── minigame.html    # Động cơ Minigame 1 (Đèn Xanh - Đỏ)
│       │   ├── level2.html      # Cốt truyện Màn 2 phá án
│       │   ├── minigame2.html   # Động cơ Minigame 2 (Bắn Chim)
│       │   ├── level3.html      # Cốt truyện Màn 3
│       │   ├── minigame3.html   # Động cơ Minigame 3 (Sinh Tồn Vi Khuẩn 3D) ✅
│       │   └── level4.html      # Cốt truyện Màn 4 [SCAFFOLD - Chờ nội dung]
│       ├── css/
│       │   ├── style.css        # CSS Scrapbook chung Màn 1, 2, 3, 4
│       │   ├── minigame.css     # CSS Minigame 1
│       │   ├── minigame2.css    # CSS Minigame 2
│       │   └── minigame3.css    # CSS Minigame 3 (Dark Mode + 3D UI)
│       ├── js/
│       │   ├── game.js          # Điều hướng Màn 1
│       │   ├── minigame.js      # Engine Đèn Xanh - Đỏ
│       │   ├── level2.js        # Nút chuyển trang Màn 2
│       │   ├── minigame2.js     # Engine Săn bắn Chim
│       │   ├── level3.js        # Nút Play Màn 3 -> Minigame 3
│       │   ├── minigame3.js     # Engine Three.js Sinh Tồn Vi Khuẩn ✅
│       │   └── level4.js        # [SCAFFOLD] Điều hướng Màn 4
│       ├── audio/
│       │   ├── Mưa Rơi Ngoài Hiên.mp3
│       │   ├── Về Với Mẹ Cha.mp3   # ← BGM của Minigame 3
│       │   └── Vừa Trên Hiên.mp3
│       └── image/               # Thư mục lưu 100% hình ảnh độc quyền
│   └── minhkhang/        # [DỰ ÁN MỚI] Khu vực của Minh Khang (Tửu Long)
│       ├── html/
│       │   └── menu.html        # Trang chủ & Menu hiển thị sản phẩm
│       ├── css/
│       │   └── style.css        # Giao diện Dark Luxury, Speakeasy Bar
│       ├── js/
│       │   ├── main.js          # Logic cuộn trang, render sản phẩm, modal
│       │   └── database.js      # Mock DB danh sách đồ uống (Gin, Whisky...)
│       └── assets/              # Thư mục hình ảnh rượu, icon
└── md/
    └── project_overview.md      # Tài liệu dự án (file này)
```

## 4. Tiến Trình Phát Triển Tới Hiện Tại (Changelog)
- **Hệ thống Cửa**: Đã hoàn thiện xác thực Account riêng cho Gia Hân (`han1207`) trỏ thẳng tới `games/giahan/html/index.html`.
- **Giao diện Gia Hân Màn 1**: Xây dựng thành công kiến trúc Scrapbook Nhặt Dán sinh động. Áp dụng Responsive linh hoạt căn lề chuẩn màn hình Di động, có thêm cỗ máy Scale-Up Auto tăng phóng to tự nhiên khi duyệt trên Laptop lớn/PC 4K. Kích hoạt font "Patrick Hand" triệt tiêu các lỗi font chữ Tiếng Việt.
- **Cơ Chế Minigame (Khắc tinh KPI)**:
  - Game Mini đóng vai trò là "Thử thách trùm" ở Màn 1, dẫn thẳng link từ Nút `Play`.
  - Cốt truyện Đèn Xanh - Đỏ: Bắt buộc chạm liên tục nhân vật để lấy 25 điểm trong vòng 2 phút hồi hộp. Hễ nhấp nhầm lúc máy quay mặt lại là phán Game Over.
  - Cơ chế điều khiển Siêu Thông Minh: Lắng nghe chạm ngón tay/click chuột *TRỰC TIẾP* lên trên tấm ảnh tĩnh (Vì nút Chơi lại được người dùng vẽ cứng vào ảnh), lược bỏ sạch sẽ các Object Nút bấm HTML vô tri.
  - Phần thưởng thắng cuộc là link mở cửa dẫn vô vùng sâu thẳm `level2.html`.
- **Giao diện Gia Hân Màn 2 (`level2.html`)**: Chuyển hoá thành công bản mockup phức tạp xen kẽ hình ảnh và Text. Sử dụng font có chân (Serif) kết hợp tính năng `.drawn-border-red` tạo khung ảnh nét đứt chì đỏ giống hệt bản phác thảo vẽ tay của người dùng. Nút Play cuối màn dẫn sang Minigame 2.
- **Cơ Chế Minigame 2 (Bắn Chim Duck Hunt)**:
  - Hệ máy: `minigame2.html`
  - Luật chơi bắn ngắm (Crosshair): Chim bồ câu lượn qua bay lại trong 60 giây. Cần giật bắn 15 con chim để Thăng cấp vinh quang.
  - Engine Animation Sinh học 3 Frames: Chim bay nhấp nháy 3 khung hình ghép liền mạch tạo thành chuyển động đập cánh (`bird1/2/3`). Khi bị bắn trúng `bird_die`, kết hợp với lực hấp dẫn rớt khỏi bầu trời bằng CSS transition thuần siêu mượt. Khu vực BGM có tích hợp nhạc lách luật tự động phát. Khi Win Màn 2, một tấm bảng đưa thẳng tiến trình qua Màn 3.
- **Giao diện Gia Hân Màn 3 (`level3.html`) và Khung Minigame 3 (`minigame3.html`)**:
  - `level3.html`: Đã thêm luồng điều hướng nút Play trỏ tới Màn Minigame 3.
  - `minigame3.html`: Đã dựng sẵn Form giao diện tĩnh với chủ đề "Bắt Tim". Gồm Hệ thống thanh điều hướng HUD (Điểm/Thời gian/Mute) và Màn hình Chờ/Kết thúc. Hiện tại Logic engine bắt tim chưa được code, ấn Play sẽ giả lập thắng sau 3 giây để người dùng test thiết kế UI.

- **Dự án Minh Khang (Tửu Long)** `[CHƯA HOÀN THÀNH]`:
  - **Concept**: Cocktail & Whisky Speakeasy Bar mang âm hưởng Á Đông (Eastern Dragon), sử dụng phong cách thiết kế Dark Luxury (Vàng đồng, Đỏ rượu, Đen).
  - **Cơ sở dữ liệu**: Đã xây dựng `database.js` chứa danh mục sản phẩm (Mock DB) và ánh xạ với hình ảnh thực tế trong thư mục `assets`.
  - **Giao diện Menu (`menu.html` & `style.css`)**: 
    - Khởi tạo thanh điều hướng (Navbar) tự động trượt mượt mà (Scrolled effect) khi người dùng cuộn.
    - Cập nhật phần "The Eternal Legend" với câu chuyện thương hiệu kết hợp nghệ thuật pha chế và thần thoại Phương Đông.
    - **Hệ thống Modal**: Triển khai 1 Modal xem chi tiết đồ uống (Drink Detail) khi nhấp vào sản phẩm từ Collection, và 1 Info Modal nhỏ gọn, thanh lịch hiển thị nội dung các mục Footer (Privacy Policy, Terms of Service, Media hợp tác cùng THEDAY, Global Presence) không cần tải lại trang.

- **Dự án Thiên An**:
    - Concept: (Chưa xác định cụ thể).
    - Thông tin đăng nhập: Tài khoản: `thienan` | Mật khẩu: `an1111`.

- **Dự án Hoàng Long (Thăng Long Logistics)**:
    *   **Concept**: Hệ thống Quản trị Nhân sự (HRM Portal) chuyên nghiệp cho công ty vận tải.
    *   **Thông tin đăng nhập**: Tài khoản: `hoanglong` | Mật khẩu: `long2507`.
    *   **Tiến độ chi tiết**:
        *   **Dashboard & Directory**: Hoàn thiện bảng điều khiển tổng quan và danh sách nhân viên đồng bộ dữ liệu real-time.
        *   **Quản lý Hợp đồng (Contracts)**: Tự động hóa việc theo dõi thời hạn hợp đồng. Hệ thống tự tính toán số lượng hợp đồng sắp hết hạn (trong 30 ngày) và đã hết hạn. Bộ lọc tìm kiếm hoạt động chính xác theo loại hợp đồng và trạng thái.
        *   **Thay đổi Trạng thái (Status Management)**: 
            *   Cho phép cập nhật trạng thái (Active/Resigned/Dismissed) kèm theo lý do cụ thể.
            *   Tự động cập nhật ngày hết hạn hợp đồng dựa trên logic nghiệp vụ (Nghỉ việc -> Chấm dứt ngay; Quay lại làm -> Gia hạn 1 năm).
            *   Hệ thống Audit Log: Ghi lại toàn bộ lịch sử thay đổi trạng thái vào bộ nhớ để theo dõi hậu kiểm.
        *   **Tuyển dụng (Onboarding)**: Form thêm nhân viên mới hỗ trợ đầy đủ các trường dữ liệu nâng cao (CCCD, Ngân hàng, Tài khoản, Ngày hợp đồng).
        *   **UI/UX Standard**:
            *   Đồng bộ hóa Header và Việt hóa toàn bộ thanh điều hướng (Sidebar) trên tất cả các trang.
            *   Tích hợp hệ thống **Toast Notification** chuyên nghiệp thay thế cho alert mặc định.
        *   **Dữ liệu**: Sử dụng `localStorage` (key: `hoanglong_db` và `hoanglong_status_logs`) để lưu trữ dữ liệu bền vững trên trình duyệt.


## 5. Hướng dẫn cho AI Agent tương lai
Tuyệt đối tôn trọng kiến trúc tách biệt. Mỗi nhân vật/thế giới là một thư mục riêng bên trong `games/`. Ví dụ, mọi yêu cầu về Tửu Long phải được thực hiện gọn gàng bên trong `games/minhkhang/`. Tránh ghi đè file CSS hay JS ra ngoài cấp root. Mọi hình ảnh mà UX yêu cầu luôn hướng về thư mục chứa media của riêng phân vùng đó.

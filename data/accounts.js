// Mô phỏng Cơ sở dữ liệu (Database) thu nhỏ cho dự án
// Chìa khóa dẫn vào các Thế giới (Game) khác nhau.
const ACCOUNT_DB = [
    {
        username: "thienan", // Tên đăng nhập của Thiên An
        password: "123",
        role: "player",
        gameId: "thienan", // Chìa khóa kích hoạt thư mục games/thienan/
        unlockedLevel: 1
    },
    {
        username: "minhkhang", // Tên đăng nhập của Minh Khang
        password: "khang0101",
        role: "player",
        gameId: "minhkhang", // Chìa khóa kích hoạt thư mục games/minhkhang/
        unlockedLevel: 1
    },
    {
        username: "giahan", // Tên đăng nhập của Gia Hân
        password: "han1207",
        role: "player",
        gameId: "giahan", // Chìa khóa kích hoạt thư mục games/giahan/
        unlockedLevel: 1
    }
];

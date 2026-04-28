// Cơ sở dữ liệu danh mục Rượu/Cocktail của Minh Khang
// Mỗi loại rượu có thể chứa một đoạn mô tả / cốt truyện ẩn

const DRINKS_DB = [
    // ================= WHISKY =================
    { id: 'boulevardier', name: 'Boulevardier', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Boulevardier.png' },
    { id: 'godfather', name: 'Godfather', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Godfather.png' },
    { id: 'highball', name: 'Highball', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Highball.png' },
    { id: 'manhattan', name: 'Manhattan', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Manhattan.png' },
    { id: 'morning-glory-fizz', name: 'Morning Glory Fizz', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Morning Glory Fizz.png' },
    { id: 'new-york-sour', name: 'New York Sour', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/New York Sour.png' },
    { id: 'old-fashioned', name: 'Old Fashioned', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Old Fashioned.png' },
    { id: 'penicillin', name: 'Penicillin', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Penicillin.png' },
    { id: 'rob-roy', name: 'Rob Roy', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Rob Roy.png' },
    { id: 'sazerac', name: 'Sazerac', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Sazerac.png' },
    { id: 'whisky-sour', name: 'Whisky Sour', type: 'Whisky', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Whisky Sour.png' },

    // ================= GIN =================
    { id: 'clover-club', name: 'Clover Club', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Clover Club.png' },
    { id: 'dry-martini', name: 'Dry Martini', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Dry Martini.png' },
    { id: 'gimlet', name: 'Gimlet', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Gimlet.png' },
    { id: 'gin-fizz', name: 'Gin Fizz', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Gin Fizz.png' },
    { id: 'gin-tonic', name: 'Gin Tonic', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Gin Tonic.png' },
    { id: 'james-bond', name: 'James Bond', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/James Bond.png' },
    { id: 'negroni', name: 'Negroni', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Negroni.png' },
    { id: 'ramos-gin-fizz', name: 'Ramos Gin Fizz', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Ramos Gin Fizz.png' },
    { id: 'singapore-sling', name: 'Singapore Sling', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Singapore Sling.png' },
    { id: 'the-last-word', name: 'The Last Word', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/The Last Word.png' },
    { id: 'vesper', name: 'Vesper', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Vesper.png' },
    { id: 'white-lady', name: 'White Lady', type: 'Gin', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/White Lady.png' },

    // ================= VODKA =================
    { id: 'black-russian', name: 'Black Russian', type: 'Vodka', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Black Russian.png' },
    { id: 'blue-monday', name: 'Blue Monday', type: 'Vodka', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Blue Monday.png' },
    { id: 'kamikaze', name: 'Kamikaze', type: 'Vodka', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Kamikaze.png' },
    { id: 'white-russian', name: 'White Russian', type: 'Vodka', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/White Russian.png' },

    // ================= TEQUILA =================
    { id: 'margarita', name: 'Margarita', type: 'Tequila', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Margarita.png' },
    { id: 'tegroni', name: 'Tegroni', type: 'Tequila', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Tegroni.png' },

    // ================= RUM =================
    { id: 'daiquiri', name: 'Daiquiri', type: 'Rum', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Daiquiri.png' },
    { id: 'maitai', name: 'Maitai', type: 'Rum', taste: 'Chưa cập nhật', desc: '<p>Chưa có nội dung...</p>', img: '../assets/Maitai.png' }
];

// Cơ sở dữ liệu danh mục Rượu/Cocktail của Minh Khang
// Mỗi loại rượu có thể chứa một đoạn mô tả / cốt truyện ẩn

const DRINKS_DB = [
    // ================= WHISKY =================
    {
        id: 'boulevardier',
        name: 'Boulevardier',
        type: 'Whisky',
        taste: 'Đậm đà, đắng nhẹ kiểu thảo mộc từ Campari, hậu vị ngọt ấm của vermouth và whisky.',
        desc: '<p><strong>Công thức:</strong> Bourbon hoặc Rye Whisky, Campari, Sweet Vermouth.</p><p>Sang trọng, trưởng thành, hơi giống Negroni nhưng mềm hơn.</p><p>Đây là loại phù hợp cho bàn công việc, vị đắng nhẹ thể hiện sự trưởng thành trong mỗi con người, giỏi chịu đựng để trưởng thành, về tác dụng vị đắng cũng giúp kích thích vị giác để nhâm nhi món ăn kèm, thời gian bàn chuyện sẽ được tăng lên vị đắng cũng kích thích sư tập trung</p><p>Hậu ngọt là tượng trưng cho 1 kết thúc tốt, tôi không chỉ nói về công việc</p><p>Việc chọn loại thức uống cũng là 1 nghệ thuật, việc chọn đúng thể hiện bạn là 1 con người tinh tế và sâu sắc, để ý tiểu tiết.</p><p>Nên việc chọn đúng thức uống giúp bạn có 1 trải nghiệm tốt hơn</p>',
        img: '../assets/Boulevardier.png'
    },
    {
        id: 'godfather',
        name: 'Godfather',
        type: 'Whisky',
        taste: 'Ngọt ngào, đậm mùi hạnh nhân (amaretto), êm dịu và mạnh mẽ.',
        desc: '<p><strong>Công thức:</strong> Scotch Whisky, Amaretto.</p><p>Một thức uống cổ điển đơn giản nhưng đầy quyền lực, đúng như tên gọi của nó.</p><p>Dù trải nghiệm khá nhiều loai thức uống, nhưng để đánh giá và nhận xét về Godfather thì tôi không đủ trình độ, nói sao nhỉ?</p><p>Những lần tôi uống và tự cảm nhận thì nó chỉ nằm trên phương diện là vị giác thôi, Còn lúc tôi thật sự cảm nhận được độ nặng của loại thức uống này là đi chung với Bố tôi và đối tác của ông,khi 2 người đó uống loại thức uống này thì sự áp đảo về đia vị, tri thức, đẳng cấp khiến thứ cocktail này có thể bộc lộ hết tiềm năng </p><p>Nên tôi nghĩ hãy gọi loại này cho người bạn cảm thấy tôn trọng</p>',
        img: '../assets/Godfather.png'
    },
    {
        id: 'highball',
        name: 'Highball',
        type: 'Whisky',
        taste: 'Sạch, sảng khoái, tôn vinh hương vị đặc trưng của loại rượu nền.',
        desc: '<p><strong>Công thức:</strong> Whisky, Soda water, chanh tươi.</p><p>Món uống tinh tế, nhẹ nhàng, lý tưởng để bắt đầu một buổi tối.</p><p>đây là loại thức uống mà mình thấy phù hợp với bản thân lắm luôn, tại tôi cực kì lười để bắt đầu 1 thứ gì đó cũng giống việc làm trang web này tôi delay nó khá lâu mới làm tiếp á.</p>',
        img: '../assets/Highball.png'
    },
    {
        id: 'manhattan',
        name: 'Manhattan',
        type: 'Whisky',
        taste: 'Sang trọng, mượt mà, sự kết hợp hoàn hảo giữa vị ngọt và đắng.',
        desc: '<p><strong>Công thức:</strong> Rye hoặc Bourbon, Sweet Vermouth, Bitters.</p><p>Được mệnh danh là "nữ hoàng của các loại cocktail", Manhattan mang vẻ đẹp của New York về đêm.</p><p>Nếu có cơ hội hãy gọi thức uống này cho người phụ nữ mà bạn tôn trọng và trân quý.</p>',
        img: '../assets/Manhattan.png'
    },
    {
        id: 'morning-glory-fizz',
        name: 'Morning Glory Fizz',
        type: 'Whisky',
        taste: 'Phức hợp, chua nhẹ, hương thảo mộc từ Absinthe, lớp bọt mịn màng.',
        desc: '<p><strong>Công thức:</strong> Scotch, Lemon/Lime, Absinthe, Soda, Egg white.</p><p>Một thức uống truyền thống đầy năng lượng, thường được dùng để khơi dậy giác quan.</p><p></p><p>Một ly chanh,một ánh mắt</p><p></p><p>Vị thì chua,lòng thì ngọt</p>Như 1 đứa trẻ chưa lớn<p></p><p>Chỉ biết trốn tránh điều mới</p><p></p><p></>Sai lầm nối tiếp sai lầm</p><p></p><p>Câu trả lời đáng sợ nhất</p><p></p><p>Chưa bao giờ đến từ bạn</p><p></p><p>Mà là tôi </p><p>Xin lỗi mọi người đọc phải thơ tôi tự làm tôi kiểu không phải loại người biết viết thơ nhưng tớ cũng đã từng thử để theo đuổi ước mơ nhưng chắc tớ không hợp,không có duyên.</p>',
        img: '../assets/Morning Glory Fizz.png'
    },
    {
        id: 'new-york-sour',
        name: 'New York Sour',
        type: 'Whisky',
        taste: 'Chua ngọt cân bằng, có thêm độ chát nhẹ và vị trái cây từ vang đỏ.',
        desc: '<p><strong>Công thức:</strong> Whiskey Sour truyền thống, phủ một lớp vang đỏ khô (Red Wine float).</p><p>Vẻ ngoài phân tầng bắt mắt cùng hương vị đa chiều đầy lôi cuốn.</p>',
        img: '../assets/New York Sour.png'
    },
    {
        id: 'old-fashioned',
        name: 'Old Fashioned',
        type: 'Whisky',
        taste: 'Đậm chất rượu, nồng nàn, chút ngọt nhẹ và hương thơm từ vỏ cam.',
        desc: '<p><strong>Công thức:</strong> Bourbon hoặc Rye, đường, Bitters.</p><p>Cội nguồn của cocktail, dành cho những ai trân trọng giá trị nguyên bản.</p>',
        img: '../assets/Old Fashioned.png'
    },
    {
        id: 'penicillin',
        name: 'Penicillin',
        type: 'Whisky',
        taste: 'Phức hợp, hương khói đặc trưng, vị cay của gừng và ngọt dịu của mật ong.',
        desc: '<p><strong>Công thức:</strong> Blended Scotch, chanh, siro mật ong gừng, Islay Scotch float.</p><p>Một "liều thuốc" tinh thần mạnh mẽ cho những đêm se lạnh.</p>',
        img: '../assets/Penicillin.png'
    },
    {
        id: 'rob-roy',
        name: 'Rob Roy',
        type: 'Whisky',
        taste: 'Mạnh mẽ, hương mạch nha đặc trưng của Scotch, ngọt đắng nhẹ nhàng.',
        desc: '<p><strong>Công thức:</strong> Scotch Whisky, Sweet Vermouth, Bitters.</p><p>Tương tự Manhattan nhưng mang đậm linh hồn của vùng cao nguyên Scotland.</p>',
        img: '../assets/Rob Roy.png'
    },
    {
        id: 'sazerac',
        name: 'Sazerac',
        type: 'Whisky',
        taste: 'Nồng nàn, hương thảo mộc và hồi (anise), hậu vị phức hợp và kéo dài.',
        desc: '<p><strong>Công thức:</strong> Rye Whiskey, đường, Peychaud’s Bitters, tráng ly bằng Absinthe.</p><p>Linh hồn của vùng New Orleans, một thức uống đầy cá tính và lịch sử.</p>',
        img: '../assets/Sazerac.png'
    },
    {
        id: 'whisky-sour',
        name: 'Whisky Sour',
        type: 'Whisky',
        taste: 'Tươi sáng, chua thanh, béo nhẹ và vô cùng mượt mà.',
        desc: '<p><strong>Công thức:</strong> Whisky, chanh, đường, lòng trắng trứng (tùy chọn).</p><p>Sự cân bằng mẫu mực giữa vị chua của chanh và sự nồng ấm của gỗ sồi.</p>',
        img: '../assets/Whisky Sour.png'
    },

    // ================= GIN =================
    {
        id: 'clover-club',
        name: 'Clover Club',
        type: 'Gin',
        taste: 'Mượt mà như lụa, vị trái cây mâm xôi ngọt ngào, chua nhẹ cân bằng.',
        desc: '<p><strong>Công thức:</strong> Gin, chanh, siro mâm xôi (raspberry), lòng trắng trứng.</p><p>Từng là thức uống yêu thích của các quý ông tại câu lạc bộ cùng tên ở Philadelphia.</p>',
        img: '../assets/Clover Club.png'
    },
    {
        id: 'dry-martini',
        name: 'Dry Martini',
        type: 'Gin',
        taste: 'Khô (dry), sắc sảo, nồng nàn hương thảo mộc và bách tùng.',
        desc: '<p><strong>Công thức:</strong> Gin, Dry Vermouth. Trang trí bằng ô liu hoặc vỏ chanh.</p><p>Biểu tượng tối thượng của sự tinh tế và đẳng cấp trong giới cocktail.</p>',
        img: '../assets/Dry Martini.png'
    },
    {
        id: 'gimlet',
        name: 'Gimlet',
        type: 'Gin',
        taste: 'Sắc sảo, đậm vị chanh, chua thanh và cực kỳ sảng khoái.',
        desc: '<p><strong>Công thức:</strong> Gin, nước cốt chanh, siro đường.</p><p>Một thức uống đơn giản nhưng đòi hỏi sự cân bằng tuyệt đối giữa Gin và Acid.</p>',
        img: '../assets/Gimlet.png'
    },
    {
        id: 'gin-fizz',
        name: 'Gin Fizz',
        type: 'Gin',
        taste: 'Sủi bọt sảng khoái, vị chanh tươi sáng, nhẹ nhàng và dễ uống.',
        desc: '<p><strong>Công thức:</strong> Gin, chanh, đường, Soda water.</p><p>Người anh em sôi động của Gimlet, hoàn hảo cho những buổi chiều nắng ấm.</p>',
        img: '../assets/Gin Fizz.png'
    },
    {
        id: 'gin-tonic',
        name: 'Gin Tonic',
        type: 'Gin',
        taste: 'Tươi mát, nồng nàn hương thực vật, hậu vị đắng nhẹ đặc trưng.',
        desc: '<p><strong>Công thức:</strong> Gin, nước Tonic, chanh tươi.</p><p>Sự kết hợp kinh điển không bao giờ lỗi thời, tôn vinh trọn vẹn đặc tính của Gin.</p>',
        img: '../assets/Gin Tonic.png'
    },
    {
        id: 'james-bond',
        name: 'James Bond',
        type: 'Gin',
        taste: 'Mạnh mẽ, sắc lạnh, một sự kết hợp độc đáo giữa Gin và Vodka.',
        desc: '<p><strong>Công thức:</strong> Gin, Vodka, Lillet Blanc (Biến thể của Vesper Martini).</p><p>"Shaken, not stirred" - Thức uống gắn liền với chàng điệp viên hào hoa 007.</p>',
        img: '../assets/James Bond.png'
    },
    {
        id: 'negroni',
        name: 'Negroni',
        type: 'Gin',
        taste: 'Đắng nồng, ngọt dịu, hương thảo mộc mạnh mẽ và đầy kích thích.',
        desc: '<p><strong>Công thức:</strong> Gin, Campari, Sweet Vermouth.</p><p>Sự cân bằng tuyệt mỹ của ba thành phần, biểu tượng cho phong cách sống của người Ý.</p>',
        img: '../assets/Negroni.png'
    },
    {
        id: 'ramos-gin-fizz',
        name: 'Ramos Gin Fizz',
        type: 'Gin',
        taste: 'Béo ngậy như kem, hương hoa cam dịu nhẹ, kết cấu bông mịn độc đáo.',
        desc: '<p><strong>Công thức:</strong> Gin, chanh, cam, siro, hoa cam, lòng trắng trứng, kem tươi, soda.</p><p>Một thử thách thực sự cho các Bartender với thời gian lắc (shake) cực lâu.</p>',
        img: '../assets/Ramos Gin Fizz.png'
    },
    {
        id: 'singapore-sling',
        name: 'Singapore Sling',
        type: 'Gin',
        taste: 'Hương vị trái cây nhiệt đới phong phú, ngọt ngào, phức hợp và sảng khoái.',
        desc: '<p><strong>Công thức:</strong> Gin, Cherry liqueur, Benedictine, dứa, chanh, lựu, Bitters.</p><p>Một huyền thoại ra đời tại khách sạn Raffles, Singapore vào đầu thế kỷ 20.</p>',
        img: '../assets/Singapore Sling.png'
    },
    {
        id: 'the-last-word',
        name: 'The Last Word',
        type: 'Gin',
        taste: 'Sắc sảo, hương thảo mộc đậm nét, vị chua thanh và ngọt nhẹ bí ẩn.',
        desc: '<p><strong>Công thức:</strong> Gin, Green Chartreuse, Maraschino liqueur, chanh.</p><p>Một viên ngọc quý từ thời kỳ Cấm rượu, mang màu xanh ngọc lục bảo quyến rũ.</p>',
        img: '../assets/The Last Word.png'
    },
    {
        id: 'vesper',
        name: 'Vesper',
        type: 'Gin',
        taste: 'Cực kỳ mạnh mẽ, khô và sâu lắng với chút hương vang trắng từ Lillet.',
        desc: '<p><strong>Công thức:</strong> Gin, Vodka, Lillet Blanc.</p><p>Được đặt tên theo nhân vật Vesper Lynd trong tiểu thuyết Casino Royale.</p>',
        img: '../assets/Vesper.png'
    },
    {
        id: 'white-lady',
        name: 'White Lady',
        type: 'Gin',
        taste: 'Sạch sẽ, thanh khiết, sự kết hợp tinh tế của Gin và cam (triple sec).',
        desc: '<p><strong>Công thức:</strong> Gin, Cointreau, chanh tươi.</p><p>Vẻ ngoài trắng muốt thanh tao như một quý bà kiêu sa.</p>',
        img: '../assets/White Lady.png'
    },

    // ================= VODKA =================
    {
        id: 'black-russian',
        name: 'Black Russian',
        type: 'Vodka',
        taste: 'Đậm đà vị cà phê, ngọt ngào và vô cùng êm mượt.',
        desc: '<p><strong>Công thức:</strong> Vodka, rượu mùi cà phê (Coffee Liqueur).</p><p>Sự đơn giản đỉnh cao mang lại cảm giác nồng ấm và tỉnh táo.</p>',
        img: '../assets/Black Russian.png'
    },
    {
        id: 'blue-monday',
        name: 'Blue Monday',
        type: 'Vodka',
        taste: 'Hương cam tươi mát, ngọt dịu với màu xanh đại dương bắt mắt.',
        desc: '<p><strong>Công thức:</strong> Vodka, Triple Sec, Blue Curaçao.</p><p>Xua tan sự ảm đạm của ngày thứ Hai bằng một ly cocktail rực rỡ.</p>',
        img: '../assets/Blue Monday.png'
    },
    {
        id: 'kamikaze',
        name: 'Kamikaze',
        type: 'Vodka',
        taste: 'Sắc lạnh, chua thanh, vị cam bùng nổ và dứt khoát.',
        desc: '<p><strong>Công thức:</strong> Vodka, Triple Sec, nước cốt chanh.</p><p>Mạnh mẽ và trực diện như chính tên gọi của nó.</p>',
        img: '../assets/Kamikaze.png'
    },
    {
        id: 'white-russian',
        name: 'White Russian',
        type: 'Vodka',
        taste: 'Béo ngậy như món tráng miệng, sự hòa quyện giữa cà phê và kem tươi.',
        desc: '<p><strong>Công thức:</strong> Vodka, Coffee Liqueur, kem tươi (hoặc sữa).</p><p>Thức uống yêu thích của nhân vật "The Dude" trong bộ phim The Big Lebowski.</p>',
        img: '../assets/White Russian.png'
    },

    // ================= TEQUILA =================
    {
        id: 'margarita',
        name: 'Margarita',
        type: 'Tequila',
        taste: 'Sảng khoái, chua thanh của chanh quyện cùng vị mặn của muối ở vành ly.',
        desc: '<p><strong>Công thức:</strong> Tequila, nước cốt chanh, Cointreau (hoặc Triple Sec).</p><p>Nữ hoàng của các bữa tiệc mùa hè, mang đậm hơi thở Mexico.</p>',
        img: '../assets/Margarita.png'
    },
    {
        id: 'tegroni',
        name: 'Tegroni',
        type: 'Tequila',
        taste: 'Đậm vị đất của Agave, đắng nồng thảo mộc, một bản phối đầy thú vị.',
        desc: '<p><strong>Công thức:</strong> Tequila, Campari, Sweet Vermouth.</p><p>Một biến thể đầy bản sắc của Negroni dành cho những tín đồ Tequila.</p>',
        img: '../assets/Tegroni.png'
    },

    // ================= RUM =================
    {
        id: 'daiquiri',
        name: 'Daiquiri',
        type: 'Rum',
        taste: 'Tươi mát, cân bằng tuyệt hảo giữa vị Rum nồng nàn và chanh chua thanh.',
        desc: '<p><strong>Công thức:</strong> White Rum, chanh tươi, đường.</p><p>Thức uống yêu thích của Hemingway, đại diện cho sự tinh khiết và tự do.</p>',
        img: '../assets/Daiquiri.png'
    },
    {
        id: 'maitai',
        name: 'Maitai',
        type: 'Rum',
        taste: 'Phức hợp hương vị trái cây, bùi ngậy của hạnh nhân và nồng nàn của Rum.',
        desc: '<p><strong>Công thức:</strong> Blend Rum, chanh, siro hạnh nhân (orgeat), Orange Curaçao.</p><p>Trong tiếng Tahiti, "Mai Tai" có nghĩa là "Tuyệt vời nhất", đúng như hương vị của nó.</p>',
        img: '../assets/Maitai.png'
    }
];

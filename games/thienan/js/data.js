/**
 * VƯỜN TRUYỆN - Cơ sở dữ liệu truyện
 * Chương Thiên An
 */

const STORIES = [
    {
        id: 1,
        title: "Bản Tình Ca Của Gió Và Cát",
        author: "Minh Quân",
        cover: "../images/featured.png",
        genres: ["Ngôn tình", "Phiêu lưu"],
        year: 2024,
        status: "Đang ra",
        rating: 4.8,
        ratingCount: 1340,
        views: 24500,
        chapters: 128,
        featured: true,
        summary: "Một sử thi hào hùng về tình yêu và lòng quả cảm giữa sa mạc mênh mông, nơi những bí ẩn cổ xưa bắt đầu thiết lập.",
        fullSummary: "Giữa lòng thành phố sầm uất, có một hồ nước bí ẩn chưa bao giờ gợn sóng. Truyền thuyết kể rằng, vào những đêm trăng khuyết, mặt hồ sẽ phản chiếu một thế giới song song – nơi những ký ức bị lãng quên tìm thấy đường trở về.\n\nMinh, một nhà văn trẻ đang đi tìm cảm hứng cho cuốn tiểu thuyết cuối cùng của mình, tình cờ phát hiện ra một bức thư cũ bị kẹp trong một cuốn sách cũ mua tại tiệm đồ cổ. Bức thư dẫn anh đến bên bờ hồ tĩnh lặng này, nơi anh gặp gỡ Linh – một cô gái dường như chỉ tồn tại trong những trang viết của anh.",
        chapterList: [
            { num: 1, title: "Bức thư trong hiệu sách cũ", date: "12/10" },
            { num: 2, title: "Tiếng vọng từ mặt hồ", date: "13/10" },
            { num: 3, title: "Những mảnh ghép ký ức", date: "14/10" }
        ],
        quote: "\"Một kiệt tác văn chương đương đại, gợi nhớ về Murakami nhưng đậm chất Việt.\"",
        quoteAuthor: "Văn Học Cuối Tuần"
    },
    {
        id: 2,
        title: "Bí Mật Dưới Đáy Đại Dương",
        author: "Lê Hoàng",
        cover: "../images/cover1.png",
        genres: ["Huyền huyễn", "Phiêu lưu"],
        year: 2024,
        status: "Đang ra",
        rating: 4.5,
        ratingCount: 890,
        views: 18200,
        chapters: 128,
        featured: false,
        summary: "Hành trình khám phá đại dương sâu thẳm, nơi những sinh vật cổ đại vẫn còn tồn tại và chờ đợi con người khám phá.",
        fullSummary: "Dưới đáy đại dương sâu thẳm, có một thành phố cổ đại đã bị lãng quên hàng nghìn năm. Khi một nhóm nhà khoa học trẻ tình cờ phát hiện ra tín hiệu bí ẩn từ vùng biển chưa được khám phá, họ quyết định lặn xuống để tìm hiểu. Những gì họ tìm thấy vượt xa mọi tưởng tượng...",
        chapterList: [
            { num: 1, title: "Tín hiệu từ đáy biển", date: "10/10" },
            { num: 2, title: "Thành phố dưới nước", date: "11/10" },
            { num: 3, title: "Bí mật của người canh giữ", date: "12/10" }
        ]
    },
    {
        id: 3,
        title: "Lối Nguyện Pha Lê",
        author: "Thái An",
        cover: "../images/cover2.png",
        genres: ["Lãng mạn", "Kỳ ảo"],
        year: 2023,
        status: "Hoàn thành",
        rating: 4.7,
        ratingCount: 2100,
        views: 35600,
        chapters: 45,
        featured: false,
        summary: "Câu chuyện tình yêu xuyên thời gian giữa một nhà văn hiện đại và linh hồn của một công chúa triều đại xưa.",
        fullSummary: "Một viên pha lê bí ẩn được tìm thấy trong ngôi đền cổ đã mở ra cánh cổng giữa hai thời đại. Lối Nguyện Pha Lê kể về hành trình của Hạ Vy, một cô gái thời hiện đại, vô tình bước vào thế giới cổ đại qua viên pha lê...",
        chapterList: [
            { num: 1, title: "Viên pha lê trong đền cổ", date: "05/08" },
            { num: 2, title: "Lạc vào thời gian", date: "06/08" },
            { num: 3, title: "Cuộc gặp gỡ định mệnh", date: "07/08" }
        ]
    },
    {
        id: 4,
        title: "Đỉnh Núi Tuyết Trắng",
        author: "Kim Phương",
        cover: "../images/cover3.png",
        genres: ["Tiên hiệp", "Võ hiệp"],
        year: 2024,
        status: "Đang ra",
        rating: 4.6,
        ratingCount: 1560,
        views: 28900,
        chapters: 342,
        featured: false,
        summary: "Tu tiên giả trên đỉnh núi tuyết, hành trình từ kẻ phàm nhân yếu đuối trở thành cường giả số một thiên hạ.",
        fullSummary: "Trên đỉnh núi tuyết trắng quanh năm, có một tông phái tu tiên huyền bí. Lâm Phong, một thiếu niên mồ côi, tình cờ được trưởng lão của tông phái phát hiện có linh căn đặc biệt...",
        chapterList: [
            { num: 1, title: "Thiếu niên trên đỉnh núi", date: "15/10" },
            { num: 2, title: "Linh căn thức tỉnh", date: "16/10" },
            { num: 3, title: "Tông phái tuyết sơn", date: "17/10" }
        ]
    },
    {
        id: 5,
        title: "Giai Điệu Của Mọc",
        author: "Đặng Trần",
        cover: "../images/cover4.png",
        genres: ["Tâm lý", "Hiện đại"],
        year: 2024,
        status: "Đang ra",
        rating: 4.4,
        ratingCount: 760,
        views: 12400,
        chapters: 12,
        featured: false,
        summary: "Một nghệ sĩ piano mất đi thính giác, nhưng tìm thấy âm nhạc theo cách chưa từng có trước đây.",
        fullSummary: "Minh Tâm, một nghệ sĩ piano thiên tài, đột ngột mất đi thính giác sau một tai nạn. Tưởng chừng như mọi thứ đã kết thúc, nhưng anh bắt đầu 'nghe' thấy âm nhạc qua cảm xúc và rung động...",
        chapterList: [
            { num: 1, title: "Nốt nhạc cuối cùng", date: "01/10" },
            { num: 2, title: "Thế giới không tiếng", date: "02/10" },
            { num: 3, title: "Giai điệu của im lặng", date: "03/10" }
        ]
    },
    {
        id: 6,
        title: "Thần Ma Hệ Thống",
        author: "Nguyễn Nhật",
        cover: "../images/cover5.png",
        genres: ["Hệ thống", "Dị giới"],
        year: 2024,
        status: "Đang ra",
        rating: 4.9,
        ratingCount: 3200,
        views: 56700,
        chapters: 456,
        featured: false,
        summary: "Xuyên không đến thế giới tu tiên với hệ thống toàn năng, nhưng mỗi nhiệm vụ đều có cái giá phải trả."
    },
    {
        id: 7,
        title: "Hương Vị Mùa Hè",
        author: "Bảo Ngọc",
        cover: "../images/cover6.png",
        genres: ["Ngôn tình", "Thanh xuân"],
        year: 2023,
        status: "Hoàn thành",
        rating: 4.7,
        ratingCount: 2800,
        views: 43200,
        chapters: 89,
        featured: false,
        summary: "Mùa hè năm ấy, hai đứa trẻ gặp nhau bên bờ biển và hẹn ước sẽ gặp lại. Mười năm sau, số phận đưa họ về cùng một thành phố."
    },
    {
        id: 8,
        title: "Vực Thẳm Ký Ức",
        author: "Hoàng Minh",
        cover: "../images/cover7.png",
        genres: ["Trinh thám", "Tâm lý"],
        year: 2024,
        status: "Đang ra",
        rating: 4.6,
        ratingCount: 1900,
        views: 31500,
        chapters: 67,
        featured: false,
        summary: "Một thám tử mất trí nhớ phải giải mã những vụ án mà chính anh ta là nghi phạm duy nhất."
    },
    {
        id: 9,
        title: "Lời Nguyện Của Gió",
        author: "Lê Hoàng",
        cover: "../images/cover1.png",
        genres: ["Huyền huyễn", "Lãng mạn"],
        year: 2023,
        status: "Hoàn thành",
        rating: 4.5,
        ratingCount: 1100,
        views: 19800,
        chapters: 95,
        featured: false,
        summary: "Gió mang theo lời nguyện ước từ ngàn năm trước, trao cho cô gái mù khả năng nhìn thấy tương lai."
    },
    {
        id: 10,
        title: "Phố Cũ Mù Sương",
        author: "Thái An",
        cover: "../images/cover6.png",
        genres: ["Đô thị", "Tâm lý"],
        year: 2024,
        status: "Đang ra",
        rating: 4.3,
        ratingCount: 650,
        views: 9800,
        chapters: 34,
        featured: false,
        summary: "Con phố cũ trong sương mù ẩn giấu bao câu chuyện về tình yêu, mất mát và sự tha thứ."
    },
    {
        id: 11,
        title: "Trang Sách Cuối Cùng",
        author: "Nguyễn Nhật",
        cover: "../images/cover7.png",
        genres: ["Tâm lý", "Hiện đại"],
        year: 2023,
        status: "Hoàn thành",
        rating: 4.8,
        ratingCount: 2500,
        views: 41000,
        chapters: 52,
        featured: false,
        summary: "Khi trang sách cuối cùng được lật, nhân vật chính nhận ra mình chính là tác giả của câu chuyện đời mình."
    },
    {
        id: 12,
        title: "Phía Sau Vũ Trụ",
        author: "Đặng Trần",
        cover: "../images/cover3.png",
        genres: ["Khoa học viễn tưởng", "Phiêu lưu"],
        year: 2024,
        status: "Đang ra",
        rating: 4.4,
        ratingCount: 890,
        views: 15600,
        chapters: 78,
        featured: false,
        summary: "Một phi hành gia phát hiện ra rằng vũ trụ chỉ là lớp vỏ bên ngoài của một thực tại vĩ đại hơn."
    },
    {
        id: 13,
        title: "La Bàn Thời Gian",
        author: "Kim Phương",
        cover: "../images/cover2.png",
        genres: ["Kỳ ảo", "Phiêu lưu"],
        year: 2024,
        status: "Đang ra",
        rating: 4.5,
        ratingCount: 1200,
        views: 22300,
        chapters: 103,
        featured: false,
        summary: "Chiếc la bàn cổ không chỉ dẫn lối đi, mà còn chỉ đường xuyên qua các dòng thời gian."
    }
];

const GENRES = [
    "Kiếm Hiệp", "Ngôn Tình", "Đô Thị", "Huyền Huyễn",
    "Kinh Dị", "Trinh Thám", "Tiên Hiệp", "Khoa Học Viễn Tưởng",
    "Tâm Lý", "Lãng Mạn", "Thanh Xuân", "Võ Hiệp"
];

// Thư viện cá nhân - truyện đang đọc
const MY_LIBRARY = [
    { storyId: 1, progress: 45, currentChapter: 22, totalChapters: 61, tab: "reading" },
    { storyId: 3, progress: 88, currentChapter: 14, totalChapters: 16, tab: "reading" },
    { storyId: 4, progress: 12, currentChapter: 3, totalChapters: 25, tab: "reading" },
    { storyId: 7, progress: 60, currentChapter: 120, totalChapters: 200, tab: "reading" },
    { storyId: 8, progress: 5, currentChapter: 1, totalChapters: 27, tab: "reading" },
    { storyId: 6, progress: 100, currentChapter: 52, totalChapters: 52, tab: "completed" },
    { storyId: 11, progress: 100, currentChapter: 52, totalChapters: 52, tab: "completed" },
    { storyId: 9, progress: 0, currentChapter: 0, totalChapters: 95, tab: "saved" },
    { storyId: 12, progress: 0, currentChapter: 0, totalChapters: 78, tab: "saved" }
];

// Nội dung chương để đọc (sample)
const CHAPTER_CONTENT = {
    1: {
        12: {
            title: "Những Dòng Sóng Quá Khứ",
            storyTitle: "Bản Tình Ca Của Gió Và Cát",
            genre: "Ngôn tình",
            prevChapter: { num: 11, title: "Sự Trở Về Của Người Lạ" },
            nextChapter: { num: 13, title: "Lời Hứa Trên Đỉnh Đồi" },
            content: [
                "Đêm hôm đó, gió rít qua những khe cửa của trang viên như tiếng thì thầm nức nở than khóc của một linh hồn bị bỏ rơi. Heathcliff đứng bên cửa sổ, đôi mắt cầu hồn nhìn xao xác đến đen đặc của vùng đồng hoang Yorkshire. Cái đứng gì đó trong khoảng không kia, một sự tĩnh lặng dang sợ trước khi cơn bão thực sự ập đến, không chỉ là biểu tượng của thiên nhiên, mà là bão số trùng người.",
                "\"Catherine,\" ông ta thì thầm, cái tên như một lời nguyện vu lên một bồi thì cầu nguyện. \"Trở về đi. Đừng để sóc đỉ trong ngải mú thấy niềm một giấy phận này nữa.\" Tiếng gió đáp lại bằng một tiếng hú kỳ lạ và rùng mình, lam rung chuyến cá những bóc tranh cổ, chân đứng bậm dậy bởi biện tiên tường.",
                "Một thể xung quanh thác đang tầi đi. Sự sang trọng một thời giai gia chỉ ẩn mẹng mỏng manh rời và một âm nhẹ anh gầm. Trong thư viện, những quyển sách gây da cũ bệnh nằm chồng chất, không ai buồn chạm đến. Chúng chân đứng tại lời, trong vương, không có gì đẹp còn mọt con người khai sự tận phí của lòng thì biến và nốt đau mất tâm.",
                "Tôi quan sát ông ta từ góc tối của hành lang. Người đàn ông này, từng là một đứa trẻ mồ côi không có gì ngoài ý chí minh biệt, giờ đây đã sở hữu tất cả, nhưng thực chất lại chẳng có gì. Tài sản, quyền lực, sự trả thù đã hoàn thành – tất cả chỉ là trò hạt trong lòng bàn tay khi hướng hình người phụ mà ông yêu đã tan biến vào cái hư vô."
            ],
            image: "../images/reading.png"
        }
    }
};

# 🍜 Bếp Thông Minh — Hệ Thống Gợi Ý Món Ăn Theo Ngân Sách & Nguyên Liệu

Hệ thống Fullstack Web hoàn chỉnh giúp người dùng trả lời câu hỏi *"Hôm nay ăn gì?"* dựa trên ngân sách thực tế và các nguyên liệu sẵn có trong tủ lạnh.

---

## 🌟 1. Quy Trình Vận Hành (Chuẩn Theo Yêu Cầu Thiết Kế)

```
NGƯỜI DÙNG
    ↓
Nhập ngân sách + Chọn số người + Chọn nguyên liệu tủ lạnh
    ↓
Hệ thống kiểm tra & đối soát dữ liệu (Database món ăn & giá thị trường)
    ↓
Lọc các món phù hợp ngân sách & thời gian
    ↓
Tính mức độ phù hợp (% Match & Tận dụng đồ có sẵn)
    ↓
Sắp xếp kết quả (Phù hợp nhất / Rẻ nhất / Nhanh nhất)
    ↓
Hiển thị danh sách món ăn trực quan (ảnh đẹp, giá dự kiến, % đã có)
    ↓
Người dùng chọn món → Bật Modal Chi Tiết:
    ├── Hiển thị công thức nấu ăn Step-by-Step (kèm mẹo của đầu bếp)
    ├── Bảng so sánh: Đã có sẵn (0đ) vs Cần mua thêm (kèm giá tiền từng món)
    └── Tính toán ngân sách: Dư hay vượt bao nhiêu tiền
    ↓
Gợi ý nơi mua nguyên liệu (Bách Hóa Xanh, Chợ dân sinh, WinMart, GrabMart...) & Mẹo đi chợ tiết kiệm
```

---

## 🚀 2. Kiến Trúc & Công Nghệ

- **Backend (Node.js & Express)**:
  - `server.js`: Web server cung cấp RESTful API và phục vụ giao diện tĩnh.
  - `backend/services/recommendationService.js`: Thuật toán đối soát nguyên liệu, tính điểm tương đồng (`matchScore`), quy đổi khẩu phần (`servingsMultiplier`), và bộ tạo mâm cơm combo.
  - `backend/routes/api.js`: Bộ API đầy đủ:
    - `POST /api/suggest`: Lọc món theo ngân sách, số người, nguyên liệu, thời gian nấu, thể loại.
    - `POST /api/combo`: Ghép mâm cơm hoàn chỉnh 2-3 món (Món mặn + Canh + Rau xào) tối ưu hóa nguyên liệu dùng chung.
    - `GET /api/dishes`: Danh sách và tìm kiếm món ăn.
    - `GET /api/dishes/:id`: Chi tiết món ăn và các bước nấu.
    - `POST /api/dishes`: Cho phép người dùng tự thêm công thức của mình.
    - `GET /api/ingredients`: Danh mục 34+ nguyên liệu phổ biến và đơn giá bán lẻ thị trường.
    - `GET /api/stores`: Danh sách nơi mua và phân tích ưu nhược điểm.
    - `GET /api/stats`: Thống kê tổng quan cơ sở dữ liệu.

- **Frontend (HTML5 / Vanilla CSS3 / JavaScript ES6+)**:
  - Giao diện **Glassmorphism hiện đại**, hỗ trợ **Dark Mode** & **Light Mode**.
  - Thanh trượt ngân sách trực quan (15k - 300k) kèm phím chọn nhanh (30k, 50k, 80k, 120k, 200k).
  - Khẩu phần ăn linh hoạt (1, 2, 4, 6 người) — tự động nhân tỉ lệ giá và định lượng nguyên liệu.
  - Hộp nhập thẻ nguyên liệu (Tag Input) kèm danh sách nguyên liệu gợi ý bấm nhanh 1 chạm.
  - Modal chi tiết từng bước nấu ăn, phân loại đồ cần mua và nút **"Sao chép danh sách đi chợ"** vào clipboard.
  - Tab **Mâm cơm gia đình** và Tab **Nơi mua & Mẹo chợ**.

---

## 🛠️ 3. Cách Khởi Chạy Dự Án

### Yêu cầu:
- Đã cài đặt [Node.js](https://nodejs.org/) (phiên bản v18 trở lên).

### Các bước chạy:
```bash
# 1. Cài đặt thư viện phụ thuộc (nếu chưa cài)
npm install

# 2. Khởi động ứng dụng
npm start
```

Mở trình duyệt web và truy cập:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📁 4. Cấu Trúc Thư Mục

```
linhnhi/
├── package.json                    # Cấu hình dự án & dependencies
├── server.js                       # Điểm khởi chạy Express server
├── README.md                       # Hướng dẫn sử dụng chi tiết
├── backend/
│   ├── routes/
│   │   └── api.js                  # Định tuyến các RESTful API endpoints
│   ├── services/
│   │   └── recommendationService.js# Thuật toán gợi ý, tính tiền & mâm cơm
│   └── data/
│       ├── dishes.json             # CSDL món ăn Việt Nam (công thức, giá, calo, độ khó)
│       ├── ingredients.json        # Bảng giá nguyên liệu chuẩn thị trường
│       └── stores.json             # Dữ liệu siêu thị, chợ dân sinh & mẹo tiết kiệm
└── public/
    ├── index.html                  # Giao diện chính Responsive & Semantic HTML
    ├── css/
    │   └── style.css               # Design system Glassmorphism, Dark/Light Mode
    ├── js/
    │   ├── api.js                  # Module giao tiếp API
    │   └── app.js                  # Xử lý tương tác, bộ lọc, modal & state
    └── assets/                     # Thư mục hình ảnh & tài nguyên bổ trợ
```

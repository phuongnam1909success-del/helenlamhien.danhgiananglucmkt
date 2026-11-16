# READY TO WORK? — Đánh Giá Năng Lực Digital Marketing

Ứng dụng web đánh giá năng lực thực hành Digital Marketing (React + TypeScript + Vite + Tailwind CSS + Chart.js) kết nối Backend Google Apps Script tự động tạo Google Sheet.

## 1. Triển khai Backend Google Apps Script (Tự động tạo Google Sheet)
1. Truy cập [script.google.com](https://script.google.com/) → **New project**.
2. Dán toàn bộ nội dung file `gas-backend/Code.gs` vào trình soạn thảo và lưu lại.
3. Nhấn **Deploy → New deployment → Web app**:
   - **Execute as:** `Me`
   - **Who has access:** `Anyone`
4. Cấp quyền truy cập Google Sheets khi được hỏi, sau đó copy **Web app URL** (`https://script.google.com/macros/s/.../exec`).
5. Mở URL đó trên trình duyệt 1 lần (GET) để script tự động tạo file Google Sheet `READY_TO_WORK_Ket_Qua_Danh_Gia` trong Google Drive của bạn.

## 2. Đẩy Frontend lên GitHub
```bash
# Tại thư mục gốc của project này
cp .env.example .env
# (Mở .env và dán URL Web App GAS của bạn vào VITE_GAS_WEBAPP_URL)

git init
git add .
git commit -m "feat: initial Ready To Work marketer assessment app"
git branch -M main
git remote add origin https://github.com/phuongnam1909success-del/danhgiananglucmkt.git
git push -u origin main
```

## 3. Triển khai lên Cloudflare Pages
1. Vào **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.
2. Chọn repository `danhgiananglucmkt`.
3. Cấu hình Build:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Thêm **Environment variable**: `VITE_GAS_WEBAPP_URL` = URL Web App Google Apps Script của bạn.
5. Nhấn **Save and Deploy**.

## 4. Font chữ gốc (Tuỳ chọn)
Nếu bạn có file font `.woff2` hoặc `.ttf` của **Helios** và **SVN-Androgyne Regular**, hãy đặt vào thư mục `public/fonts/` với tên:
- `public/fonts/Helios.woff2` (hoặc `Helios.ttf`)
- `public/fonts/SVN-Androgyne-Regular.woff2` (hoặc `SVN-Androgyne-Regular.ttf`)

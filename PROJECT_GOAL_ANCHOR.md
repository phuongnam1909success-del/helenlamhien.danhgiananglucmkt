# PROJECT GOAL ANCHOR: Ready To Work Marketing Assessment - Deployment & GitHub Sync

## North Star Goal
Tự động triển khai Backend Google Apps Script bằng `clasp` CLI, kích hoạt tạo Google Sheet kết quả, tích hợp Web App URL vào Frontend React/Vite, build kiểm tra và push toàn bộ mã nguồn lên GitHub repository `https://github.com/phuongnam1909success-del/danhgiananglucmkt.git` (nhánh `main`).

## In-Scope vs. Out-of-Scope
- **In-Scope**:
  - Cài đặt & xác thực `clasp`.
  - Triển khai Google Apps Script trong `gas-backend/`, cấu hình `appsscript.json`, push và deploy Web App public.
  - Kích hoạt `doGet()` tạo Google Sheet `READY_TO_WORK_Ket_Qua_Danh_Gia` và lấy link Spreadsheet.
  - Cập nhật `.env` và bảo đảm `.gitignore` bảo vệ thông tin nhạy cảm/build artifact.
  - Build và typecheck Frontend (`npm install && npm run build`).
  - Cài đặt Git & GitHub CLI, khởi tạo repo, commit và push lên GitHub `origin main`.
- **Out-of-Scope**:
  - Không deploy Cloudflare Pages (người dùng tự kết nối trực tiếp với GitHub repo).
  - Không chỉnh sửa các câu hỏi hay logic nghiệp vụ của bài đánh giá marketing.

## Non-Negotiables
- URL Web App Apps Script phải được lấy chính xác từ API/deployment của clasp.
- `.gitignore` phải bỏ qua `node_modules/`, `dist/`, `.env`, và `.clasp.json`.
- Zero-error frontend build trước khi git push.
- Báo cáo rõ ràng: Trạng thái Git Push, Web App URL, Link Google Sheet.

## Task Checklist
- [x] 1.1 Kiểm tra và cài đặt global `@google/clasp` (v3.4.1 installed)
- [x] 1.2 Kiểm tra trạng thái đăng nhập clasp (User `phuongnam1909.success@gmail.com` đã đăng nhập)
- [x] 1.3 Tạo standalone script `READY_TO_WORK_Backend` (Script ID: `1hhCGyexeJJNW-6uDRjNVlPnlMgx8erLEo1TmPXsCbooSPGbe7MRhhBXJ`), cấu hình `appsscript.json` (USER_DEPLOYING, ANYONE_ANONYMOUS), push và deploy Web App (Deployment ID: `AKfycbzIwA3atRH-rR3unTR1zJUmW7jhBvj6PPss5TnyEbOY52M9twhl-5UKKdUdZD_uzGQjqQ`)
- [x] 1.4 Lấy Web App URL chính xác: `https://script.google.com/macros/s/AKfycbzIwA3atRH-rR3unTR1zJUmW7jhBvj6PPss5TnyEbOY52M9twhl-5UKKdUdZD_uzGQjqQ/exec`
- [x] 1.5 Gọi curl kích hoạt tạo Google Sheet và ghi nhận URL Spreadsheet: `https://docs.google.com/spreadsheets/d/1Sf2lVZTVdCQaNGKRfJDOqpPwVJSgIBDsn8aeNRQsvvQ/edit`
- [x] 2.1 Cập nhật `.env` với `VITE_GAS_WEBAPP_URL`
- [x] 2.2 Cấu hình `.gitignore` đầy đủ (bỏ qua node_modules, dist, .env, .clasp.json)
- [x] 2.3 Thêm `src/vite-env.d.ts`, cài đặt dependency & build frontend thành công 0 lỗi (`npm run build` -> built in 1.71s)
- [x] 3.1 Cài đặt MinGit portable & GitHub CLI, cấu hình Git CLI và thiết lập remote origin `main`
- [BLOCKED: Chờ nhập Device Code trên GitHub] 3.2 Hoàn tất `gh auth login` và chạy `git push -u origin main`

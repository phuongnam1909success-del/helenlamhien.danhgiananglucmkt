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
  - Cài đặt Git (nếu chưa có), khởi tạo repo, commit và push lên GitHub `origin main`.
- **Out-of-Scope**:
  - Không deploy Cloudflare Pages (người dùng tự kết nối trực tiếp với GitHub repo).
  - Không chỉnh sửa các câu hỏi hay logic nghiệp vụ của bài đánh giá marketing.

## Non-Negotiables
- URL Web App Apps Script phải được lấy chính xác từ API/deployment của clasp.
- `.gitignore` phải bỏ qua `node_modules/`, `dist/`, `.env`, và `.clasp.json`.
- Zero-error frontend build trước khi git push.
- Báo cáo rõ ràng: Trạng thái Git Push, Web App URL, Link Google Sheet.

## Task Checklist
- [ ] 1.1 Kiểm tra và cài đặt global `@google/clasp`
- [ ] 1.2 Kiểm tra trạng thái đăng nhập clasp (`show-authorized-user` / token)
- [ ] 1.3 Tạo standalone script `READY_TO_WORK_Backend` trong `gas-backend/`, cấu hình `appsscript.json`, push và deploy Web App
- [ ] 1.4 Lấy Web App URL
- [ ] 1.5 Test curl kích hoạt tạo Google Sheet và ghi nhận URL Spreadsheet
- [ ] 2.1 Cập nhật `.env` với `VITE_GAS_WEBAPP_URL`
- [ ] 2.2 Cấu hình `.gitignore` đầy đủ
- [ ] 2.3 Cài đặt dependency & build frontend (`npm install && npm run build`)
- [ ] 3.1 Cài đặt / cấu hình Git CLI và thiết lập remote origin
- [ ] 3.2 Commit và `git push -u origin main`

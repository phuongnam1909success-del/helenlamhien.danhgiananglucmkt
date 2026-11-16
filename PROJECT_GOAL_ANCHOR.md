# PROJECT GOAL ANCHOR: Ready To Work Marketing Assessment - Deployment & GitHub Sync

## North Star Goal
Tự động triển khai Backend Google Apps Script bằng `clasp` CLI, kích hoạt tạo Google Sheet kết quả, tích hợp Web App URL vào Frontend React/Vite, cập nhật ma trận năng lực The Talent Framework & 25 task thực hành, đổi font tiêu đề Anton và font nội dung Roboto, build kiểm tra và push toàn bộ mã nguồn lên GitHub repository `https://github.com/phuongnam1909success-del/danhgiananglucmkt.git` (nhánh `main`).

## In-Scope vs. Out-of-Scope
- **In-Scope**:
  - Cài đặt & xác thực `clasp`.
  - Triển khai Google Apps Script trong `gas-backend/`, cấu hình `appsscript.json`, push và deploy Web App public.
  - Kích hoạt `doGet()` tạo Google Sheet `READY_TO_WORK_Ket_Qua_Danh_Gia` và lấy link Spreadsheet.
  - Cập nhật `.env` và bảo đảm `.gitignore` bảo vệ thông tin nhạy cảm/build artifact.
  - Tinh chỉnh Typography: Font tiêu đề `Anton`, font nội dung `Roboto`.
  - Bổ sung định vị ma trận năng lực ứng với The Talent Framework ở Hero page và Results page.
  - Bổ sung 25 task thực hành chi tiết (Task, 24h, CLB/nhóm, Đầu ra, Tiêu chí kiểm chứng) và tính năng sao chép.
  - Cập nhật Radar Chart hiển thị đồng thời trải nghiệm tự chọn và 2 mốc tham chiếu minh họa (3/5 và 4/5).
  - Build và typecheck Frontend (`npm run build`).
  - Cài đặt Git & GitHub CLI, khởi tạo repo, commit và push lên GitHub `origin main`.
- **Out-of-Scope**:
  - Không deploy Cloudflare Pages (người dùng tự kết nối trực tiếp với GitHub repo).

## Non-Negotiables
- URL Web App Apps Script phải được lấy chính xác từ API/deployment của clasp.
- `.gitignore` phải bỏ qua `node_modules/`, `dist/`, `.env`, và `.clasp.json`.
- Zero-error frontend build trước khi git push.
- Báo cáo rõ ràng: Trạng thái Git Push, Web App URL, Link Google Sheet.

## Task Checklist
- [x] 1.1 Kiểm tra và cài đặt global `@google/clasp` (v3.4.1 installed)
- [x] 1.2 Kiểm tra trạng thái đăng nhập clasp (User `phuongnam1909.success@gmail.com` đã đăng nhập)
- [x] 1.3 Tạo standalone script `READY_TO_WORK_Backend` (Script ID: `1hhCGyexeJJNW-6uDRjNVlPnlMgx8erLEo1TmPXsCbooSPGbe7MRhhBXJ`), cấu hình `appsscript.json`, push và deploy Web App (Deployment ID: `AKfycbzIwA3atRH-rR3unTR1zJUmW7jhBvj6PPss5TnyEbOY52M9twhl-5UKKdUdZD_uzGQjqQ`)
- [x] 1.4 Lấy Web App URL chính xác: `https://script.google.com/macros/s/AKfycbzIwA3atRH-rR3unTR1zJUmW7jhBvj6PPss5TnyEbOY52M9twhl-5UKKdUdZD_uzGQjqQ/exec`
- [x] 1.5 Gọi curl kích hoạt tạo Google Sheet và ghi nhận URL Spreadsheet: `https://docs.google.com/spreadsheets/d/1Sf2lVZTVdCQaNGKRfJDOqpPwVJSgIBDsn8aeNRQsvvQ/edit`
- [x] 2.1 Cập nhật `.env` với `VITE_GAS_WEBAPP_URL`
- [x] 2.2 Cấu hình `.gitignore` đầy đủ (bỏ qua node_modules, dist, .env, .clasp.json)
- [x] 2.3 Thêm `src/vite-env.d.ts`, cài đặt dependency & build frontend thành công 0 lỗi
- [x] 2.4 Cập nhật font tiêu đề Anton & font nội dung Roboto, bổ sung The Talent Framework matrix disclaimer và 25 task thực hành chi tiết
- [x] 2.5 Kiểm tra trên localhost:5173 và người dùng duyệt
- [x] 3.1 Cài đặt MinGit portable & GitHub CLI, cấu hình Git CLI và thiết lập remote origin `main`
- [x] 3.2 Commit và `git push origin main`

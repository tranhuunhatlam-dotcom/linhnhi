@echo off
chcp 65001 >nul
title Bếp Thông Minh - Server & Web App
color 0A

echo ========================================================
echo   🍜 HỆ THỐNG GỢI Ý MÓN ĂN THEO NGÂN SÁCH & NGUYÊN LIỆU
echo ========================================================
echo.
echo [1/3] Đang kiểm tra môi trường Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LỖI] Chưa tìm thấy Node.js trên máy tính!
    echo Vui lòng cài đặt Node.js từ https://nodejs.org/ rồi thử lại.
    pause
    exit /b
)

echo [2/3] Đang kiểm tra thư viện...
if not exist "node_modules" (
    echo Đang cài đặt thư viện cần thiết...
    call npm install
)

echo [3/3] Đang khởi động Backend Server trên cổng 3000...
start "" "http://localhost:3000"

echo.
echo ========================================================
echo   🚀 SERVER ĐANG CHẠY TẠI: http://localhost:3000
echo   🌐 Trình duyệt web đã được mở tự động!
echo   ⚠️ Không tắt cửa sổ này khi đang dùng ứng dụng.
echo ========================================================
echo.

node server.js
pause

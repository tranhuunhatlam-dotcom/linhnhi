const express = require('express');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./backend/routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all fallback to serve index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🍜 HỆ THỐNG GỢI Ý MÓN ĂN THEO NGÂN SÁCH & NGUYÊN LIỆU`);
  console.log(`🚀 Server đang chạy tại: http://localhost:${PORT}`);
  console.log(`===================================================`);
});

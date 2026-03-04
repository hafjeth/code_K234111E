const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// =============================================
// CẤU HÌNH MOMO SANDBOX (Test - không cần đăng ký)
// =============================================
const momoConfig = {
    partnerCode: 'MOMO',
    accessKey: 'F8BBA842ECF85',
    secretKey: 'K951B6PE1waDMi640xX08PD3vg6EkVlz',
    endpoint: 'https://test-payment.momo.vn/v2/gateway/api/create',
    redirectUrl: 'http://localhost:4200/payment-result',  // Angular app
    ipnUrl: 'https://webhook.site/your-unique-id',        // Thay bằng URL từ webhook.site
};

// =============================================
// API 1: TẠO ĐƠN THANH TOÁN
// POST http://localhost:3000/api/payment/create
// Body: { amount: 50000, orderInfo: "Mua hang" }
// =============================================
app.post('/api/payment/create', async (req, res) => {
    try {
        const { amount, orderInfo } = req.body;

        // Tạo mã đơn hàng duy nhất theo thời gian
        const orderId = momoConfig.partnerCode + Date.now();
        const requestId = orderId;
        const requestType = 'payWithMethod';
        const extraData = '';

        // ==== TẠO CHỮ KÝ HMAC-SHA256 ====
        // Thứ tự các field PHẢI đúng alphabet
        const rawSignature =
            `accessKey=${momoConfig.accessKey}` +
            `&amount=${amount}` +
            `&extraData=${extraData}` +
            `&ipnUrl=${momoConfig.ipnUrl}` +
            `&orderId=${orderId}` +
            `&orderInfo=${orderInfo}` +
            `&partnerCode=${momoConfig.partnerCode}` +
            `&redirectUrl=${momoConfig.redirectUrl}` +
            `&requestId=${requestId}` +
            `&requestType=${requestType}`;

        const signature = crypto
            .createHmac('sha256', momoConfig.secretKey)
            .update(rawSignature)
            .digest('hex');

        // ==== GỬI REQUEST LÊN MOMO SERVER ====
        const requestBody = {
            partnerCode: momoConfig.partnerCode,
            accessKey: momoConfig.accessKey,
            requestId,
            amount: String(amount),
            orderId,
            orderInfo,
            redirectUrl: momoConfig.redirectUrl,
            ipnUrl: momoConfig.ipnUrl,
            extraData,
            requestType,
            signature,
            lang: 'vi',
        };

        console.log('Gửi request đến MoMo:', requestBody);

        const momoResponse = await axios.post(momoConfig.endpoint, requestBody, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('MoMo trả về:', momoResponse.data);
        res.json(momoResponse.data);

    } catch (error) {
        console.error('Lỗi:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// =============================================
// API 2: NHẬN CALLBACK TỪ MOMO (IPN)
// MoMo tự động gọi khi thanh toán xong
// =============================================
app.post('/api/payment/callback', (req, res) => {
    console.log('======= MOMO CALLBACK =======');
    console.log(req.body);

    const { resultCode, orderId, amount, orderInfo } = req.body;

    if (resultCode === 0) {
        console.log(`✅ Thanh toán thành công!`);
        console.log(`   OrderId: ${orderId}`);
        console.log(`   Số tiền: ${amount} VNĐ`);
        console.log(`   Nội dung: ${orderInfo}`);
        // TODO: Cập nhật trạng thái đơn hàng trong DB
    } else {
        console.log(`❌ Thanh toán thất bại. resultCode: ${resultCode}`);
    }

    // PHẢI trả 204 về MoMo
    res.status(204).send();
});

// =============================================
// API 3: KIỂM TRA TRẠNG THÁI ĐƠN HÀNG
// POST http://localhost:3000/api/payment/check
// =============================================
app.post('/api/payment/check', async (req, res) => {
    try {
        const { orderId } = req.body;
        const requestId = momoConfig.partnerCode + Date.now();

        const rawSignature =
            `accessKey=${momoConfig.accessKey}` +
            `&orderId=${orderId}` +
            `&partnerCode=${momoConfig.partnerCode}` +
            `&requestId=${requestId}`;

        const signature = crypto
            .createHmac('sha256', momoConfig.secretKey)
            .update(rawSignature)
            .digest('hex');

        const result = await axios.post(
            'https://test-payment.momo.vn/v2/gateway/api/query',
            {
                partnerCode: momoConfig.partnerCode,
                accessKey: momoConfig.accessKey,
                requestId,
                orderId,
                signature,
                lang: 'vi',
            }
        );

        res.json(result.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// =============================================
// START SERVER
// =============================================
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`
====================================
  MoMo Payment Server đang chạy!
  http://localhost:${PORT}
====================================
  API endpoints:
  POST /api/payment/create   ← Tạo đơn
  POST /api/payment/callback ← MoMo callback
  POST /api/payment/check    ← Kiểm tra đơn
====================================
    `);
});
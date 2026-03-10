const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// KẾT NỐI VỚI DATABASE MỚI: [EX58]FashionData
// Lưu ý: MongoDB hỗ trợ ký tự đặc biệt trong tên DB, nhưng hãy đảm bảo chuỗi kết nối chuẩn
mongoose.connect('mongodb://localhost:27017/%5BEX58%5DFashionData') 
    .then(() => console.log("Đã kết nối thành công database: [EX58]FashionData"))
    .catch(err => console.error("Lỗi kết nối:", err));

// %5B là [ và %5D là ] để đảm bảo URL không bị lỗi

const fashionSchema = new mongoose.Schema({
    title: String,
    details: String,
    thumbnail: String,
    style: String,
    created_at: { type: Date, default: Date.now }
});

const Fashion = mongoose.model('Fashion', fashionSchema, 'Fashion');

// --- GIỮ NGUYÊN CÁC API NHƯ CŨ ---
app.get('/fashions', async (req, res) => {
    const data = await Fashion.find().sort({ created_at: -1 });
    res.json(data);
});

app.get('/fashions/style/:styleName', async (req, res) => {
    const data = await Fashion.find({ style: req.params.styleName });
    res.json(data);
});

app.get('/fashions/:id', async (req, res) => {
    const data = await Fashion.findById(req.params.id);
    res.json(data);
});

app.post('/fashions', async (req, res) => {
    const newFashion = new Fashion(req.body);
    await newFashion.save();
    res.json({ message: "Thêm thành công!", id: newFashion._id });
});

app.put('/fashions/:id', async (req, res) => {
    await Fashion.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Cập nhật thành công!" });
});

app.delete('/fashions/:id', async (req, res) => {
    await Fashion.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa thành công!" });
});

app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
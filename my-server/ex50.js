const express = require('express');
const fileUpload = require('express-fileupload');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const fs = require('fs'); 

const app = express();
const port = 3001; 

const DATA_FILE = path.join(__dirname, 'data.json');

app.use(morgan("combined"));
app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(fileUpload({
    createParentPath: true, 
    limits: { fileSize: 10 * 1024 * 1024 }, 
}));

app.use('/upload', express.static(path.join(__dirname, 'upload')));

function loadBooks() {
    try {
        if (fs.existsSync(DATA_FILE)) {
            const data = fs.readFileSync(DATA_FILE, 'utf8');
            return JSON.parse(data);
        }
        return [];
    } catch (err) {
        console.error("Lỗi đọc file:", err);
        return [];
    }
}

function saveBooks(books) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(books, null, 2), 'utf8');
    } catch (err) {
        console.error("Lỗi ghi file:", err);
    }
}

let books = loadBooks();

// --- API ---

app.get('/books', (req, res) => {
    books = loadBooks(); 
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    books = loadBooks();
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({message: "Không tìm thấy sách"});
    }
});

app.post('/books', (req, res) => {
    try {
        let newBook = {};
        if (req.body.book) {
            newBook = JSON.parse(req.body.book);
        } else {
            newBook = req.body; 
        }

        const maxId = books.length > 0 ? Math.max(...books.map(b => b.id)) : 0;
        newBook.id = maxId + 1;

        if (req.files && req.files.Anhbia) {
            let image = req.files.Anhbia;
            const uploadPath = path.join(__dirname, 'upload', image.name);
            image.mv(uploadPath, (err) => {
                if (err) console.log("Lỗi upload:", err);
            });
            newBook.Anhbia = image.name;
        } else {
            newBook.Anhbia = 'default.jpg'; 
        }

        newBook.Giaban = Number(newBook.Giaban);
        newBook.Soluongton = Number(newBook.Soluongton);
        newBook.MaCD = Number(newBook.MaCD);
        newBook.MaNXB = Number(newBook.MaNXB);

        books.push(newBook);
        saveBooks(books); 
        
        console.log("Đã thêm sách mới:", newBook.Tensach);
        res.json(newBook);
    } catch (err) {
        console.log("Lỗi Server:", err);
        res.status(500).send("Lỗi Server: " + err.message);
    }
});

app.put('/books/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = books.findIndex(b => b.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Không tìm thấy sách" });
        }

        let updatedData = {};
        if (req.body.book) {
            updatedData = JSON.parse(req.body.book);
        } else {
            updatedData = req.body;
        }

        if (req.files && req.files.Anhbia) {
            let image = req.files.Anhbia;
            const uploadPath = path.join(__dirname, 'upload', image.name);
            image.mv(uploadPath, (err) => {
                if (err) return res.status(500).send(err);
            });
            updatedData.Anhbia = image.name;
        } else {
            updatedData.Anhbia = books[index].Anhbia;
        }

        books[index] = { ...books[index], ...updatedData };
        
        books[index].Giaban = Number(books[index].Giaban);
        books[index].Soluongton = Number(books[index].Soluongton);
        books[index].MaCD = Number(books[index].MaCD);
        books[index].MaNXB = Number(books[index].MaNXB);

        saveBooks(books); 
        console.log("Đã cập nhật sách ID:", id);
        res.json(books[index]);
    } catch (err) {
        console.log(err);
        res.status(500).send("Lỗi Server");
    }
});

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    
    if (index !== -1) {
        books.splice(index, 1);
        saveBooks(books); 
        res.json({ message: "Đã xóa thành công" });
    } else {
        res.status(404).json({ message: "Không tìm thấy sách để xóa" });
    }
});

app.listen(port, () => {
    console.log(`Server đang chạy tại: http://localhost:${port}`);
});
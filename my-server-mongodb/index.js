const express = require('express');
const app = express();
const port = 3002;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));

app.listen(port, () => {
    console.log(`My Server listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB");
});

const { MongoClient, ObjectId } = require('mongodb');
const client = new MongoClient("mongodb://127.0.0.1:27017");
client.connect();
const database = client.db("FashionData");
const fashionCollection = database.collection("Fashion");
const usersCollection = database.collection("User");
const productCollection = database.collection("Product");

app.get("/fashions", async (req, res) => {
    const result = await fashionCollection.find({}).toArray();
    res.send(result);
});

app.get("/fashions/:id", async (req, res) => {
    var o_id = new ObjectId(req.params["id"]);
    const result = await fashionCollection.find({ _id: o_id }).toArray();
    res.send(result[0]);
});

app.post("/register", async (req, res) => {
    const user = req.body;
    const existingUser = await usersCollection.findOne({ username: user.username });
    if (existingUser) {
        return res.send({ message: "User already exists", status: "fail" });
    }
    await usersCollection.insertOne(user);
    res.send({ message: "Register success", status: "ok" });
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await usersCollection.findOne({ username: username, password: password });
    if (user) {
        res.send({ message: "Login success", status: "ok", user: user });
    } else {
        res.send({ message: "Invalid username or password", status: "fail" });
    }
});

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get("/create-cookie", (req, res) => {
    res.cookie("username", "truongnguyetha")
    res.cookie("password", "123456")
    account = {
        "username": "truongnguyetha",
        "password": "123456"
    }
    res.cookie("account", account)
    res.send("cookies are created")
})

app.get("/read-cookie", (req, res) => {
    username = req.cookies.username
    password = req.cookies.password
    account = req.cookies.account
    infor = "username = " + username + "<br/>"
    infor += "password = " + password + "<br/>"
    if (account != null) {
        infor += "account.username = " + account.username + "<br/>"
        infor += "account.password = " + account.password + "<br/>"
    }
    res.send(infor)
})

app.get("/clear-cookie", (req, res) => {
    res.clearCookie("account")
    res.send("[account] Cookie is removed")
})

var session = require('express-session');
app.use(session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.get("/contact", (req, res) => {
    if (req.session.visited != null) {
        req.session.visited++
        res.send("You visited this page " + req.session.visited + " times")
    } else {
        req.session.visited = 1
        res.send("Welcome to this page for the first time!")
    }
})

app.get("/products", async (req, res) => {
    const products = await productCollection.find({}).toArray();
    res.send(products);
});

app.get("/cart", (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    res.send(req.session.cart);
});

app.post("/cart", (req, res) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    
    const product = req.body;
    const existingProduct = req.session.cart.find(p => p._id === product._id);
    
    if (existingProduct) {
        existingProduct.qty += 1;
    } else {
        product.qty = 1;
        req.session.cart.push(product);
    }
    
    res.send({ message: "Added to cart", cart: req.session.cart });
});

app.put("/cart", (req, res) => {
    req.session.cart = req.body;
    res.send({ message: "Cart updated", cart: req.session.cart });
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/MickeyStore');

const Category = mongoose.model('Category', new mongoose.Schema({
  _id: String, name: String, description: String
}), 'Category');

const Product = mongoose.model('Product', new mongoose.Schema({
  name: String, price: Number, model: String, made_by: String, categoryId: String, image: String
}), 'Product');

const Employee = mongoose.model('Employee', new mongoose.Schema({
  fullName: String, email: String, password: String, role: String
}), 'Employee');

const Customer = mongoose.model('Customer', new mongoose.Schema({
  _id: String, fullName: String, email: String, password: String, address: String
}), 'Customer');

const Order = mongoose.model('Order', new mongoose.Schema({
  _id: String, customerId: String, orderDate: String, totalAmount: Number, status: String
}), 'Order');

const OrderDetails = mongoose.model('OrderDetails', new mongoose.Schema({
  orderId: String, productId: String, quantity: Number, unitPrice: Number
}), 'OrderDetails');

app.get('/categories', async (req, res) => res.json(await Category.find()));
app.post('/categories', async (req, res) => res.json(await new Category(req.body).save()));

app.get('/products', async (req, res) => res.json(await Product.find()));
app.post('/products', async (req, res) => res.json(await new Product(req.body).save()));
app.put('/products/:id', async (req, res) => res.json(await Product.findByIdAndUpdate(req.params.id, req.body, {new: true})));
app.delete('/products/:id', async (req, res) => res.json(await Product.findByIdAndDelete(req.params.id)));

app.get('/orders', async (req, res) => res.json(await Order.find()));
app.post('/orders', async (req, res) => res.json(await new Order(req.body).save()));
app.put('/orders/:id', async (req, res) => res.json(await Order.findByIdAndUpdate(req.params.id, req.body, {new: true})));
app.delete('/orders/:id', async (req, res) => res.json(await Order.findByIdAndDelete(req.params.id)));

app.get('/orderdetails', async (req, res) => res.json(await OrderDetails.find()));
app.post('/orderdetails', async (req, res) => res.json(await OrderDetails.insertMany(req.body)));

app.get('/employees', async (req, res) => res.json(await Employee.find()));
app.get('/customers', async (req, res) => res.json(await Customer.find()));

app.listen(3000);
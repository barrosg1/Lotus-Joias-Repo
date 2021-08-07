const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/client', require('./routes/api/client'));
app.use('/api/client/transaction', require('./routes/api/transactions'));
app.use('/api/category', require('./routes/api/category'));
app.use('/api/wholesaler', require('./routes/api/wholesaler'));
app.use('/api/upload', require('./routes/api/upload'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


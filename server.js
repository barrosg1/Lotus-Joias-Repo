const express = require('express');
const connectDB = require('./config/db');
const path = require('path')


const app = express();

// 
app.use('/static', express.static(path.join(__dirname, 'public')))


// connect database
connectDB();

// init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API is working!'));

// define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/product', require('./routes/api/product'));
app.use('/api/client', require('./routes/api/client'));
app.use('/api/client/transaction', require('./routes/api/transactions'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const mealsRoutes = require('./routes/MealsRoutes');
const ordersRoutes = require('./routes/OrdersRoutes')

// Api config
const app = express();
app.use(bodyParser.json());
app.use(cors());
mongoose.connect('mongodb://localhost:27017/meals', { useNewUrlParser: true, useUnifiedTopology: true });


// Routes config
app.use('/meals', mealsRoutes);
app.use('/orders', ordersRoutes)

app.get('*', (req, res) => {
    res.send("welcome to meals api");
})


// Listening config

app.listen(port, () => {
    console.log(`Meals app listening at http://localhost:${port}`)
})

module.exports = app
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;


const app = express();
app.use(bodyParser.json());
app.use(cors());



app.get('*', (req, res) => {
    res.send("welcome to meals api");
})

app.listen(port, () => {
    console.log(`Meals app listening at http://localhost:${port}`)
})

module.exports = app
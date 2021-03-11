const express = require('express');
const Orders = require('../models/Orders');
const { isAuthenticated, hasRole } = require('../auth');

const router = express.Router();

router.get('/', (req, res) => {
    Orders.find()
        .exec()
        .then(x => res.status(200).send(x));
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Orders.findById(id)
        .exec()
        .then(x => res.status(200).send(x));
})

router.post('/', isAuthenticated, hasRole('user'), (req, res) => {
    const data = req.body;
    const { _id } = req.user; //from auth 
    Orders.create({ ...data, user_id: _id })
        .then(x => res.status(201).send(x));
})

router.put('/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Orders.findOneAndUpdate(id, data)
        .then(() => res.sendStatus(204));
})

router.delete('/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Orders.findOneAndDelete(id, data)
        .then(() => res.sendStatus(204));
})


module.exports = router;

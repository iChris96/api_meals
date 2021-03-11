const express = require('express');
const Meals = require('../models/Meals');
const { isAuthenticated } = require('../auth');

const router = express.Router();

router.get('/', (req, res) => {
    Meals.find()
        .exec()
        .then(x => res.status(200).send(x));
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Meals.findById(id)
        .exec()
        .then(x => res.status(200).send(x));
})

router.post('/', isAuthenticated, (req, res) => {
    const data = req.body;
    Meals.create(data)
        .then(x => res.status(201).send(x));
})

router.put('/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Meals.findOneAndUpdate(id, data)
        .then(() => res.sendStatus(204));
})

router.delete('/:id', isAuthenticated, (req, res) => {
    const id = req.params.id;
    const data = req.body;
    Meals.findOneAndDelete(id, data)
        .then(() => res.sendStatus(204));
})


module.exports = router;

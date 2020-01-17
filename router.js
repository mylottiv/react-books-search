const express = require('express');
const router = express.Router();
const Book = require('./models/Book.js');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

// books GET
router.get('/books', (req, res) => {
    Book.find({}).then(results => res.json(results));
});

// books POST
router.post('/books', (req, res) => {
    console.log('hit', req.body);
    const newBook = new Book({
        ...req.body
    })
    
    newBook.save().then(results => res.json(results));
});

// books/:id DELETE
router.delete('/books/:id', (req, res) => {
    Book.findByIdAndDelete(req.params.id)
    .then((book) => res.json(book))
    .catch(err => res.status(404).send(err));
});

module.exports = router;
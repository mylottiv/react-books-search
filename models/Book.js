const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: String,
    authors: [String],
    description: String,
    image: String,
    link: String
});
module.exports = mongoose.model('Book', BookSchema);


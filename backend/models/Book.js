
const mongoose = require('mongoose');

// Define schema for the 'books' collection
const bookSchema = new mongoose.Schema({
    bookTitle: {
    type: String,
    required: true,
    
},
authorName: {
    type: String,
    required: true,
    
},
imageURL: {
    type: String,
    required: true,
    unique:true,
},
category: {
    type: String,
    required: true,
    
},
price: {
    type: Number,
    required: true,
    
},
bookDescription: {
    type: String,
    required: true,
    
},
bookPDF: {
    type: String,
    required: true,
    
}});

// Define model for the 'books' collection
const Book = mongoose.model('Book', bookSchema);

module.exports=Book;
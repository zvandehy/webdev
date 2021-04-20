const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textbookSchema = new Schema({
    subject: { type: String, required: [true, "subject is required"] },
    title: { type: String, required: [true, "title is required"] },
    price: { type: Number, required: [true, "price is required"] },
    isbn: { type: String, required: [true, "isbn is required"] },
    author: { type: String, required: [true, "author is required"] },
    quality: { type: String, required: [true, "quality is required"] },
    classcode: { type: String },
    classname: { type: String },
    professor: { type: String },
    images: { type: [String], required: [true, "images is required"] },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
},
    { timestamps: true }
);

module.exports = mongoose.model("Textbook", textbookSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: { type: String, required: [true, "text is required and cannot be empty"] },
    inquiry: { type: Schema.Types.ObjectId, ref: "Inquiry", required: [true, "inquiry is required"] },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "sender is required"] },
},
    { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
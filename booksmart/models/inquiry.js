const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Message = require('../models/message');

const inquirySchema = new Schema({
    textbook: { type: Schema.Types.ObjectId, ref: 'Textbook', required: [true, "textbook is required"] },
    inquiredBy: { type: Schema.Types.ObjectId, ref: 'User', required: [true, "user is required"] },
    status: { type: String, default: "pending", enum: ["pending", "pending_owner", "pending_inquirer", "confirmed"] },
},
    { timestamps: true }
);

inquirySchema.post('findOneAndDelete', function (doc, next) {
    let inquiry = doc;
    console.log("findOneAndDelete")
    console.log(inquiry)
    console.log(inquiry.id)
    Message.deleteMany({ inquiry: inquiry.id }, { useFindAndModify: false })
        .then(message => {
            return next();
        })
        .catch(err => next(err))
});


module.exports = mongoose.model("Inquiry", inquirySchema);
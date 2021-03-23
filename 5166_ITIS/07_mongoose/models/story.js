const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema(
    //object structure
    {
        title: { type: String, required: [true, "title is required"], },
        author: { type: String, required: [true, "author is required"], },
        content: {
            type: String, required: [true, "content is required"],
            minLength: [10, "the content should have at least 10 characters"]
        },
    },
    //options
    //timestamps initiates "createdAt" and "updatedAt"
    { timestamps: true }
);

// collection name is stories in the db
//   because mongoose always associates the collection with the lowercase & plural version of the model name (below).
//   mongoose models automatically connect to the collection defined in app.js when calling connect()
module.exports = mongoose.model("Story", storySchema);
const { ObjectID } = require("mongodb");

let stories;
exports.initCollection = (db) => {
    stories = db.collection("stories");
}

exports.find = () => stories.find().toArray();

exports.findById = (id) => stories.findOne({ _id: ObjectID(id) });

exports.save = (story) => stories.insertOne(story);

exports.updateById = (id, story) => stories.findOneAndUpdate({ _id: ObjectID(id) },
    { $set: { title: story.title, content: story.content } }
);

exports.deleteById = (id) => stories.deleteOne({ _id: ObjectID(id) });

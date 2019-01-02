const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create IdeaSchema
const IdeaSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

//mongoose.model('ideas', IdeaSchema);

module.exports = Idea = mongoose.model('ideas', IdeaSchema);


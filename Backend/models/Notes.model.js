const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
    },
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
}
    , { timestamps: true }
)

const notes = mongoose.model('notes', NotesSchema)

module.exports = notes;
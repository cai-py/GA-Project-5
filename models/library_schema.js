const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: String,
    composer: String,
    sheetMusic: String,
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song
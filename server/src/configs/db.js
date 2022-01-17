const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect("mongodb+srv://pagin:pagin@cluster0.kt5qr.mongodb.net/music_album_record?retryWrites=true&w=majority")
}
const mongoose = require('mongoose')

exports.db = () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/Task').then(() => {
            console.log('connect')
        })
    }
    catch (error) {
        console.log(error)
    }
}
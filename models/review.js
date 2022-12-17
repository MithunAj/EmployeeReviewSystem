const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    content:{
        type: String
    },
    reviewBy:{
        type: mongoose.Schema.ObjectId,
        required : true,
        ref: 'User'
    },
    reviewOf:{
        type:mongoose.Schema.ObjectId,
        reuired : true,
        ref: 'User'
    },
    isDone:{
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;
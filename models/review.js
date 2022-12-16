const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    reviewBy:{
        type: mongoose.Schema.ObjectId,
        required : true,
        ref: 'user'
    },
    reviewOf:{
        type:mongoose.Schema.ObjectId,
        reuired : true,
        ref: 'user'
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
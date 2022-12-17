const express = require('express');
const router = express.Router();
const reviewController = require('../controller/review');
const Review = require('../models/review');



router.post('/submit/:id', reviewController.submitReview);

router.get('/update/:id', async function(req,res){
    let review = await Review.findById(req.params.id).populate('reviewBy reviewOf');

    return res.render('update_review',{
        review : review
    })    
})

router.post('/update/:id',reviewController.updateReview);
module.exports = router;
const Review  =  require('../models/review');


module.exports.submitReview = async function(req,res){
    try {
        // finding the review and updating the content and isDone properties of it
        let review = await Review.findByIdAndUpdate(req.params.id,{content:req.body.content,isDone:true});
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }
    
}

module.exports.updateReview = async function(req,res){
    try {
        // finding the review object and updating the content of it
        await Review.findByIdAndUpdate(req.params.id,{content:req.body.content});
        return res.redirect('/home');
    } catch (error) {
        console.log(error);
        return res.redirect('back');
    }

}
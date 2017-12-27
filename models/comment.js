const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    authorId: {
        type: String
    },
    companyId: {
        type: String
    },
    text: {
        type: String
    },
    rating: {
        type: Number
    }
});

const Comment = module.exports = mongoose.model('comment', CommentSchema);

module.exports.addNewComment = function(comment, callback){
    comment.save(callback);
};

module.exports.getCompanyRating = function(companyId, callback){
    Comment.find({companyId: companyId},{}, callback);
};

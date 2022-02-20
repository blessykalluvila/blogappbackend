const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://blessymol:blessy123@cluster0.vsmoj.mongodb.net/blog-app?retryWrites=true&w=majority');
const Schema=mongoose.Schema;

var articleSchema= new Schema({
    name:String,
    title:String,
    description:String,
    author:String,
    upvotes:Number,
    comments:Array
});

var ArticleInfo = mongoose.model('articles', articleSchema);
module.exports = ArticleInfo;
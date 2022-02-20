const express = require('express');
const cors = require('cors');


const ArticleInfo = require('./src/model/BlogDB');
// Object initialization
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port=process.env.PORT||5001;
const path=require('path');
const { resolve6 } = require('dns');
app.use(express.static('./build'));


app.get('/api/article/:name', (req, res) => {
    const articleName = req.params.name;
    ArticleInfo.findOne({ name: articleName })
        .then(function (article) {
            res.json(article);
        })
});

//To fetch all documents to articlelist

app.get('/api/article', (req, res) => {
    //const articleName = req.params.name;
   
    ArticleInfo.find()
        .then(function (article) {
            res.json(article);
        })
});



//Back end routing
app.post('/api/article/:name/upvotes',(req,res)=>{
    const articleName=req.params.name;
    console.log(articleName);
   // articleInfo[articleName].upvotes+=1;
    //res.send(`${articleName} Now has ${articleInfo[articleName].upvotes}`)
  const filter={name: articleName};
 const update={$inc:{upvotes:1}};
 //const update={upvotes: upvotes+=1};
  ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
//ArticleInfo.find();

});
//Comments Routing
app.post('/api/article/:name/comments', (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;
    const filter = { name: articleName };
    const update = { $push: { comments: { username, text } } };
    ArticleInfo.findOneAndUpdate(filter, update, { new: true })
        .then(function (article) {
            res.json(article);
        })
});
// Add article routing

app.post('/api/article/addarticle',(req,res)=>{
    const articlenew={name:req.body.name,title:req.body.title,description:req.body.desc,author:req.body.author}
    const newarticle=new ArticleInfo(articlenew);
    newarticle.save().then(data=>{res.json(data);})
});




//Testing


app.get('/*',function(req,res){
    res.sendFile(path.join(__dirname + '/build/index.html'));
}
);

    //Listening port
app.listen(port,()=>{
    console.log("Listening on port 5001");
})
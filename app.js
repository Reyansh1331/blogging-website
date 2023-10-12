//jshint esversion:6
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

let arr = [];

const homeStartingContent = "Are you a blogger ? Well you have come to the right place. Start writing your blog by clicking the COMPOSE button above. ";
const aboutContent = "my name is akash aman";
const contactContent = "email: akashaman277@gmail.com phone : 9546150159";
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const uri = "mongodb+srv://akashaman27:Delhi@cluster0.ja0teor.mongodb.net/BlogDB?retryWrites=true&w=majority";

  async function run() {
    await mongoose.connect(uri);
  }

  run().catch(console.dir);


const postSchema = {
   heading: String,
   content: String,
    imag: String
};

const Post = mongoose.model("Post", postSchema);


app.get("/" , function(req,res){
  Post.find({}).then((foundItems)=>{
    if(foundItems)
    {
      res.render("home" , {text: homeStartingContent , posts: foundItems});
    }
    else{
      console.log(err);
    }
  })
})

app.get("/about" , function(req,res){
  res.render("about" , {text: aboutContent});
})

app.get("/contact" , function(req,res){
  res.render("contact" , {text: contactContent});
})

app.get("/compose" , function(req,res){
  res.render("compose");
})

app.post("/compose" , function(req,res){
  const post = new Post ({
     heading: req.body.Heading,
     content: req.body.Body,
    imag : req.body.Image
   });
   post.save();

  // const post = {
  //   heading : req.body.Heading,
  //   content : req.body.Body
  // }
  // arr.push(post);
  res.redirect("/");
})

app.get("/posts/:val" , function(req,res){
  // arr.forEach(function(Post){
  //   if( _.lowerCase(req.params.val) == _.lowerCase(Post.heading) ){
  //     res.render("post" , {heading: Post.heading , text : Post.content});
  //   }
  // })

  Post.findOne({_id: req.params.val}).then((foundItem)=>{
    if(foundItem)
    {
      res.render("post" , {heading: foundItem.heading , text : foundItem.content , imag : foundItem.imag});
    }
  })
})



let port = process.env.PORT;
if(port===null || port=="" || port==undefined){
  port=3000;
}

app.listen(port, function() {
  console.log("Server started "+port);
});

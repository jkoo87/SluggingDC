const express = require("express");
const parser = require("body-parser");
const mongoose = require("./db/connection");
const cors = require('cors')

const app = express();


const Station = mongoose.Station;
const Comment = mongoose.Comment;


app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));

app.get("/", (req, res) => {
  res.render("index")
})


app.options('*', cors())

app.get("/api/stations", function(req, res){
  Station.find({}).then (function(stations){
    res.json(stations);
  });
});

app.get("/api/stations/:id", function(req, res){
  Station.findOne({_id: req.params.id}).then(function(station){
    res.json(station)
  });
});

app.post("/api/stations", function(req, res){
  Station.create(req.body).then(function(station){
    console.log(req.body)
    res.json(station)
  });
});

app.post("/api/stations/:id/comments", function(req, res){
  let station = Station.findOne({_id: req.params.id}).then(function(station){
    let newComment = new Comment(req.body)
      console.log(req.body)
    station.comments.push(newComment)
    station.save((err, comment) =>{
      if (err){
        console.log(err)
      } else {
        res.json(comment)
      }
    })
  })
});

app.delete("/api/stations/:id", function(req, res){
  Station.findOneAndRemove({_id: req.params.id}).then(function(){
    res.json({ msg: "success" })
  });
});

app.delete("/api/stations/:id/comments/:comment_id", function(req, res){
  Station.findOne({_id: req.params.id}).then(function(station){
    for (let i = 0; i < station.comments.length; i++){
      if (station.comments[i]._id == req.params.comment_id) {
        station.comments.splice(i, 1)
      }
    }
    station.save((err, station) =>{
      if (err){
        console.log(err)
      } else {
        res.json(station)
      }
    })
  })
});

app.put("/api/stations/:id", function(req, res){
  Station.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(station){
    res.json(station)
  });
});


app.get("/api/stations/:id/comments/:comment_id", function(req, res){

  Station.findOne({_id: req.params.id}).then(function(station){
    let comment = station.comments.find(function(comment){
      return comment._id == req.params.comment_id;
    })
  res.json(comment)
  })
});

app.put("/api/stations/:id/comments/:comment_id", function(req, res){

  Station.findOne({_id: req.params.id}).then(function(station){
    let comment = station.comments.find(function(comment){
      return comment._id == req.params.comment_id;
    })
    comment.content = req.body.content
    comment.name = req.body.name
    station.save((err, comment) =>{
      if (err){
        console.log(err)
      } else {
        console.log("comment", comment)
        res.json(comment)
      }
    })
  })
});



const RiderPost = mongoose.RiderPost;
const RiderComment = mongoose.RiderComment;


app.get("/api/riderposts", function(req, res){
  RiderPost.find({}).then (function(riderPosts){
    res.json(riderPosts);
  });
});

app.get("/api/riderposts/:id", function(req, res){
  RiderPost.findOne({_id: req.params.id}).then(function(riderPost){
    res.json(riderPost)
  });
});

app.post("/api/riderposts", function(req, res){
  RiderPost.create(req.body).then(function(riderPost){
    console.log(req.body)
    res.json(riderPost)
  });
});

app.post("/api/riderposts/:id/ridercomments", function(req, res){
  let riderPost = RiderPost.findOne({_id: req.params.id}).then(function(riderPost){
    let newRiderComment = new RiderComment(req.body)
      console.log(req.body)
    riderPost.comments.push(newRiderComment)
    riderPost.save((err, newRiderComment) =>{
      if (err){
        console.log(err)
      } else {
        res.json(newRiderComment)
      }
    })
  })
});

app.delete("/api/riderposts/:id", function(req, res){
  RiderPost.findOneAndRemove({_id: req.params.id}).then(function(){
    res.json({ msg: "success" })
  });
});

app.delete("/api/riderposts/:id/ridercomments/:ridercomment_id", function(req, res){
  RiderPost.findOne({_id: req.params.id}).then(function(riderPost){
    for (let i = 0; i < riderPost.comments.length; i++){
      if (riderPost.comments[i]._id == req.params.ridercomment_id) {
        riderPost.comments.splice(i, 1)
      }
    }
    riderPost.save((err, riderPost) =>{
      if (err){
        console.log(err)
      } else {
        res.json(riderPost)
      }
    })
  })
});

app.put("/api/riderposts/:id", function(req, res){
  RiderPost.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(riderPost){
    res.json(riderPost)
  });
});


app.get("/api/riderposts/:id/ridercomments/:ridercomment_id", function(req, res){

  RiderPost.findOne({_id: req.params.id}).then(function(riderPost){
    let riderComment = riderPost.comments.find(function(riderComment){
      return riderComment._id == req.params.ridercomment_id;
    })
  res.json(riderComment)
  })
});

app.put("/api/riderposts/:id/ridercomments/:ridercomment_id", function(req, res){

  RiderPost.findOne({_id: req.params.id}).then(function(riderPost){
    let ridercomment = riderPost.comments.find(function(ridercomment){
      return ridercomment._id == req.params.ridercomment_id;
    })
    ridercomment.content = req.body.content
    ridercomment.name = req.body.name
    riderPost.save((err, ridercomment) =>{
      if (err){
        console.log(err)
      } else {
        console.log("comment", ridercomment)
        res.json(ridercomment)
      }
    })
  })
});


app.get("/*", function(req, res) {
  res.render("index");
});

app.use(express.static(__dirname + "/"))
app.listen(app.get("port"), function(){
  console.log("Port 3001 is alivvvvvvvvve");
});

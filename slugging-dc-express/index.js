const express    = require("express");
const parser = require("body-parser");
const mongoose   = require("./db/connection");

const app        = express();


const Station = mongoose.Station;
const Comment = mongoose.Comment;


app.set("port", process.env.PORT || 3001);


app.use("/assets", express.static("public"));
app.use(parser.json());

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



app.get("/*", function(req, res) {
  res.render("stations");
});


app.listen(app.get("port"), function(){
  console.log("Port 3001 is alivvvvvvvvve");
});

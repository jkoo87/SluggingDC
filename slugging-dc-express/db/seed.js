let mongoose = require("./connection.js");
let seedData = require("./seeds");
let riderPostData = require("./riderSeeds");
let Station = mongoose.Station;
let Comment = mongoose.Comment;
let RiderPost = mongoose.RiderPost;
let RiderComment = mongoose.RiderComment;



Comment.remove({}, err => {
  if(err){
    console.log(err)
  }
});

RiderComment.remove({}, err => {
  if(err){
    console.log(err)
  }
});

let comment = new Comment ({
  "name": "Jkoo",
  "content": "There are 20 people waiting in line for Rolling Valley"
})


Station.remove({}).then(function(){

  const stations = seedData.map(station => {
    return new Station(station);
  })


  for(let i = 0; i < stations.length; i++){
    stations[i].comments.push(comment)
    stations[i].save((err, comment) =>{
      if (err){
        console.log(err)
      } else {
        console.log(comment);
      }
    })
  }
});


let ridercomment = new RiderComment  ({
  "name": "Jkoo",
  "content": "Do you still have a spot available?"
})


RiderPost.remove({}).then(function(){

  const riderposts = riderPostData.map(riderpost => {
    return new RiderPost(riderpost);
  })


  for(let i = 0; i < riderposts.length; i++){
    riderposts[i].comments.push(ridercomment)
    riderposts[i].save((err, ridercomment) =>{
      if (err){
        console.log(err)
      } else {
        console.log(ridercomment);
      }
    })
  }
})

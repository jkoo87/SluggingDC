let mongoose = require("./connection.js");
let seedData = require("./seeds");
let Station = mongoose.Station;
let Comment = mongoose.Comment;



Comment.remove({}, err => {
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

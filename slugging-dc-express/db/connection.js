let mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/slugging');

let Schema = mongoose.Schema;


let CommentSchema = new Schema({

  name: String,
  content: String,
}, {
  timestamps: true
})

let StationSchema = new Schema({

  station: String,
  morning: Boolean,
  location: String,
  description: String,
  map: String,
  hours: {best: String, good: String},
  destinations: [String],
  returningStations: [String],
  driver: String,
  parking: String,
  comments: [CommentSchema],
}, {
  timestamps: true
})

let Station = mongoose.model("Station", StationSchema);
let Comment = mongoose.model("Comment", CommentSchema);

module.exports = {
  Station, Comment
}

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
  name: String,
  morning: String,
  line: String,
  note: String,
  location: String,
  description: String,
  map: {lat: Number, lng: Number},
  hours: {best: String, good: String},
  destinations: [String],
  returningStations: [String],
  driver: String,
  parking: String,
  comments: [CommentSchema],
}, {
  timestamps: true
})


let RiderCommentSchema = new Schema({
  name: String,
  content: String,
}, {
  timestamps: true
})

let RiderPostSchema = new Schema({
  notice: String,
  line: String,
  destination: String,
  name: String,
  count: Number,
  leaving: Number,
  from: String,
  description: String,
  carType: {make: String, model: String, year: String, color: String},
  comments: [RiderCommentSchema]
}, {
  timestamps: true
})



let Station = mongoose.model("Station", StationSchema);
let Comment = mongoose.model("Comment", CommentSchema);
let RiderPost = mongoose.model("RiderPost", RiderPostSchema);
let RiderComment = mongoose.model("RiderComment", RiderCommentSchema);

module.exports = {
  Station, Comment, RiderPost, RiderComment
}

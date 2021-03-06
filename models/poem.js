var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var poemSchema = new mongoose.Schema({
  poemId : String, 
  title:{
    type: String,
    required: true
  },
  poetName : {
    type : String,
    required : true
  },
  introPoet : String,
  linkToBook : String,
  picUrlOfPoet : String,
  contents:{
    type: String, 
    required: true
  },
  question: {
    type: String
  },
  profession : {
    type: String
  },
  pushDueDate: String,
  published_date: {
    type: Date,
    default: Date.now
  }
  
});

poemSchema.pre("save", function(next) {
  return next();
});


var poem = mongoose.model("Poem", poemSchema);

module.exports = poem;

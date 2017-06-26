var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var poetSchema = new mongoose.Schema({
  poetId : String, 
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
  registered_date: {
    type: String
  }
});

poetSchema.pre("save", function(next) {
  return next();
});

var poet = mongoose.model("Poet", poetSchema);

module.exports = poet;

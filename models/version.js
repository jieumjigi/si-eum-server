var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var moment = require("moment-timezone");



var versionSchema = new mongoose.Schema({
  
  version : String, 
  published_date: {
    type: String
  }
});

versionSchema.pre("save", function(next) {
    return next();
});

var version = mongoose.model("Version", versionSchema);

module.exports = version;

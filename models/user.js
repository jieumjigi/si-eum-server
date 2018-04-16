var bcrypt = require('bcrypt-nodejs');
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var userSchema = new mongoose.Schema({
  name: String,
  email : String,
  password : String
});

//password를 암호화
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//password의 유효성 검증
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", function(next) {
  return next();
});

var user = mongoose.model("User", userSchema);

module.exports = user;

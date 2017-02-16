var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');

var poemSchema = new mongoose.Schema({

  title:{
    type: String,
    required: true
  },
  autor : {
    type : String,
    required : true
  },
  content:{
    type: String, 
    required: true
  },
  picUrl: {
    type: String
  },
  published_date: {
    type: Date,
    default: Date.now
  }
  
});


poemSchema.pre("save", function(next) {
  return next();
});


poemSchema.statics.serialize = function() {
  return function(diary, callback) {
    return callback(null, diary._id);
  }
}


poemSchema.statics.deserialize = function() {
  return function(id, callback) {
    poem.findOne({_id: id}, function(error, diary) {
      return callback(error, diary);
    });
  }
}
//----------------- get all questions ---------------------------
// questionSchema.statics.getQuestions = function(req,res){
//   var page = req.query.page;
//   if(page==null) page = 0;
//   var num = Number(req.query.num);
  
//   Question.find().sort({published_date: -1}).skip((page-1)*num).limit(num).exec(function(err, questions){
//       if(err) {
//           console.log(err); 
//           return res.status(err.code).json({isSuccess: 0});
//       }
//       if(questions == null){
//         return res.status(204).json({isSuccess: 0,
//           msg : "no question."
//         });
//       }
//       Question.find().count(function(err,count){
//           if(err) return res.status(err.code).json({isSuccess : 0});
//           if((page-1)*num+ num >= count){
//               return res.status(200).json({
//                   isSuccess : 1,
//                   isLast : 1,
//                   items : questions
//               });        
//                 }
//           else{
//               return res.status(200).json({
//                   isSuccess : 1,
//                   isLast : 0,
//                   items : questions
//               });
//           }
//       });
//   });  
// };


var poem = mongoose.model("Poem", poemSchema);

module.exports = poem;

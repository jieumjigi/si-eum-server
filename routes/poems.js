var express = require('express');
var router = express.Router();
var Poem = require("../models/poem");



/* GET users listing. */
router.get('/', function(req, res, next) {
    var page = req.query.page;
    var num = Number(req.query.num);    
    
    Poem.find().sort({published_date: -1}).skip((page-1)*num).limit(num).exec(function(err, poems){
        if(err){
            return res.status(err.code).json({isSuccess : 0});
        }
        
        Poem.find().count(function(err,count){
            if(err) return res.status(err.code).json({isSuccess : 0});
            console.log(count);
            
            if((page-1)*num+ num >= count){
                return res.json({
                    isSuccess : 1,
                    isLast : 1,
                    items : poems
                });        
            }
            else{
                return res.json({
                    isSuccess : 1,
                    isLast : 0,
                    items : poems
                });
            }
        });
        
    });
    
});

// file uploading. 
// router.post("/:position/newDiary/", function(req, res, next){
    
//     var form = new multiparty.Form();
//     var bucketName, bucket;
//     var position = req.params.position;
//     var userId, plantId, comments, afterPlanting;
//     var diaryCount;
//     var picUrl= [];
//     var diaries = [];
//     var plantInfo = [];
    
//     // for sensor data 
//     var factory, gateway;
    
//     // get field name & value
//     form.on('field', function(name, value){
//         console.log('normal field /name ='+ name +', value=' + value); 
//         switch (name) {
            
//             case 'comments' :
//                 comments = value; break;
//             case 'afterPlanting' :
//                 afterPlanting = value; break;
//             case 'userId' :
//                 userId = value; break;
//             case 'plantId' :
//                 plantId = value; break;
//             case 'bucketName' :
//                 bucketName = value; break;
//             case 'diaryCount' :
//                 diaryCount = value; diaryCount++; break;
//             case 'factory' :
//                 factory = value; break;
//             case 'gateway' :
//                 gateway = value; break;
//             default:
//                 break;
//         }
//     });
        
//     //file upload handling
//     form.on('part', function(part){

//         var filename; 
//         var size;
        
//         bucket = gcs.bucket(bucketName);
        
//         if(part.filename) {
            
//             size = part.byteCount;
//             filename = "diary/"+ plantId +"/diary-"+ diaryCount + "/" + part.filename;
//             var tempPicUrl = "storage.googleapis.com/"+bucketName+"/"+ filename;
//             picUrl.push(tempPicUrl);
            
//           // console.log(req.user);
//         }else{
//             part.resume();
//         }
          
//         console.log("Write Streaming file : " + filename);
         
//         // pipe connection
//         var remoteWriteStream = bucket.file(filename).createWriteStream();
//         part.pipe(remoteWriteStream);
         
         
//         part.on('data', function(chunk){
//           console.log(filename + ' read '+chunk.length + 'bytes'); 
//         });
         
//         part.on('end', function(){
//             console.log(filename + 'Part read complete');
//             remoteWriteStream.end();
//         });
//     });
       
//     //all uploads are completed 
//     form.on('close', function(){
        
//         Plant.findOne({position : position})
//         .exec(function(err,plant){
//           if(err){
//               return res.status(err.code).json({isSuccess : 0});
//             }
//           else{
              
//             //----getting nthing sensor data.
//             Nthing.find({ $and : [{factory : factory}, {gateway : gateway}]}).sort({date: -1}).limit(1)
//             .exec(function(err, sensorData){
//                 if(err) {
//                     console.log(err); 
//                     return res.status(err.code).json({isSuccess: 0});
//                 }
//                 if(sensorData == null){
//                     return res.json({isSuccess: 0, msg : "no such data."});
//                 }
//                 else{
//                     // --- set diary count
//                     var diaryCount = plant.diaryCount;
//                     diaryCount++;
//                     var diaryId = plantId + '-' +diaryCount;
//                     diaries = plant.diary;
//                     diaries.push(diaryId);
//                     plantInfo.push(sensorData);
                    
//                     var diary = new Diary({
//                         userId : plant.userId,
//                         afterPlanting : afterPlanting,
//                         plantId : plantId,
//                         diaryId : diaryId,
//                         plantName : plant.plantName,
//                         position : position,
//                         comments : comments,
//                         picUrl : picUrl,
//                         plantInfo : plantInfo
//                     });
                    
//                     diary.save(function(err, diary){
//                       if(err){
//                         console.log(err);
//                         res.json({isSuccess : 0});
//                       }
//                       else{
//                         Plant.update({plantId : plantId}, {$set : {diaryCount : diaryCount, diary : diaries}},
//                           function(err, tasks){
//                             if(err){
//                               return res.status(err.code).json({isSuccess : 0});
//                             }
//                             console.log("A diary is registered!");
                            
//                           });
//                         }
//                     });
//                   }
//                 });
//                 return res.json({isSuccess : 1});
//                 }
//           });
            
//     });
    
//     //track progress
//     form.on('progress',function(byteRead,byteExpected){
//         console.log(' Reading total  '+byteRead+'/'+byteExpected);
//     });
        
//     form.parse(req);
// });

module.exports = router;

var express = require('express');
var router = express.Router();
var multiparty=require('multiparty');

var gcs = require('@google-cloud/storage')({
  projectId: "si-eum-165814",
  keyFilename: '../config/keyfile',
  credentials: require('../config/keyfile')
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/poem/create');
  // res.render('index', { title: 'Jieum' });
});

router.get('/poem/create', function(req, res, next) {
  res.render('poemCreate', { title: 'Jieum - Poem Create' });
});

router.get('/poem/update', function(req, res, next) {
  res.render('poemUpdate', { title: 'Jieum - Poem Update' });
});

//upload Images. 
router.post("/uploadImage", function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");  
    
    var form = new multiparty.Form();
    var bucket, bucketName = "si-eum-165814.appspot.com";
    var picUrl= [];
    
    // get field name & value
    form.on('field', function(name, value){
        console.log('normal field /name ='+ name +', value=' + value); 
    });
        
    //file upload handling
    form.on('part', function(part){

        var filename; 
        var size;
        
        bucket = gcs.bucket(bucketName);
        
        if(part.filename) {
    
            size = part.byteCount;
            filename = String(Date.now()).replace(/(\s*)/g,"") + part.filename;
            var tempPicUrl = "https://storage.googleapis.com/"+bucketName+"/"+ filename;
            picUrl.push(tempPicUrl);
          // console.log(req.user);
        }else{
            part.resume();
        }
          
        console.log("Write Streaming file : " + filename);
         
        // pipe connection
        var remoteWriteStream = bucket.file(filename).createWriteStream();
        part.pipe(remoteWriteStream);
         
         
        part.on('data', function(chunk){
          console.log(filename + ' read '+chunk.length + 'bytes'); 
        });
         
        part.on('end', function(){
            console.log(filename + 'Part read complete');
            remoteWriteStream.end();
        });
    });
       
    //all uploads are completed 
    form.on('close', function(){
        console.log(picUrl);
        return res.status(201).json({
              isSuccess : 1,
              picUrl : picUrl
        });
        
    });
    
    //track progress
    form.on('progress',function(byteRead,byteExpected){
        console.log(' Reading total  '+byteRead+'/'+byteExpected);
    });
        
    form.parse(req);
});


module.exports = router;
var express = require('express');
var router = express.Router();
var Poem = require("../models/poem");
var moment = require("moment-timezone");


router.get('/', function(req, res, next) {
   
    Poem.find({}).sort({published_date : -1}).exec(function(err, poems){
        if(err){
            return res.status(err.code).json({isSuccess : 0});
        }  
        else
            res.render('index', poems);
    });
});


router.put('/modifyPoem', function(req, res){
    var title = req.body.title;
    var poetName = req.body.poetName;
    var contents = req.body.contents;
    var picUrl = req.body.picUrl;
    var introPoet = req.body.introPoet;
    var linkToBook = req.body.linkToBook;
    var picUrlOfPoet = req.body.picUrlOfPoet;
    var pushDueDate = req.body.pushDueDate;
    var poemId = req.body.poemId;
    
    
    Poem.findOne({poemId : poemId}).exec(function(err, poem){
        
        if(err){
            return res.status(err.code).json({isSuccess : 0});
        }
        else{
            if(title)
                poem.title = title;
            if(poetName)
                poem.poetName = poetName;
            if(contents)
                poem.contents = contents;
            if(picUrl)
                poem.picUrl = picUrl;
            if(introPoet)
                poem.introPoet = introPoet;
            if(linkToBook)
                poem.linkToBook =linkToBook;
            if(picUrlOfPoet)
                poem.picUrlOfPoet = picUrlOfPoet;
            if(pushDueDate)
                poem.pushDueDate = pushDueDate;
            
            
            poem.save(function(err){
                if(err){
                    console.log(err);
                    return res.status(err.code).json({isSuccess : 0});
                } 
            });
        }
    });
});

router.get('/getPoem', function(req, res, next) {
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
router.post("/addPoem/", function(req, res, next){
    var title = req.body.title;
    var poetName = req.body.poetName;
    var contents = req.body.contents;
    var picUrl = req.body.picUrl;
    var introPoet = req.body.introPoet;
    var linkToBook = req.body.linkToBook;
    var picUrlOfPoet = req.body.picUrlOfPoet;
    var pushDueDate = req.body.pushDueDate;
    var poemId = "poem-" + Date.now();
    
    var poem = new Poem({
        poemId : poemId,
        title : title,
        poetName : poetName,
        introPoet : introPoet,
        linkToBook : linkToBook,
        picUrlOfPoet : picUrlOfPoet,
        contents : contents,
        picUrl : picUrl,
        pushDueDate : pushDueDate
    });
    
    poem.save(function(err, poem){
        if(err) return res.status(err.code).json({isSuccess: 0, err : err});
    });
    
    return res.status(201).redirect('/');
});

router.get("/poemOfToday/", function(req, res, next){
    
    var today = moment().tz('Asia/Tokyo').format('YYYY-MM-DD');
    Poem.find({pushDueDate : today}).exec(function(err, poem){
        if(err) return res.status(err.code).json({isSuccess: 0, err : err});
        return res.status(200).json({isSuccess: 1, poem : poem});
    });
});

router.post("/poemsOfpoet/", function(req, res, next){
   
    var poet = req.body.poetName;
    console.log(poet);
    Poem.find({poetName : poet}).exec(function(err, poems){
        if(err) return res.status(err.code).json({isSuccess: 0, err : err});
        return res.status(200).json({isSuccess: 1, poems : poems});
    });
    
});


router.delete("/deletePoem/", function(req, res, next) {
    var poemId = req.body.poemId;
    
    Poem.remove({poemId : poemId}, function(err,result){
        if(err){
            console.log(err);
            return res.status(err.code).json({error : err, isSuccess : 0});
        }  
        else{
            return res.status(200).json({error : "Successfully deleted one poem.", isSuccess : 1});
        }
    });
})


module.exports = router;
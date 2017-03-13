var express = require('express');
var router = express.Router();
var Poem = require("../models/poem");



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
    var pushDueDay = req.body.pushDueDay;
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
            if(pushDueDay)
                poem.pushDueDay = pushDueDay;
            
            
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
    var pushDueDay = req.body.pushDueDay;
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
        pushDueDay : pushDueDay
    });
    
    poem.save(function(err, poem){
        if(err) return res.status(err.code).json({isSuccess: 0, err : err});
    });
    
    return res.status(201).redirect('/');
});

module.exports = router;
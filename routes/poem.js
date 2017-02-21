var express = require('express');
var router = express.Router();
var Poem = require("../models/poem");

/* GET users listing. */
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
    var author = req.body.author;
    var contents = req.body.contents;
    var picUrl = req.body.picUrl;
    console.log("hello ~~~~ ");
    var poem = new Poem({
        title : title,
        author : author,
        contents : contents,
        picUrl : picUrl
    });
    
    poem.save(function(err, poem){
        if(err) return res.status(err.code).json({isSuccess: 0, err : err});
    });
    
    return res.status(201).json({isSuccess: 1, msg : "A poem is successfully created!"});
});

module.exports = router;
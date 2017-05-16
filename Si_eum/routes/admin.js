var express = require('express');
var router = express.Router();

// router.get('/', function(req, res, next) {
//     res.json({
//         id: "hello"
//     })
// });


router.post('/', function(req, res, next) {
    console.log(req.body);
    res.json({
        id: "bye"
    })
});

module.exports = router;

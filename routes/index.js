var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Jieum' });
});

router.get('/manager/poem', function(req, res, next) {
  res.render('poemManager', { title: 'Jieum - Poem Manager' });
});

router.get('/manager/user', function(req, res, next) {
  res.render('userManager', { title: 'Jieum - User Manager' });
});

module.exports = router;
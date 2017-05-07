var express = require('express');
var router = express.Router();

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

module.exports = router;
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: '로그인' });
});

router.get('/signup', function(req, res, next) {
  res.render('signup', { title: '회원가입' });
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect : '../poem/create', 
  failureRedirect : '/', //가입 실패시 redirect할 url주소
  failureFlash : true 
}));

router.post('/login', passport.authenticate('login', {
  successRedirect : '../poem/create', 
  failureRedirect : '/', //로그인 실패시 redirect할 url주소
  failureFlash : true 
}));

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

module.exports = router;

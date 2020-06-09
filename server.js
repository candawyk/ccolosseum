var path = require('path');
var express = require('express');

var mysql = require('./dbcon.js');

var expressHB = require('express-handlebars');

var bodyParse = require('body-parser');
var flash = require('express-flash');
var session = require('express-session');
var fs = require('fs');

var app = express();
var port = process.env.PORT || 42077;

//setup handlebars
app.engine('handlebars', expressHB({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(session({
  secret: 'nothing',
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.set('mysql', mysql);
app.use(bodyParse.urlencoded({extended:true}));
app.use('/battle/display', require('./viewBattles.js'));
app.use('/battle/create', require('./startBattle.js'));
app.use('/', require('./critterBattle.js'));
app.use('/login', require('./login_handlr.js'));
app.use('/account/view/', require('./user_account'));
app.use("/registration", require("./register.js"));
app.use('/admin', require('./admin.js'));
app.use('/account/edit', require('./bio_update.js'));
app.use('/account/visit', require('./visit_user.js'));
app.use('/search', require('./search.js'));

//setup the Date object for timeouts
var date = new Date();

//====================
//Server Functionality
//====================



//  app.get("/registration", function (req, res) {
//    res.status(200).render('registration');
//  });
  app.get("/account/load", function (req, res) {
	      res.status(200).render('load_account');
	 });

  app.get("/admin/load", function (req, res) {
       res.status(200).render('admin_load');
  });

/*  app.get("/login", function (req, res) {
    res.status(200).render('login');
  });*/

//  app.get("/account", function (req, res) {
  //  res.status(200).render('account');
  //});
/*
  app.get("/battle/display", function (req, res) {
    res.status(200).render('battle_display');
  });
*/
  /*app.get("/battle/create", function (req, res) {
    res.status(200).render('battle_create');
  });
*/
  //serve the home page to the client
/*  app.get('/', function(req, res){
    console.log("==Home Page Requested");
    res.status(200).render('homePage');
  });
*/




app.use(express.static('public'));
app.use('/static', express.static('public'));

app.get('*', function (req, res) {
  //console.log("==URL NOT FOUND: ", req.url);
  console.log("==Sending 404:", req.url);
  res.status(404).render('404Page');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});

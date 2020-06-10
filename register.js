module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAcountBody( res, mysql, req, res, login){
	  var query = "INSERT INTO Usr (screen_name, email, password, bio) VALUES (?,?,?,?)";
	  var create_ava = "INSERT INTO Avatar (description, image_location) VALUES (?,?)";
	  var ava = "INSERT INTO User_has_a (usr, av_id) VALUES (?,?)";
	  var creds = [req.body.sc, req.body.email, req.body.pass, "Im a new user!"];
          sql = mysql.pool.query(query, creds, function(error, results, fields){
		  if (error){
		  	res.write(JSON.stringify(error));
		 	 res.end();
	  	  }

		  var usr = results.insertId;
		  var nava = [req.body.sc, req.body.lnk];
		  sql = mysql.pool.query(create_ava, nava, function(error, results, fields){
		  	if (error){
				res.write(JSON.stringify(error));
		          }
			var linking = [usr, results.insertId];



		  sql = mysql.pool.query(ava, linking, function(error, results, fields){
	                    if (error){
	                            res.write(JSON.stringify(error));
	                             res.end();
	                       }

				  context = {};
				  login(res, context);
		});
 	  });
	});


      }


    router.post('/', function(req,res){
      var context = {};
      var mysql = req.app.get('mysql');
      getAcountBody(res, mysql, req, res, function(res, context){
	      res.render('account',context);
      });

      });

    router.get('/', function(req,res){
	    var context = {};
	    res.render('registration',context);
    });

    return router;
}();

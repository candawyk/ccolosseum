module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAcountBody( res, mysql, req, res, login){
          var query = "SELECT screen_name as sc, bio  FROM Usr WHERE User_id=?";
	  var ava_q = "SELECT Avatar.image_location as LNK FROM Avatar JOIN User_has_a ON User_has_a.av_id=Avatar.av_id WHERE User_has_a.usr=?";
	  var creds = [req.params.id];
          sql = mysql.pool.query(query, creds, function(error, results, fields){
		  context = {};
		  if (error){
		  	res.write(JSON.stringify(error));
		 	 res.end();
	  	  }
		 
		  if ( typeof results[0] != 'undefined'){
			  context.sc =  results[0].sc;
			  context.bio = results[0].bio;
			  sql = mysql.pool.query(ava_q, creds, function(error, results, fields){
				  context.path = results[0].LNK;
				  login(res, context);
			});
		  }
 	  });

	
      }
    

//    router.post('/', function(req,res){
  //    var context = {};
//      var mysql = req.app.get('mysql');
//      var UID;
//      getAcountBody(res, mysql, req, res, function(res, context){
//	      console.log("LOADING USER");
//	      console.log(context)
//	      res.render('account',context);
//      });

//      });

    router.get('/:id', function(req,res){
	    function render_page(req, context){
		res.render('visit_account',context);
	    }
	    var mysql = req.app.get('mysql');
	    getAcountBody(res, mysql, req, res, render_page);
    });
    
    return router;
}();

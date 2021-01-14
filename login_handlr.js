module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAcount( res, mysql, req, res, login){
          var query = "SELECT User_id FROM Usr WHERE screen_name=? AND password=?"
	  var creds = [req.body.sn, req.body.pass];
	  console.log([req.body.sn, req.body.pass]);
          sql = mysql.pool.query(query, creds, function(error, results, fields){
		  if (error){
		  	res.write(JSON.stringify(error));
		 	 res.end();
	  	  }
		 
		  if ( typeof results[0] != 'undefined'){
			  UID =  results[0].User_id;
			  login(res, UID);
		  }
		  else{
			  login(res, -1);
		  }
 	  });

	
      }
    

    router.post('/', function(req,res){
      var context = {};
      var mysql = req.app.get('mysql');
      var UID;
      getAcount(res, mysql, req, res, function(res, UID){
	      console.log(UID);
	      context.UID=UID;	      
	      res.render('login',context);
      });

      });

    router.get('/', function(req,res){
	    var context = {};
	    context.UID = -1;
	    res.render('login',context);
    });
    
    return router;
}();

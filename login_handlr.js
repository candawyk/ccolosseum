module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAcount( res, mysql, context){
//        console.log("You asked me for some CRITTLESRRS?")
          var query = "SELECT User_id FROM Usr WHERE screen_name=? AND password=?"
	  var creds = ["winghenge", "abcdefg"];
          sql = mysql.pool.query(query, creds, function(error, results, fields){
		  if (error){
		  	res.write(JSON.stringify(error));
		 	 res.end();
	  	  }
		  console.log(results);
 	  });

	
      }
    

    router.get('/', function(req,res){
      var context = {};
      var mysql = req.app.get('mysql');
      getAcount(res, mysql, context);
      res.render('account',context);
	//res.render('homePage', context);
      });
    
    return router;
}();

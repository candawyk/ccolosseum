module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAcount( res, mysql, req, res, login){
          var query = "UPDATE Usr SET bio=? WHERE User_id=?"
	  var creds = [req.body.edited_bio, req.body.UIDBIO];
	  console.log("->->" + creds);
          sql = mysql.pool.query(query, creds, function(error, results, fields){
		  if (error){
		  	res.write(JSON.stringify(error));
		 	 res.end();
	  	  }
			  login(res, req.body.UID);
 	  });

	
      }
    

    router.post('/', function(req,res){
      var context = {};
      var mysql = req.app.get('mysql');
      getAcount(res, mysql, req, res, function(res, UID){
	      res.render('account_redir',context);
      });

      });

    return router;
}();

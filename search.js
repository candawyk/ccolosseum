module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function search_crit(res, keyword, context, complete){
	    var i;
	    context.popBattle = [];
	    if (res == undefined){
		    complete();
	    }
	    else{
	
	    for (i = 0; i < res.length; i++){
		    if ( res[i].Name1.toLowerCase() == keyword || res[i].Name2.toLowerCase() == keyword){
				console.log(res[i]);
				context.popBattle.push(res[i]);
		    }
	    }
	    complete();
    
    }
    }

    function search_user(res, keyword, context, complete){
	    var i;
	    context.user_res = [];

	if (res == undefined){
		complete();
	}
	else{
	    for (i = 0; i < res.length; i++){
		    if (res[i].SC.toLowerCase() == keyword){
			    context.user_res.push(res[i]);
		}
	}
	complete();
    }
   }

    function getUser(res, mysql, context, complete, keyword){
	    var query = "SELECT User_id as id, screen_name as SC FROM Usr"
	    mysql.pool.query(query, function(error, results, fields){
		    if(error){
			    res.write(JSON.stringify(error));
			    res.end();
		    }

		    search_user(results, keyword, context, complete);
	});
     }

    function getCritters( res, mysql, context, complete, keyword){
//        console.log("You asked me for some CRITTLESRRS?")
          var query = "SELECT T.battle as id, (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_one) AS Name1,  (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_two) AS Name2 FROM Takes_part_in T ORDER BY T.id DESC"
		  	  

          mysql.pool.query(query, function(error, results, fields){
          if(error){
            res.write(JSON.stringify(error))
            res.end();
          }
          
      	 search_crit(results, keyword, context, complete);
      });
    }

    router.get('/:keyword', function(req,res){
      callbackCount = 0;
      console.log(req.params.keyword);
      var context = {};
      var mysql = req.app.get('mysql');
      getUser(res, mysql, context, complete, req.params.keyword.toLowerCase());
      getCritters(res, mysql, context, complete, req.params.keyword.toLowerCase());
      function complete(){
        callbackCount++;
        if(callbackCount >= 2){
	console.log(context);
          res.render('search',context);
        }
      }
    });
    return router;
}();





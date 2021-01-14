module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCritters( res, mysql, context, complete){
//        console.log("You asked me for some CRITTLESRRS?")
        var query = "SELECT T.battle as id, (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_one) AS Name1,  (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_two) AS Name2 FROM Takes_part_in T ORDER BY T.id DESC"
        //var query = "SELECT (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_one) AS Name1, (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_two) AS Name2 FROM Takes_part_in T ORDER BY T.id DESC";
        //var query = "SELECT (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_one) AS Name1, (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_two) AS Name2 FROM Takes_part_in T";
          mysql.pool.query(query, function(error, results, fields){
          if(error){
            res.write(JSON.stringify(error))
            res.end();
          }
          context.newBattle = results;
	  console.log("--" + results);
          console.log(context)
          complete();
      });
    }

    function getPopCritters(res, mysql, context, complete){
        var query = "SELECT T.battle as id, (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_one) AS Name1, (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_two) AS Name2 FROM Takes_part_in T";
        var count = 0;
        mysql.pool.query(query, function(error, results, fields){
          if(error){
            res.write(JSON.stringify(error));
            res.end();
          }
          count = results.length;
          if (count == 1) {
            context.popBattle = [results[0]];
          }
          else if (count == 2){
            context.popBattle = [results[0], results[1]];
          }
          else{
            context.popBattle = [results[count-1], results[count-2], results[count-3]];

          }
          console.log(context)
          complete();
        });
    }
    router.get('/', function(req,res){
      callbackCount = 0;
      var context = {};
      var mysql = req.app.get('mysql');
      getPopCritters(res, mysql, context, complete);
      getCritters(res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount >= 2){
          res.render('homePage',context);
        }
      }
    });
    return router;
}();

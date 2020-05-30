module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getComments( res, mysql, context, complete){
        console.log("You asked me for some COMMENTS?")
        var query = "SELECT * FROM Comment_of F INNER JOIN Comments C on F.comment_id = C.comment_id WHERE F.battle = (SELECT battle_id FROM Battle ORDER BY battle_id DESC LIMIT 1)";
          mysql.pool.query(query, function(error, results, fields){
          if(error){
            res.write(JSON.stringify(error))
            res.end();
          }
          context.comment = results;
          //console.log(context)
          complete();
      });
    }

    function getCrit(res,mysql,context, complete){
      var query = "SELECT B.battle_id, B.Quantity_one, B.Quantity_two, B.Size_one, B.Size_two, B.votes_one, B.votes_two, (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_one) AS Name1, (SELECT species FROM Critter C WHERE  C.critter_id = T.critter_two) AS Name2 FROM Takes_part_in T, Battle B WHERE T.battle = (SELECT D.battle_id FROM Battle D ORDER BY D.battle_id DESC LIMIT 1) ORDER BY B.battle_id DESC LIMIT 1"
      mysql.pool.query(query, function(error, results, fields){
      if(error){
        res.write(JSON.stringify(error))
        res.end();
      }
      context.critter = results;
      //console.log(context)
      complete();
      });
    }

    router.get('/', function(req,res){
      callbackCount = 0;
      //console.log("HEYWHRIU")
      var context = {};
      var mysql = req.app.get('mysql');
      getComments(res, mysql, context, complete);
      getCrit(res, mysql, context, complete);
      function complete(){
        callbackCount++;
        if(callbackCount == 2){
          res.render('battle_display',context);
        }
      }
    });
    return router;
}();

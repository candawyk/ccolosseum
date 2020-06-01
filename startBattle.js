module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req,res){
      var context = {};
      res.render('battle_create',context);
    });


    router.post('/', function(req,res){
      //callbackCount = 0;
      var context = {};
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Battle (Quantity_one, Quantity_two, Size_one, Size_two) VALUES(?,?,?,?)";
      var nsql = "INSERT INTO Critter (Species) VALUES(?)";
      var tpi = "INSERT INTO Takes_part_in (critter_one, critter_two, battle) VALUES(?,?,?)";
      var inserts = [req.body.num1, req.body.num2, req.body.size1, req.body.size2];
      var ninserts = [req.body.crit1];
      var minserts = [req.body.crit2];
      var BID;
      var COID;
      var CTID;

      sql = mysql.pool.query(sql,inserts,function(error,results,fields){
          if (error){
            res.write(JSON.stringify(error));
            res.end();
          }
//	  console.log("DATA");
//	  console.log(results.insertId)
//	  get the battle id
	  BID = results.insertId;
	  
      sql = mysql.pool.query(nsql,ninserts,function(error,results,fields){
          if (error){
            res.write(JSON.stringify(error));
            res.end();
          }
	  COID = results.insertId;
      	  sql = mysql.pool.query(nsql,minserts,function(error,results,fields){
          	if (error){
	            res.write(JSON.stringify(error));
        	    res.end();
		  }
		  CTID = results.insertId;
		  console.log("++" + CTID);

      
      var tpi_in = [COID, CTID, BID];
      console.log([COID, CTID, BID]);
      sql = mysql.pool.query(tpi, tpi_in, function(error, results, fields){
      	if (error){
        res.write(JSON.stringify(error));
	res.end();
	}
	else{
		res.redirect('/');
	}
      });
      });
      });
      });
    });
    return router;
}();

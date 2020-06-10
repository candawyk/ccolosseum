module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req,res){
      var context = {};
      res.render('battle_create',context);
    });


    router.post('/', function(req,res){
      var context = {};
      var mysql = req.app.get('mysql');
      var sql = "INSERT INTO Battle (Quantity_one, Quantity_two, Size_one, Size_two, Votes_one, Votes_two) VALUES(?,?,?,?,0,0)";
      var nsql = "INSERT INTO Critter (Species) VALUES(?)";
      var tpi = "INSERT INTO Takes_part_in (critter_one, critter_two, battle) VALUES(?,?,?)";

      var cha = "INSERT INTO Critter_has_a (critter, av_id) VALUES (?,?)";
      var ava = "INSERT INTO Avatar (image_location) VALUES(?)";

      var usr_crt = "INSERT INTO Creates_a (battle, usr) VALUES (?,?)";
      var commOf    = "INSERT INTO Comment_of (id, comment_id, battle) VALUES (?,?)";
      var commSQL = "INSERT INTO Comments (comment_id, comment_text, likes, dislikes) VALUES (?, ?, 0, 0)";


      var inserts = [req.body.num1, req.body.num2, req.body.size1, req.body.size2];
      var commserts = [req.body.comment_id, req.body.comment_text, 0, 0]
      var ninserts = [req.body.crit1];
      var minserts = [req.body.crit2];
      var ava1 = [req.body.link1];
      var ava2 = [req.body.link2];
      var BID;
      var COID;
      var CTID;
      var AID;
      var get_CID = [req.body.comment_id];
      var comment_id;
      var usr_comm;

      if (req.body.num1 == '' || req.body.size1 == '' || req.body.crit1 == '' || req.body.link1 == ''){
        req.flash('error', 'Please fill in all of the fields');
        res.render('battle_create',context);
      }

      else if (req.body.num2 == '' || req.body.size2 == '' || req.body.crit2 == '' || req.body.link2 == ''){
        req.flash('error', 'Please fill in all of the fields');
        res.render('battle_create',context);
      }
      else if (req.body.UID == '' || req.body.UID == -1){
        req.flash('error', 'Please sign in first to create a battle');
        res.render('battle_create',context);
      }

      else{

        sql = mysql.pool.query(commSQL, commserts, function (error, results, fields) {
          if (error) {
            res.write(JSON.stringify(error));
            res.end();
          }
          comment_id = results.insertId;

          var usr_comm = [req.body.comment_id, req.body.comment_id, req.body.battle];
          sql = mysql.pool.query(commOf, usr_comm, function (error, results, fields) {
            if (error) {
              res.write(JSON.stringify(error));
              res.end();
            }
          });

      sql = mysql.pool.query(sql,inserts,function(error,results,fields){
          if (error){
            res.write(JSON.stringify(error));
            res.end();
          }
        BID = results.insertId;


        var usr_battle = [BID, req.body.UID];
        sql = mysql.pool.query(usr_crt,usr_battle,function(error,results,fields){
          if (error){
            res.write(JSON.stringify(error));
            res.end();
          }
        });


        sql = mysql.pool.query(nsql,ninserts,function(error,results,fields){
            if (error){
              res.write(JSON.stringify(error));
              res.end();
            }
	           COID = results.insertId;


             sql = mysql.pool.query(ava,ava1,function(error, results, fields){
                 if(error){
                     res.write(JSON.stringify(error));
                     res.end();
                 }
                 AID = results.insertId;
                 var critter_has_a = [COID, AID];
                 sql = mysql.pool.query(cha,critter_has_a,function(error, results, fields){
                   if(error){
                       res.write(JSON.stringify(error));
                       res.end();
                   }
                 });
               });



      	      sql = mysql.pool.query(nsql,minserts,function(error,results,fields){
          	     if (error){
	                  res.write(JSON.stringify(error));
        	           res.end();
		             }
		               CTID = results.insertId;
		                // console.log("++" + CTID);
                     var tpi_in = [COID, CTID, BID];
                     //console.log([COID, CTID, BID]);
                     sql = mysql.pool.query(tpi, tpi_in, function(error, results, fields){
      	                if (error){
                          res.write(JSON.stringify(error));
  	                      res.end();
	                       }
                    });
                });


                sql = mysql.pool.query(ava,ava2,function(error, results, fields){
                  if(error){
                      res.write(JSON.stringify(error));
                      res.end();
                  }
                  AID = results.insertId;
                  var critter_has_a = [CTID, AID];
                  sql = mysql.pool.query(cha,critter_has_a,function(error, results, fields){
                    if(error){
                        res.write(JSON.stringify(error));
                        res.end();
                    }
                  });
                });

                sql = mysql.pool.query(ava, ava2, function (error, results, fields) {
                  if (error) {
                    res.write(JSON.stringify(error));
                    res.end();
                  }
                  AID = results.insertId;
                  var critter_has_a = [CTID, AID];
                  sql = mysql.pool.query(cha, critter_has_a, function (error, results, fields) {
                    if (error) {
                      res.write(JSON.stringify(error));
                      res.end();
                    }
                  });
                });


            });
        });
        res.redirect('/battle/display');
      })
      }

    });
    return router;
}();

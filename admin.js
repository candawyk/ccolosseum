module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.post('/', function(req,res){
      var context = {};
      var mysql = req.app.get('mysql');
      var sql = "SELECT admin_id FROM Admin WHERE admin_id = ?";
      var inserts = [req.body.UID];
      sql = mysql.pool.query(sql,inserts,function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        if(results.length > 0){
          //console.log("O RELLY");
          mysql.pool.query("SELECT * FROM Usr INNER JOIN Admin ON admin_id = User_id", function(error, results, fields){
            if(error){
              res.write(JSON.stringify(error))
              res.end();
            }

          context.admin = results;
          res.render('admin_page',context);
          });
        }
        else{
          req.flash('error', 'You do not have access to the page');
          res.render('404Page',context);
        }

      });
    });

    router.post('/delete', function(req,res){
      var context = {};
      var mysql = req.app.get('mysql');
      var sql = "DELETE FROM Admin WHERE admin_id = ?";
      var inserts = [req.body.del];
      //console.log(inserts);
      if (req.body.UID == req.body.del){
        req.flash('error', 'You cannot remove yourself from the admin list');
        mysql.pool.query("SELECT * FROM Usr INNER JOIN Admin ON admin_id = User_id", function(error, results, fields){
          if(error){
            res.write(JSON.stringify(error))
            res.end();
          }

        context.admin = results;
        res.render('admin_page',context);
        });
      }
      else{
        sql = mysql.pool.query(sql,inserts, function(error, results, fields){
          if(error){
            res.write(JSON.stringify(error));
            res.end();
          }
          else{
            res.redirect('/admin');
          }
        })
      }
      //res.redirect('/admin');
    });


    router.get('/', function(req,res){
      var context = {};
      var mysql = req.app.get('mysql');
      mysql.pool.query("SELECT * FROM Usr INNER JOIN Admin ON admin_id = User_id", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error))
          res.end();
        }

      context.admin = results;
      res.render('admin_page',context);
      });
    });

    return router;
}();

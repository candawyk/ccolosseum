var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_seeverst',
  password        : 'volumar2',
  database        : 'cs340_seeverst'
});
module.exports.pool = pool;

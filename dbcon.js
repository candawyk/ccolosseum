var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_chanda',
  password        : 'Somepw231@',
  database        : 'cs340_chanda'
});
module.exports.pool = pool;

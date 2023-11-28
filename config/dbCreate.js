import mysql from 'mysql2';

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

const  dbConn = con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE Node_Pro_Test", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});

export default {dbConn}
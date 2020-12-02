var express = require("express");
var router = express.Router();
var mysql = require("mysql");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
router.get("/travel1", function (req, res, next) {
  res.render("travel1");
});
router.get("/travel2", function (req, res, next) {
  res.render("travel2");
});
router.get("/travel3", function (req, res, next) {
  res.render("travel3");
});
router.get("/travel4", function (req, res, next) {
  res.render("travel4");
});
router.get("/travel5", function (req, res, next) {
  res.render("travel5");
});
router.get("/travel6", function (req, res, next) {
  res.render("travel6");
});
router.get("/covid_19", function (req, res, next) {
  res.render("covid_19");
});

router.get("/help", function (req, res, next) {
  res.render("help");
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.get("/register", function (req, res, next) {
  res.render("register");
});

router.get("/content", function (req, res, next) {
  res.render("contentAll/content");
});
router.get("/nav", function (req, res, next) {
  res.render("nav");
});

var connection = mysql.createConnection({
  host: "localhost", //or name (dns)
  user: "root",
  password: "",
  database: "myweb",
});
connection.connect((err) => {
  if (err) {
    console.log("database connect failed...");
  } else {
    console.log("database connected...");
  }
});

router.post("/register", function (req, res) {
  console.log("req", req.body);
  var users = {
    user_name: req.body.user_name,
    email: req.body.email,
    password: req.body.password,
    // confirm_password: req.body.confirm_password,
  };
  connection.query(
    "INSERT INTO users SET ?",
    users,
    function (error, results, fields) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        console.log("The solution is: ", results);
        res.send({
          code: 200,
          success: "user registered sucessfully",
        });
      }
    }
  );
});

router.post("/login", function (req, res) {
  var user_name = req.body.user_name;
  var password = req.body.password;
  connection.query(
    "SELECT * FROM users WHERE user_name = ?",
    [user_name],
    function (error, results, fields) {
      if (error) {
        // console.log("error ocurred",error);
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        // console.log('The solution is: ', results);
        if (results.length > 0) {
          if (results[0].password == password) {
            res.render("index");
          } else {
            res.send({
              code: 204,
              success: "User and password does not match",
            });
          }
        } else {
          res.send({
            code: 204,
            success: "User does not exits",
          });
        }
      }
    }
  );
});

module.exports = router;

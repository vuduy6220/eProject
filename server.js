var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var url = 'mongodb://duypham9669:69912110a@ds042688.mlab.com:42688/duypham9669';

// var configDB = require('./config/database.js');
// configuration ===============================================================
mongoose.connect(url);
// connect to our database




app.use(express.static(__dirname + '/public'));

app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// app.use(bodyParser.urlencoded({ extended:true}));
// //parser application.json
// app.use(bodyParser.json());
// app.use(upload.array());
// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================================================


// launch ======================================================================
app.listen(port);

var bodyParser = require("body-parser");
var multer = require("multer");

var upload = multer();
//parser application/x-www-from-urlencoded

app.use(bodyParser.urlencoded({ extended:true}));
//parser application.json
app.use(bodyParser.json());
app.use(upload.array());

app.use(express.static('public'));
//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');


var MongoClient = mongodb.MongoClient;
// Connection URL. This is where your mongodb server is running.

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connected........', url);
  	// const db = client.db;
    var collection = db.db();

	var more_product = collection.collection("more_product");
    var account = collection.collection("account");



      app.get("/list_product",function(req,res){
            more_product.find({}).toArray(function(err,result){
                var json = {
                    status: 0,
                    message: "Fail",
                    data: {}
                };
                if(err){
                    console.log(err);
                }else{
                    json.status = 1;
                    json.message = "Success";
                    json.data = result;
                }    
                res.send(json);
            });

        });
    
        //loc-san-pham-theo-nha-san-xuat
          app.get("/filter_product_manufacturer",function(req,res){
            more_product.find({pr_manufacturer: req.query.pr_manufacturer}).toArray(function (err, result) {
             var json = {
                    status: 0,
                    message: "Fail",
                    data: {}
                };
                if(err){
                    console.log(err);
                }else{
                    json.status = 1;
                    json.message = "Success";
                    json.data = result;
                }    
                res.send(json);
            });

        });
            //tim-kiem-san-pham
             app.get("/search_product",function(req,res){
            more_product.find({
                $or:[
                {pr_name: req.query.pr_name},
                {pr_class: req.query.pr_name},
                {pr_manufacturer: req.query.pr_name},
                ]
            }).toArray(function (err, result) {
             var json = {
                    status: 0,
                    message: "Fail",
                    data: {}
                };
                if(err){
                    console.log(err);
                }else{
                    json.status = 1;
                    json.message = "Success";
                    json.data = result;
                }    
                res.send(json);
            });
        });
               
              app.get("/search_product_price",function(req,res){
            more_product.find({pr_price: {$gt: req.query.pr_price}}).toArray(function (err, result) {
             var json = {
                    status: 0,
                    message: "Fail",
                    data: {}
                };
                if(err){
                    console.log(err);
                }else{
                    json.status = 1;
                    json.message = "Success";
                    json.data = result;
                }    
                res.send(json);
            });
        });

          //loc-san-pham
            app.get("/filter_product",function(req,res){
            more_product.find({pr_class: req.query.pr_class}).toArray(function (err, result) {
             var json = {
                    status: 0,
                    message: "Fail",
                    data: {}
                };
                if(err){
                    console.log(err);
                }else{
                    json.status = 1;
                    json.message = "Success";
                    json.data = result;
                }    
                res.send(json);
            });
        });
    
          //chi-tiet-san-pham
      app.get("/detail_product",function(req,res){
       var id = req.query.id;
       more_product.find({_id: mongodb.ObjectId(id)}).toArray(function (err, result) {
      var json = {
        status: 0,
        message: "Fail",
        data: {}
      };
        if(err){
          //console.log(err);
        }else if(result.length < 1){
          json.message = 'product not found';
        }else{
          json.status = 1;
          json.message = "Success";
          json.data = result[0];
        }
        res.send(json);
      });
         });  
        //đăng-ký
            app.post("/dang_ky", function(req,res){
                var user = {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                };
                account.insert([user],function(err,result){
                    if(err){
                        res.send("fail");
                    }else{
                        res.send("dang ky thanh cong");
                    }
                });
            });

            //đăng-nhập
            app.get("/dang_nhap", function(req,res){
                if (req.query.email == "admin" & req.query.password == "admin") {
                    res.redirect("/admin_page_ddtl.html");
                }else{
                    account.find({email: req.query.email, password: req.query.password}).toArray(function (err, result) {
         
                if(err){
                  //console.log(err);
                }else if(result.length < 1){
                  res.send("không tìm thấy tài khoản");
                }else{
                  	
                  res.redirect("/home.html");
                }
                
              }); 
                }

                
                 });  

    app.post("/them_san_pham", function(req,res)
    {
        var product = {
            pr_code: req.body.pr_code,
            pr_name: req.body.pr_name,
            pr_class: req.body.pr_class,
            pr_manufacturer: req.body.pr_manufacturer,
            pr_images1: req.body.pr_images1,
            pr_images2: req.body.pr_images2,
            pr_images3: req.body.pr_images3,
            pr_images4: req.body.pr_images4,
            pr_price: req.body.pr_price,
            pr_detail: req.body.pr_detail,
            pr_guarantee: req.body.pr_guarantee,
        };
        more_product.insert([product],function(req,result){
            if (err){
                res.send("Fail");
            }else{
                res.send("da them san pham")
                res.redirect("/admin_page_ddtl.html");
            }
        });
    });

       

     
      //sửa sản phẩm
      app.post("/edit_product",function(req,res){
            var product2 = {
            pr_code: req.body.pr_code,
            pr_name: req.body.pr_name,
            pr_class: req.body.pr_class,
            pr_manufacturer: req.body.pr_manufacturer,
            pr_images1: req.body.pr_images1,
            pr_images2: req.body.pr_images2,
            pr_images3: req.body.pr_images3,
            pr_images4: req.body.pr_images4,
            pr_price: req.body.pr_price,
            pr_detail: req.body.pr_detail,
            pr_guarantee: req.body.pr_guarantee
         };
          more_product.update({_id:mongodb.ObjectId(req.body._id)}, {$set: product2}, 
         function (err, result) {
          if(err){
        res.send("Fail");
       }else{
        res.redirect("/admin_page_ddtl.html");
        }
         });
        });
      //xoa-san-pham
    app.get("/delete_product",function(req,res){
    var id = req.query.id;
    more_product.deleteOne({_id: mongodb.ObjectId(id)},function(err,result){
    });
    res.send({
      status:1,
      message:'xoa thanh cong',
      redirect: '/danh_sach_san_pham.html'
    });
   });

   
  }
});
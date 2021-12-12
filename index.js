var express=require("express");
var passport = require('passport');
var users=require('./routes/userroutes')
var employee=require('./routes/employeeroutes')

var app=express();
const cors=require("cors")
app.use(passport.initialize());
app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/users",users)
app.use("/api",employee)

app.listen("8000",function(){
    console.log("Server running on port 8000")
})

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to WRM application." });
  });

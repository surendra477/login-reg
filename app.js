const express               =  require('express');
const app                   =  express();
const mongoose              =  require("mongoose");
const passport              =  require("passport");
const bodyParser            =  require("body-parser");
const LocalStrategy         =  require("passport-local");
const passportLocalMongoose =  require("passport-local-mongoose");
const User                  =  require("./Models/user");
//Connecting database
mongoose.connect("mongodb://127.0.0.1:27017/auth_demo",{ useNewUrlParser: true, useUnifiedTopology: true });
app.use(require("express-session")({
    secret:"Any normal Word",       //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));

passport.serializeUser(User.serializeUser());       //session encoding
passport.deserializeUser(User.deserializeUser());   //session decoding
passport.use(new LocalStrategy(User.authenticate()));
app.set("view engine","ejs");

app.use(express.urlencoded({ extended: true }))
app.use(passport.initialize());
app.use(passport.session());

//=======================
//      R O U T E S
//=======================

app.get("/", (req,res) =>{
    res.render("home");
})

app.get("/userprofile",isLoggedIn ,(req,res) =>{
    res.render("userprofile");
})
//Auth Routes
app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/userprofile",
    failureRedirect:"/login"
}),function (req, res){

});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
 // console.log(req.body.password);
 if(req.body.password.length >= 5){
    User.register(new User({username: req.body.username,phone:req.body.phone,telephone: req.body.telephone}),req.body.password,function(err,user){
       
        if(err){
             console.log(err);
            res.render("register");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/login");
    })    
    })
 }else{
     console.log("password must be more than 5 chars");
 }
   
})

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


//Listen On Server


app.listen(process.env.PORT ||3000,function (err) {
    if(err){
        console.log(err);
    }else {
        console.log("Server Started At Port 3000");
    }
      
});
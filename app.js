var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride= require("method-override"),
    flash         = require("connect-flash"),
    // campground    = require("./models/campground"),
    // Comment       = require("./models/comment"),
    User          = require("./models/user");
    // seedDB        = require("./seeds");
    
//Route Dependencies
var indexRoute      = require("./routes/index"),
    campgroundRoute = require("./routes/campgrounds"),
    commentRoute    = require("./routes/comments");

mongoose.connect('mongodb://localhost:27017/yelp_app', { useNewUrlParser: true }); 
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs"); //don't have to write ejs now
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();   

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Hey there Fred, Betty and Wilma are coming here! Run!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Passing User id and name to all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoute);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentRoute);

// Tell express to listen
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started.");
});
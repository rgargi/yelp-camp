var express       = require("express"),
    router        = express.Router(),
    passport      = require("passport"),
    User          = require("../models/user");

//ROOT ROUTE

router.get('/', function(req, res){
    res.render("landing");
});

//AUTH ROUTES

router.get('/register', function(req, res) {
    res.render("register");
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err) {
            console.log(err);
            req.flash("error", err.message); //needs to be redirect to work?
            return res.redirect('/register'); 
        } else {
            passport.authenticate("local")(req, res, function(){
                req.flash("success", "Welcome to Yelp Camp, " + user.username);
                res.redirect("/campgrounds");
            });
        }
    });
});

//LOGIN ROUTES
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", { //middleware
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}) ,function(req, res){
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash("success", "You Logged Out!");
    res.redirect('/campgrounds');
});

module.exports = router;
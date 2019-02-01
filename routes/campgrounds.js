var express       = require("express"),
    router        = express.Router(),
    middleware    = require("../middleware"), //don't need to write index.js as it is automatically required
    campground    = require("../models/campground");

//INDEX ROUTE - Displays all camps
router.get('/', function(req, res){
    campground.find({}, function(err, allCampgrounds){
        if (err){
            console.log(err);
        } else {
        res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
    
});

//CREATE ROUTE - Add a new camp to database
router.post('/', middleware.isLoggedIn, function(req, res){
    var author = {id: req.user._id, username: req.user.username};
    var newCampground = {name:req.body.name, image:req.body.image, description:req.body.description, author:author};
    console.log(newCampground);
    campground.create(newCampground, function(err, newCampground){
        if (err) {
            console.log(err);
        } else {
            res.redirect('/campgrounds');
        }
    });
});

//NEW ROUTE - Displays a form to add a new camp
router.get('/new', middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW ROUTE - Shows info about one camp Should be after NEW
router.get('/:id', function(req, res){
    campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
    campground.findById(req.params.id, function(err, foundCampground){
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if (err) {
            res.redirect('/campgrounds');
        } else {
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

//DESTROY CAMPGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
    campground.findByIdAndRemove(req.params.id, function(err){
        if (err) {
            req.flash("error", "Something went wrong");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Campground was deleted.");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;
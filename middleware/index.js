var campground    = require("../models/campground"),
    Comment       = require("../models/comment");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect('/login');
    }
};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //is user logged in?
    if (req.isAuthenticated()){
        //find campground
        campground.findById(req.params.id, function(err, foundCampground){
            if (err) {
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
            //does user own the campground?
            //can't use === because data types don't match (obj & str)
            if (foundCampground.author.id.equals(req.user._id)){ 
                return next();
            } else {
            //otherwise, redirect
            req.flash("error", "You don't have permission to do that.");
            res.redirect("back");
            }
            }
        });
    //if not logged in, redirect
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    //is user logged in?
    if (req.isAuthenticated()){
        //find comment
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back");
            } else {
            //does user own the comment?
            //can't use === because data types don't match (obj & str)
            if (foundComment.author.id.equals(req.user._id)){ 
                return next();
            } else {
            //otherwise, redirect
            req.flash("error", "You don't have permission to do that.");
            res.redirect("back");
            }
            }
        });
    //if not logged in, redirect
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

module.exports = middlewareObj;
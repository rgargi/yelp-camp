var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
 
var data = [
    {
        name: "Cloud's Rest", 
        image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
        author: { id: "5c3ba77d9c55b01a3cfef68b", username: 'admin' },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
        author: { id: "5c3ba77d9c55b01a3cfef68b", username: 'admin' },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Camp Clear Landing",
        image: "https://farm4.staticflickr.com/3850/14557015320_3b8f3949e6.jpg",
        author: { id: "5c3ba77d9c55b01a3cfef68b", username: 'admin' },
        description: "Vale ivy night azrael echo atom kane ra oracle spectre. Aquaman selina thomas rupert alfred. Caird helena scorn nocturna hugo snake freeze; shiva pit tally pennyworth crane freeze. Blink wing temblor joker birds selina al hood spoiler two jester tim society. Diamond copperhead damian amanda beetle mugsy dick nyssa prey bat ivy hood. Montoya toymaker helena supergirl ra a azrael calendar joe? Hugo edward aiko solomon scorn katana clayface creeper red hatter. Crane batman metallo bartok collector riddler. Doom joe joker, maroni rumor supergirl zatanna abbott thorne. Bennett cypher cobblepot thorne the. Oracle spoiler abattoir chimera!"
    },
    {
        name: "Horse Lake Valley",
        image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg",
        author: { id: "5c3ba77d9c55b01a3cfef68b", username: 'admin' },
        description: "Vale ivy night azrael echo atom kane ra oracle spectre. Aquaman selina thomas rupert alfred. Caird helena scorn nocturna hugo snake freeze; shiva pit tally pennyworth crane freeze. Blink wing temblor joker birds selina al hood spoiler two jester tim society. Diamond copperhead damian amanda beetle mugsy dick nyssa prey bat ivy hood. Montoya toymaker helena supergirl ra a azrael calendar joe? Hugo edward aiko solomon scorn katana clayface creeper red hatter. Crane batman metallo bartok collector riddler. Doom joe joker, maroni rumor supergirl zatanna abbott thorne. Bennett cypher cobblepot thorne the. Oracle spoiler abattoir chimera!"
    },
    {
        name: "Granite Hills",
        image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg",
        author: { id: "5c3ba77d9c55b01a3cfef68b", username: 'admin' },
        description: "Vale ivy night azrael echo atom kane ra oracle spectre. Aquaman selina thomas rupert alfred. Caird helena scorn nocturna hugo snake freeze; shiva pit tally pennyworth crane freeze. Blink wing temblor joker birds selina al hood spoiler two jester tim society. Diamond copperhead damian amanda beetle mugsy dick nyssa prey bat ivy hood. Montoya toymaker helena supergirl ra a azrael calendar joe? Hugo edward aiko solomon scorn katana clayface creeper red hatter. Crane batman metallo bartok collector riddler. Doom joe joker, maroni rumor supergirl zatanna abbott thorne. Bennett cypher cobblepot thorne the. Oracle spoiler abattoir chimera!"
    },
    {
        name: "Red Sky Ranges",
        image: "https://farm6.staticflickr.com/5750/24049715015_f007bf73e0.jpg",
        author: { id: "5c3ba77d9c55b01a3cfef68b", username: 'admin' },
        description: "Vale ivy night azrael echo atom kane ra oracle spectre. Aquaman selina thomas rupert alfred. Caird helena scorn nocturna hugo snake freeze; shiva pit tally pennyworth crane freeze. Blink wing temblor joker birds selina al hood spoiler two jester tim society. Diamond copperhead damian amanda beetle mugsy dick nyssa prey bat ivy hood. Montoya toymaker helena supergirl ra a azrael calendar joe? Hugo edward aiko solomon scorn katana clayface creeper red hatter. Crane batman metallo bartok collector riddler. Doom joe joker, maroni rumor supergirl zatanna abbott thorne. Bennett cypher cobblepot thorne the. Oracle spoiler abattoir chimera!"
    },
    {
        name: "Canyon Floor", 
        image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
        author: { id: "5c3ba77d9c55b01a3cfef68b", username: 'admin' },
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Sander's Clearing",
        image: "https://farm1.staticflickr.com/533/31599808864_a16ffab88d.jpg",
        author: { id: "5c3ba77d9c55b01a3cfef68b", username: 'admin' },
        description: "Vale ivy night azrael echo atom kane ra oracle spectre. Aquaman selina thomas rupert alfred. Caird helena scorn nocturna hugo snake freeze; shiva pit tally pennyworth crane freeze. Blink wing temblor joker birds selina al hood spoiler two jester tim society. Diamond copperhead damian amanda beetle mugsy dick nyssa prey bat ivy hood. Montoya toymaker helena supergirl ra a azrael calendar joe? Hugo edward aiko solomon scorn katana clayface creeper red hatter. Crane batman metallo bartok collector riddler. Doom joe joker, maroni rumor supergirl zatanna abbott thorne. Bennett cypher cobblepot thorne the. Oracle spoiler abattoir chimera!"
    },  
    {
        name: "Lonely Mountains",
        image: "https://farm5.staticflickr.com/4134/4901707346_ec6b7d676a.jpg",
        author: { id: "5c3ba77d9c55b01a3cfef68b", username: 'admin' },
        description: "Vale ivy night azrael echo atom kane ra oracle spectre. Aquaman selina thomas rupert alfred. Caird helena scorn nocturna hugo snake freeze; shiva pit tally pennyworth crane freeze. Blink wing temblor joker birds selina al hood spoiler two jester tim society. Diamond copperhead damian amanda beetle mugsy dick nyssa prey bat ivy hood. Montoya toymaker helena supergirl ra a azrael calendar joe? Hugo edward aiko solomon scorn katana clayface creeper red hatter. Crane batman metallo bartok collector riddler. Doom joe joker, maroni rumor supergirl zatanna abbott thorne. Bennett cypher cobblepot thorne the. Oracle spoiler abattoir chimera!"
    },
    ];
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        // console.log("added a campground");
                        //create a comment
                        campground.save();
                        // Comment.create(
                        //     {
                        //         text: "This place is great, but I wish there was internet",
                        //         author: "Homer"
                        //     }, function(err, comment){
                        //         if(err){
                        //             console.log(err);
                        //         } else {
                        //             campground.comments.push(comment);
                        //             campground.save();
                        //             // console.log("Created new comment");
                        //         }
                        //     });
                    }
                });
            });
        });
    }); 
    //add a few comments
}
 
module.exports = seedDB;
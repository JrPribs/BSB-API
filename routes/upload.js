var express = require('express');
var router = express.Router();
var image = require('../custom_modules/image');

function saveImageInfo(req, res, next) {
    var user = res.locals.user;
    var count = 0;
    var campaignRef = new Firebase('https://vivid-fire-567.firebaseio.com/BSB/userStore/' + user.username + '/campaigns/' + req.campaignId);
    var imageCount = req.finalImages.length;
    campaignRef.once('value', function(snapshot) {
        var campaign = snapshot.val();
        var currentCount = campaign.photoCount;
        campaignRef.update({
            photoCount: currentCount + imageCount
        });
    });
    var campaignPhotosRef = new Firebase('https://vivid-fire-567.firebaseio.com/BSB/userStore/' + user.username + '/campaigns/' + req.campaignId + '/photos');
    var finalImages = req.finalImages;
    finalImages.forEach(function(image) {
        campaignPhotosRef.push(image, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Data saved successfully for : ' + image.file);
                count++;
                if (req.finalImages.length === count) {
                    next();
                }
            }
        });
    });

}




router.route("/:campaignId")
    .post(image.processData, image.resizeImages, saveImageInfo, function(req, res) {
        var campaignRef = new Firebase('https://vivid-fire-567.firebaseio.com/BSB/userStore/' + res.locals.user.username + '/campaigns/' + req.campaignId);
        campaignRef.once('value', function(snapshot) {
            var campaign = snapshot.val();
            res.render("viewMap", {
                title: "File(s) Uploaded Successfully!",
                campaign: campaign,
                view: true,
                scripts: ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCU42Wpv6BtNO51t7xGJYnatuPqgwnwk7c', '/javascripts/getPoints.js']
            });
        });

    });

module.exports = router;

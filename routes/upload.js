var express = require('express');
var router = express.Router();
var image = require('../custom_modules/image');

function saveImageInfo(req, res, next) {
    var user = res.locals.user;
    var count = 0;
    var imageCount = req.finalImages.length;
    Campaign.find({
        where: {
            user: userId
        }
    }).success(function(campaign) {
        campaign.increment('photo_count', imageCount)
    }).success();

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
        var campaignId = req.param('campaignId');
        Campaign.find({
            where: {
                id: campaignId
            }
        }).success(function(campaign) {
            res.json({
                title: "File(s) Uploaded Successfully!",
                campaign: campaign,
                view: true,
                scripts: ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCU42Wpv6BtNO51t7xGJYnatuPqgwnwk7c', '/javascripts/getPoints.js']
            });
        });
    });

module.exports = router;

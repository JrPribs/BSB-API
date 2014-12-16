var express = require('express');
var router = express.Router();
var image = require('../custom_modules/image');
var orm = require('../lib/model');
var Campaign = orm.model('Campaign');
var Photo = orm.model('Photo');

function saveImageInfo(req, res, next) {
    var count = 0;
    var imageCount = req.finalImages.length;
    Campaign.find({
        where: {
            user: userId
        }
    }).complete(function(err, campaign) {
        campaign.increment('photo_count', imageCount)
        var finalImages = req.finalImages;
        finalImages.forEach(function(image) {
            Photo.create({
                caption: image.caption,
                latitude: image.lat,
                longitude: image.lng,
                full: image.full,
                thumb: image.thumb,
                photo_date: image.date,
                upload_date: Date.now()
            }).complete(function(err, photo) {
                photo.setCampaign(campaign).complete(function(err) {
                    campaign.addPhoto(photo).complete(function(err) {
                        count++;
                        if (imageCount === count) {
                            next();
                        }
                    });
                });
            });

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
        }).complete(function(err, campaign) {
            campaign.getAccount().complete(function(err, _account) {
                campaign.getPhotos().complete(function(err, _photos) {
                    res.json({
                        campaign: {
                            info: campaign,
                            photos: _photos.values
                        },
                        account: _account.values,
                        view: true,
                        scripts: ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCU42Wpv6BtNO51t7xGJYnatuPqgwnwk7c', '/javascripts/getPoints.js']
                    });
                });
            });
        });
    })

    .get(function(req, res) {
        var campaignId = req.param('campaignId');
        Campaign.find({
            where: {
                id: campaignId
            }
        }).complete(function(err, campaign) {
            campaign.getPhotos().complete(function(err, _photos) {
                campaign.getAccount().complete(function(err, _account) {
                    res.send({
                        campaign: {
                            info: campaign,
                            photos: _photos.values
                        },
                        account: _account.values
                    });
                });
            });
        });
    });

module.exports = router;

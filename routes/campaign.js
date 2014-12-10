var express = require('express');
var router = express.Router();
var customDate = require('../custom_modules/dates');


router.route('/new')
    .post(function(req, res) {
        var userId = req.body.userId;
        Campaign.Create({
            title: req.body.campaignTitle,
            createDate: customDate.formatDate(Date.now()),
            createTime: customDate.formatTime(Date.now()),
            photo_count: 0,
            photos: 0,
            account: userId
        }).success(function(campaign) {
            res.json(campaign);
        });
    });

router.route('/:campaignId')
    .get(function(req, res) {
        var campaignId = req.param('campaignId');
        Campaign.find({
            where: {
                id: campaignId
            }
        }).then(function(campaign) {
            res.json(campaign);
        });
    });

module.exports = router;

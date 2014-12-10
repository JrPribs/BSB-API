var express = require('express');
var router = express.Router();
var customDate = require('../custom_modules/dates');


router.route('/')
    .post(function(req, res) {
        var user = res.locals.user.username;
        Campaign.Create({
            title: req.body.campaignTitle,
            createDate: customDate.formatDate(Date.now()),
            createTime: customDate.formatTime(Date.now()),
            photo_count: 0,
            photos: 0,
            user: 1
        }).success(function(campaign) {
            res.json(campaign);
        });
    });

module.exports = router;

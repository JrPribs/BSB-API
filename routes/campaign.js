var express = require('express');
var router = express.Router();
var customDate = require('../custom_modules/dates');


router.route('/new')
    .post(function(req, res) {
        var userId = req.body.userId;
        Account
            .find({
                where: {
                    id: userId
                }
            })
            .complete(function(err, account) {
                Campaign.create({
                    title: req.body.campaignTitle,
                    createDate: customDate.formatDate(Date.now()),
                    createTime: customDate.formatTime(Date.now()),
                    photo_count: 0,
                    photos: 0
                }).then(function(err, campaign) {
                    campaign.setAccount(userId).complete(function(err) {
                        campaign.getAccount().complete(function(err, _account) {
                            console.log(_account.values);
                            res.json({
                                cData: campaign,
                                ref: _account.values
                            });
                        });
                    });
                });
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

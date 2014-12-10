var express = require('express');
var router = express.Router();
var customDate = require('../custom_modules/dates');
var orm = require('../lib/model');

router.route('/new')
    .post(function(req, res) {
        var Account = orm.model('Account');
        var userId = req.body.userId;
        Account
            .find({
                where: {
                    id: userId
                }
            })
            .complete(function(err, account) {
                var Campaign = orm.model('Campaign');
                Campaign.create({
                    title: req.body.campaignTitle,
                    createDate: customDate.formatDate(Date.now()),
                    createTime: customDate.formatTime(Date.now()),
                    photo_count: 0,
                    photos: 0
                }).complete(function(err, campaign) {
		    campaign.setAccount(account).complete(function(){
                    	account.addCampaign(campaign).complete(function(err, account) {
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
    });

router.route('/:campaignId')
    .get(function(req, res) {
        var Campaign = orm.model('Campaign');
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

var express = require('express');
var router = express.Router()
var orm = require("../lib/model");

router.route('/:acctId')
    .get(function(req, res) {
        var Account = orm.model("Account");
        var acctId = req.param('acctId');
        Account
            .find({
                where: {
                    id: acctId
                }
            }).complete(function(err, account) {
                account.getCampaigns().complete(function(err, _campaigns){
		    var campaigns = [];
		    _campaigns.forEach(function(campaign){
			campaigns.push(campaign.dataValues);
		    });
                    res.json({
			account: account,
			campaigns: campaigns
		    });
                });
            });
    })

.post(function(req, res) {
    var Account = orm.model("Account");
    var acctId = req.param('acctId');
    var user = req.body;
    Account
        .findOrCreate({
            where: {
                id: acctId
            }
        })
        .spread(function(account, created) {
            if (created !== false) {
                account.username = user.username;
                account.name = user.fullName;
                account.email = user.email;
                account.save().then(function() {
                    Account.find({
                        where: {
                            id: acctId
                        }
                    }).then(function(account) {
                        res.json(account);
                    });
                });
            } else {
                res.json(account.dataValues);
            }
        });
})

module.exports = router;


var express = require('express');
var router = express.Router()

router.route('/:acctId')
    .get(function(req, res) {
        var acctId = req.param('acctId');
        Account
            .find({
                where: {
                    id: acctId
                }
            })
            .complete(function(account) {
                res.json(account);
            });
    })

.post(function(req, res) {
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
                account.setCampaign()
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

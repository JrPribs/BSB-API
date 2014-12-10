var express = require('express');
var router = express.Router()

router.route('/:userId')
    .get(function(req, res) {
        var userId = req.param('userId');
        var campaigns = false;
        var routes = false;
        Account.find({
            where: {
                id: userId
            }
        }).success(function(account) {
            res.json({
                user: account,
                campaigns: campaigns,
                routes: routes
            });
        });
    })

.post(function(req, res) {
    var userId = req.param('userId');
    var user = req.body;
    Account.findOrCreate({
        where: {
            id: userId
        }
    }).then(function(account, created) {
        if (created === true) {
            account.updateAttributes({
                username: user.username,
                name: user.fullName,
                email: user.email,
                campaigns: false,
                routes: false
            }).then(function(account) {
                Account.find({where: {id: userId}}).then(function(user){
                    res.json(user);
                });
            });
        } else {
            res.json(account);
        }
    });
})

module.exports = router;

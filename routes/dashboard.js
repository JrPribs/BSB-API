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
        console.log(req);
        var userId = req.param('userId');
        var campaigns = false;
        var routes = false;
        Account.findOrCreate({
            id: userId
        }).success(function(account, created) {
            res.json({
                user: account,
                campaigns: campaigns,
                routes: routes
            });
        });
    })

module.exports = router;

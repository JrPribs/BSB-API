var express = require('express');
var router = express.Router()
var _ = require('lodash');
var inspect = require('util');

router.route('/:user')
    .get(function(req, res) {
        var user = req.param('user');
        var campaigns = false;
        var routes = false;
        Account.find({
            where: {
                username: user
            }
        }).success(function(account) {
            res.json({
                user: account,
                campaigns: campaigns,
                routes: routes
            });
        });

    });

module.exports = router;



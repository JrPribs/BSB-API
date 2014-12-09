var express = require('express');
var router = express.Router()
var _ = require('lodash');
var inspect = require('util');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('bsb_api', 'bsb-api-admin', 'BSB0$$dbUser!', {
    dialect: 'mariadb'
});

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



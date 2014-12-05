var express = require('express');
var router = express.Router()
var _ = require('lodash');
var inspect = require('util');
var Sequelize = require('sequelize');


router.route('/:user')
    .get(function(req, res) {
        var user = req.params('user');
        var campaigns = false;
        var routes = false;
            res.json({
                user: user,
                campaigns: campaigns,
                routes: routes
            });
    });

module.exports = router;

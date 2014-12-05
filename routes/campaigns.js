var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var _ = require('lodash');
var Firebase = require('firebase');

router.route('/')
    .get(stormpath.loginRequired, function(req, res) {
        var user = res.locals.user;
        var userDataRef = new Firebase('https://vivid-fire-567.firebaseio.com/BSB/userStore/' + user.username);
        userDataRef.once("value", function(snapshot) {
            var acctData = snapshot.val()
            var campaigns = acctData.campaigns;
            if (campaigns !== null) {
                var keys = Object.keys(campaigns);
                var count = 0;
                keys.forEach(function(key) {
                    campaigns[key].id = key;
                    count++;
                    if (keys.length === count) {
                        res.send({
                            title: user.username + "'s DashBoard",
                            user: user.username,
                            campaigns: campaigns
                        });
                    }
                });
            } else {
                res.send({
                    title: user.username + "'s DashBoard",
                    user: user.username
                });
            }
        });
    });

module.exports = router;

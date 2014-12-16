var express = require('express');
var router = express.Router();
var orm = require('../lib/model');
var customDate = require('../custom_modules/dates');

router.route('/new')
    .post(function(req, res) {
        var userId = req.body.userId;
        var routeData = req.body['route'];
        var Account = orm.model('Account');
        Account.find({
            where: {
                id: userId
            }
        }).complete(function(err, account) {
            var Route = orm.model('Route');
            Route.create({
                title: routeData.title,
                create_date: customDate.formatDate(Date.now()),
                update_date: customDate.formatDate(Date.now())
            }).complete(function(err, route) {
                route.setAccount(account).complete(function(err) {
                    account.addRoute(route).complete(function(err) {
                        route.getAccount().complete(function(err, _account) {
                            if (routeData.fromCampaign === true) {
                                var Campaign = orm.model('Campaign');
                                Campaign.find({
                                    where: {
                                        id: routeData.campaignId
                                    }
                                }).complete(function(err, campaign) {
                                    route.addCampaign(campaign).complete(function(err) {
                                        campaign.addRoute(route).complete(function(err) {
                                            console.log(campaign);
                                        });
                                    });
                                });
                            }
                            res.json({
                                route: route,
                                account: _account.values,
                                styles: ['/stylesheets/routes.css'],
                                scripts: ['http://code.jquery.com/jquery-1.11.0.min.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCU42Wpv6BtNO51t7xGJYnatuPqgwnwk7c', '/javascripts/buildRoute.js']
                            });
                        });
                    });
                });
            });
        });
    });

router.route('/:routeId/points')
    .post(function(req, res) {
        var user = req.body.userId;
        var routeId = req.param('routeId');
        var pointCount = req.body.pointCount;
        var Route = orm.model('Route');
        Route.find({
            where: {
                id: routeId
            }
        }).complete(function(err, route) {
            for (var i = 1; i <= pointCount; i++) {
                var pointData = req.body[i];
                var Point = orm.model('Point');
                Point.create({
                    order: i,
                    comment: pointData.comment,
                    latitude: pointData.lat,
                    longitude: pointData.lng
                }).complete(function(err, point) {
                    point.setRoute(route).complete(function(err) {
                        route.addPoint(point).complete(function(err) {
                        });
                    });
                });
            }
            route.getAccount().complete(function(err, _account) {
                route.getPoints().complete(function(err, _points) {
                    res.send({
                        route: {
                            info: route,
                            points: _points.values
                        },
                        account: _account.values,
                        styles: ['/stylesheets/routes.css'],
                        scripts: ['http://code.jquery.com/jquery-1.11.0.min.js', 'http://open.mapquestapi.com/sdk/js/v7.2.s/mqa.toolkit.js?key=Fmjtd%7Cluurn90rnd%2C8a%3Do5-9wtn5f', '/javascripts/viewRoute-MapQuest.js']
                    });
                });
            });
        });
    })

.get(function(req, res) {
    var routeId = req.param('routeId');
    var Route = orm.model('Route');
    Route.find({
        where: {
            id: routeId
        }
    }).complete(function(err, route) {
        route.getAccount(function(err, _account) {
            route.getPoints().complete(function(err, _points) {
                res.json({
                    route: {
                        info: route,
                        points: _points.values
                    },
                    account: _account.values,
                    styles: ['/stylesheets/routes.css'],
                    scripts: ['http://code.jquery.com/jquery-1.11.0.min.js', 'http://open.mapquestapi.com/sdk/js/v7.2.s/mqa.toolkit.js?key=Fmjtd%7Cluurn90rnd%2C8a%3Do5-9wtn5f', '/javascripts/viewRoute-MapQuest.js']
                });
            });
        });
    });
});

module.exports = router;

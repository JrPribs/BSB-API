var express = require('express');
var router = express.Router();
var stormpath = require('express-stormpath');
var _ = require('lodash');
var Firebase = require('firebase');


// get campaign moved

router.get('/:campaignId/view-map', stormpath.loginRequired, function(req, res) {
    var user = res.locals.user.username;
    var campaignId = req.param('campaignId');
    var campaignRef = new Firebase('https://vivid-fire-567.firebaseio.com/BSB/userStore/' + user + '/campaigns/' + campaignId);
    campaignRef.once("value", function(snapshot) {
        var campaignData = snapshot.val();
        res.render('viewMap', {
            user: user,
            view: true,
            campaign: campaignData,
            scripts: ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCU42Wpv6BtNO51t7xGJYnatuPqgwnwk7c', '/javascripts/getPoints.js']
        });
    });
});

router.post('/:campaignId/routes/new-route', stormpath.loginRequired, function(req, res) {
    var user = res.locals.user.username;
    var campaignId = req.param('campaignId');
    var routeTitle = req.body['route-title'];
    var mainRoutes = new Firebase('https://vivid-fire-567.firebaseio.com/BSB/userStore/' + user + '/routes');
    var newRoute = mainRoutes.push({
        title: routeTitle
    });
    var routeKey = newRoute.key();
    mainRoutes.child(routeKey).update({
        id: routeKey
    });
    mainRoutes.once('value', function(snapshot) {
        var routeData = snapshot.val();
        var routesRef = new Firebase('https://vivid-fire-567.firebaseio.com/BSB/userStore/' + user + '/campaigns/' + campaignId + '/routes');
        routesRef.push(routeData);
        res.render('buildRoute', {
            title: routeTitle + ' Route',
            user: user,
            campaignId: campaignId,
            route: routeData,
            styles: ['/stylesheets/routes.css'],
            scripts: ['http://code.jquery.com/jquery-1.11.0.min.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCU42Wpv6BtNO51t7xGJYnatuPqgwnwk7c', '/javascripts/buildRoute.js']
        });
    });
});

router.post('/:campaignId/routes/:routeId/view-route', stormpath.loginRequired, function(req, res) {
    var user = res.locals.user.username;
    var campaignId = req.param('campaignId');
    var routeId = req.param('routeId');
    var points = [];
    var pointCount = req.body.pointCount;
    for (var i = 1; i <= pointCount; i++) {
        points.push(req.body[i]);
    }
    var routesRef = new Firebase('https://vivid-fire-567.firebaseio.com/BSB/userStore/' + user + '/campaigns/' + campaignId + '/routes/' + routeId);
    routesRef.set({
        points: points
    });
    var routeRef = new Firebase('https://vivid-fire-567.firebaseio.com/BSB/userStore/' + user + '/campaigns/' + campaignId + '/routes');
    routeRef.orderByChild('id').equalTo(routeId).once('value', function(snapshot) {
        var data = snapshot.val();
        var key = data.key();
        routeRef.child(key).set({
            points: points
        });
        res.render('viewRoute', {
            user: user,
            campaignId: campaignId,
            routeId: routeId,
            points: points,
            styles: ['/stylesheets/routes.css'],
            scripts: ['http://code.jquery.com/jquery-1.11.0.min.js', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCU42Wpv6BtNO51t7xGJYnatuPqgwnwk7c', '/javascripts/viewRoute.js']
        });
    });
});

module.exports = router;

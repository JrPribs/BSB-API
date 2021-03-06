var _ = require('lodash');
var util = require('util');
var fs = require('fs');
var im = require('imagemagick');

exports.processData = function(req, res, next) {

    function gatherImages(files, callback) {

        //accept single image upload
        if (!_.isArray(files)) {
            files = [files];
        }

        var uploads = [];
        var count = 0;
        files.forEach(function(file) {

            fs.exists(file.path, function(exists) {
                if (exists) {
                    var caption = req.body[file.originalname];
                    var path = file.path;
                    var upFile = file.name;
                    uploads.push({
                        file: upFile,
                        imgPath: path,
                        caption: caption || 'no comment'
                    });
                    count++;
                }
                if (files.length === count) {
                    callback(uploads);
                }
            });

        });

    }

    function getGeoLoc(path, callback) {
        im.readMetadata('./' + path, function(error, metadata) {
            var geoCoords = false;
            if (error) throw error;

            if (metadata.exif.gpsLatitude && metadata.exif.gpsLatitudeRef) {
                var lat = getDegrees(metadata.exif.gpsLatitude.split(','));
                var latRef = metadata.exif.gpsLatitudeRef;
                if (latRef === 'S') {
                    lat = lat * -1;
                }
                var lng = getDegrees(metadata.exif.gpsLongitude.split(','));
                var lngRef = metadata.exif.gpsLongitudeRef;
                if (lngRef === 'W') {
                    lng = lng * -1;
                }
                var coordinate = {
                    lat: lat,
                    lng: lng
                };
                geoCoords = coordinate.lat + ' ' + coordinate.lng;
            }
            callback(geoCoords);
        });
    }

    function getDegrees(lat) {
        var degrees = 0;
        for (var i = 0; i < lat.length; i++) {
            var cleanNum = lat[i].replace(' ', '');
            var parts = cleanNum.split('/');
            var coord = parseInt(parts[0]) / parseInt(parts[1]);
            if (i == 1) {
                coord = coord / 60;
            } else if (i == 2) {
                coord = coord / 3600;
            }
            degrees += coord;
        }
        return degrees.toFixed(6);
    }

    function processImages(uploads, callback) {
        var finalImages = [];
        var count = 0;
        uploads.forEach(function(upload) {
            var path = upload.imgPath;
            getGeoLoc(path, function(geoCoords) {
                upload.coords = geoCoords;
                finalImages.push(upload);
                count++;
                if (uploads.length === count) {
                    callback(finalImages);
                }
            });
        });
    }


    if (req.files) {
        if (req.files.size === 0) {
            return next(new Error("Why didn't you select a file?"));
        }

        gatherImages(req.files.imageFiles, function(uploads) {
            processImages(uploads, function(finalImages) {
                req.finalImages = finalImages;
                req.campaignId = req.param('campaignId');
                next();
            });
        });
    }

}

exports.resizeImages = function(req, res, next) {
    var images = req.finalImages;
    var count = 0;
    images.forEach(function(image) {
        var fullPath = image.imgPath.replace('.jpg', '-full.jpg');
        var thumbPath = image.imgPath.replace('.jpg', '-thumb.jpg');
        im.resize({
            srcPath: './' + image.imgPath,
            dstPath: './' + thumbPath,
            width: 150
        }, function(err, stdout, stderr) {
            if (err) throw err;
            im.resize({
                srcPath: './' + image.imgPath,
                dstPath: './' + fullPath,
                width: 800
            }, function(err, stdout, stderr) {
                if (err) throw err;
                image.thumb = thumbPath.replace('public/images/', '');
                image.file = fullPath.replace('public/images/', '');
                count++;
                if (images.length === count) {
                    next();
                }
            });
        });
    });
}

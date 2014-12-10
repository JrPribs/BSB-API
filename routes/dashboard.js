var express = require('express');
var router = express.Router()
var models =  require('../models');

router.route('/:acctId')
    .get(function(req, res) {
        var acctId = req.param('acctId');
        models.Account
            .find({
                where: {
                    id: acctId
                },
                include: [models.Campaign]
            })
            .complete(function(account) {
                res.json(account);
            });
    })

.post(function(req, res) {
    var acctId = req.param('acctId');
    var user = req.body;
    models.Account
        .findOrCreate({
            where: {
                id: acctId
            },
            include: [models.Campaign]
        })
        .spread(function(account, created) {
            if (created !== false) {
                account.username = user.username;
                account.name = user.fullName;
                account.email = user.email;
                account.save().then(function() {
                    models.Account.find({
                        where: {
                            id: acctId
                        },
                        include: [ models.Campaign ]
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

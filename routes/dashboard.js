var express = require('express');
var router = express.Router()

router.route('/:userId')
    .get(function(req, res) {
        var userId = req.param('userId');
        Account.find({
            where: {
                id: userId
            }
        }).success(function(account) {
            res.json(account);
        });
    })

.post(function(req, res) {
    var userId = req.param('userId');
    var user = req.body;
    Account.findOrCreate({
        where: {
            id: userId
        }
    }).spread(function(account, created) {
        if (created !== false) {
            account.username = user.username;
            account.name = user.fullName;
            account.email = user.email;
            account.save().then(function() {
                Account.find({
                    where: {
                        id: userId
                    }
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

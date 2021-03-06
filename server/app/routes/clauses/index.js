'use strict';
var router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;
var db = require('../../../db');
var Clause = db.model('swift_clause')
var ensureAuthenticated = function(req, res, next) {
    var err;
    if (req.isAuthenticated()) {
        next();
    } else {
        err = new Error('You must be logged in.');
        err.status = 401;
        next(err);
    }
};

//fetches

router.get('/', ensureAuthenticated, (req, res, next) => {
    Clause.findAll({
        where: req.query,
        order: [
            ['id', 'ASC']
        ]
    }).then(countries => {
        res.json(countries)
    }).catch(err => {
        next(err)
    })
})

router.get('/:id', ensureAuthenticated, (req, res, next) => {

})

//end fetches

//sets
router.post('/', ensureAuthenticated, (req, res, next) => {
    Clause.create(req.body).then(createdClause => {
        res.json(createdClause)
    }).catch(err => {
        next(err)
    })
})

//end sets

//updates

router.put('/', ensureAuthenticated, (req, res, next) => {

})

//end updates

//deletes

router.delete('/', ensureAuthenticated, (req, res, next) => {

})

//end deletes
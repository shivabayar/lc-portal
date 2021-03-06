'use strict';
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('bank', {
    name: {
        type: Sequelize.STRING,
    },
    primary_email: {
        type: Sequelize.STRING
    },
    secondary_email: {
        type: Sequelize.STRING
    }
});
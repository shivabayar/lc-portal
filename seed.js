var chalk = require('chalk');
var db = require('./server/db');
var Letter = db.model('letter')
var fs = require('fs')
var path = require('path')
var Promise = require('sequelize').Promise;
var parse = require('csv-parse');
var sample = path.join(__dirname, '/sample.csv')

var csvData = []

fs.createReadStream(sample)
    .pipe(parse({
        delimiter: ':'
    }))
    .on('data', csvrow => {
        csvData.push(csvrow)
    })
    .on('end', () => {
        organizeData(csvData)
    })

var organizeData = csvData => {
    var countries = {
        'Bangladesh': 1,
        'Nepal': 2,
        'Sri Lanka': 3,
        'India': 4,
        'Bhutan': 5
    }
    var users = {
        JENY: 1,
        THINHA: 2,
        ANURAG: 3,
        SURYA: 4,
        SANJEEV: 5,
        NAVDEEP: 6,
        GAURAV: 7,
        VIPIN: 8,
        SHEETAL: 9
    }
    var headers = csvData.shift()
    csvData.pop()
    csvData.forEach(row => {
        columns = row[0].split(',')
        var letterToBeCreated = {
            bank: columns[0],
            date: new Date(columns[1]),
            contract: columns[2],
            lc_number: columns[3],
            country: countries[columns[4]],
            pic: users[columns[5]],
            csp: users[columns[6]],
            state: Math.floor(Math.random() * 4) + 1,
            draft: false

        }

        Letter.create(letterToBeCreated)
    })
}
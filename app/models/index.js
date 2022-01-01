const issuesModel = require('./issue.model.js')
const dbConfig = require('../config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.issues = issuesModel.create(mongoose);

module.exports = db;
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/daily');

module.exports = mongoose;
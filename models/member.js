
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/daily');

var Member = mongoose.model('Member', {
	name: String
});

module.exports = Member;
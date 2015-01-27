
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Member = mongoose.model('Member', {
	name: String
});

module.exports = Member;
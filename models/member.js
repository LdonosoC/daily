var mongoose = require('../lib/mongoose');

var Member = mongoose.model('Member', {
	name: String,
	email: String,
	login: String
});

module.exports = Member;
var mongoose = require('../lib/mongoose');

var Task = mongoose.model('Task', {
	title: String,
	slug: String,
	member: String
});

module.exports = Task;
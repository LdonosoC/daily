var mongoose = require('../lib/mongoose');

var Task = mongoose.model('Task', {
	title: String,
	member: String
});

module.exports = Task;
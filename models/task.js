var mongoose = require('../lib/mongoose');

var Task = mongoose.model('Task', {
	title: String
});

module.exports = Task;
var Task 	= require('../models/task');
var Member 	= require('../models/member');
var Q 		= require('q');

var ctrl = {
	create: function (req, res) {
		var login, title;

		login = req.body.login;
		title = req.body.title;

		var memberPromise = Member.findOne({login: req.body.login}).exec();

		memberPromise.then(function (member) {
			var task = new Task({
				title: title,
				member: member._id
			});

			return task.savePromise();
		}).then(function (task) {
			return res.status(201).json(task);
		});
	},

	index: function (req, res) {
		var query, login, status;

		query  	 = {};
		login    = req.query.login || null;
		status   = req.query.status || null;

		if (login) {
			login = Member.findOne({login: login}).exec();
		}

		Q.spread([login, status], function (member, status) {
			if (member) {
				query.member = member._id;
			}

			query.status = status;

			return Task.find(query).exec();
		}).then(function (tasks) {
			res.json(tasks);
		});
	},

	show: function (req, res) {
	},

	save: function (req, res) {
	},

	delete: function (req, res) {
	},
};

module.exports = ctrl;
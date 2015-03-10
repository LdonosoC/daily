var Task 	= require('../models/task');
var Member 	= require('../models/member');
var Q 		= require('q');

var ctrl = {
	create: function (req, res) {
		var login, title;

		login = req.body.login;
		title = req.body.title;

		Member.findOne({login: req.body.login}, function (err, member) {
			if (err || member === null) {
				console.log('error', err);
				return res.status(500).end();
			}

			var task = new Task({
				title: title,
				member: member._id
			});

			task.save(function (err) {
				if (err) {
					console.log(err);
					return res.end();
				}

				return res.status(201).json(task);
			});
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

			Task.find(query, function (err, tasks) {
				if (err) {
					console.log('error', err);
					return res.end();
				}

				res.json(tasks);
			});
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
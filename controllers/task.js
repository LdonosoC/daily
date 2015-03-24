var Task 	= require('../models/task');
var Member 	= require('../models/member');
var Q 		= require('q');
var slug 	= require('slug');
var shortid	= require('shortid');

var ctrl = {
	create: function (req, res) {
		var login, title;

		login = req.body.login;
		title = req.body.title;

		var memberPromise = Member.findOne({login: req.body.login}).exec();

		memberPromise.then(function (member) {
			var taskSlug = slug(title + '-' + shortid.generate());

			var task = new Task({
				title: title,
				slug: taskSlug.toLowerCase(),
				member: member._id
			});

			return task.savePromise();
		}).then(function (task) {
			return res.status(201).json(task);
		}).then(null, function (err) {
			console.log(err);
			return res.status(500).end();
		})
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
		var taskSlug = req.params.task;

		var promise = Task.findOne({slug: taskSlug}).exec();

		promise.then(function (task) {
			res.json(task);
		}, function (err) {
			res.status(404).end();
		});
	},

	save: function (req, res) {
	},

	delete: function (req, res) {
	},
};

module.exports = ctrl;
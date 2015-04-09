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
			setTimeout(function () {
				res.json(task);
			}, 10 * 1000);
		}, function (err) {
			res.status(404).end();
		});
	},

	save: function (req, res) {
		// 1. buscar que la tarea efectivamente exista
		// 2. recuperamos el title
		// 3. miramos el si ha cambiado el titulo
		// 4. actualizamos el titulo
		// 5. devolvemos
		var taskSlug = req.params.task;

		var promise = Task.findOne({slug: taskSlug}).exec();

		promise.then(
			// if task exists
			function (task) {
				var title = req.body.title;

				if (title === task.title) {
					return res.json(task);
				}

				task.title = title;
				return task.savePromise();
			},

			// when task is not found
			function (err) {
				res.status(404).end();
			}
		).then(
			// if tasks was updated successfully
			function (task) {
				res.json(task);
			},

			// when task cannot be saved
			function (err) {
				res.status(500).end();
			}
		);
	},

	delete: function (req, res) {
		var taskSlug = req.params.task;

		Task.findOneAndRemove({slug: taskSlug}, function (err, task) {
			if (err) {
				console.log(err);
				return res.status(500).end();
			}

			if (!task) {
				return res.status(404).end();
			}

			return res.end();
		});
	},
};

module.exports = ctrl;
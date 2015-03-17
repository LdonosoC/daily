var Member  = require('../models/member');
var is 		= require('../lib/is');

var ctrl = {
	create: function (req, res) {
		if (true !== is.email(req.body.email)) {
			return res.status(400).end();
		}

		if (true !== is.username(req.body.login)) {
			return res.status(400).end();
		}

		var query = Member.findOne();

		query.or([
			{ email: req.body.email },
			{ login: req.body.login }
		]);

		query.exec(function (err, member) {
			if (err) {
				console.log('error', err);
				return res.status(500).end();
			}

			if (member) {
				// ya existe!
				return res.status(409).end();
			}

			var member = new Member({
				name: req.body.name,
				email: req.body.email,
				login: req.body.login
			});

			member.save(function (err) {
				if (err) {
					console.log(err);
					return res.end();
				}

				return res.status(201).json(member);
			});
		});
	},

	index: function (req, res) {
		Member.find({}, function (err, members) {
			if (err) {
				console.log('error', err);
				return res.end();
			}

			res.json(members);
		});
	},

	show: function (req, res) {
		var login = req.params.member;

		Member.findOne({'login': login}, function (err, member) {
			if (err) {
				console.log('error', err);
				return res.end();
			}

			res.json(member);
		});
	},

	save: function (req, res) {
		var login = req.params.member;
		var email = req.body.email;

		if (true !== is.email(email)) {
			return res.status(400).end();
		}

		var member = Member.findOne({email: email}).exec();
		member.then(function (member) {
			if (member) {
				if (member.login === login) {
					return res.end();
				}

				return res.status(409).end();
			}

			return Member.findOneAndUpdate({login: login}, {email: email}).exec();
		}).then(function (member) {
			if (!member) {
				return res.status(404).end();
			}

			res.json(member);
		})
	},

	delete: function (req, res) {
		var login = req.params.member;

		Member.findOneAndRemove({"login": login}, function (err, member) {
			if (err) {
				console.log('error', err);
				return res.status(500).end();
			}

			if (!member) {
				return res.status(404).end();
			}

			res.end();
		})
	},
};

module.exports = ctrl;
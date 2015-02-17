var Member = require('../models/member');

var ctrl = {
	create: function (req, res) {
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

			return res.json(member);
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
		var data = req.body;

		var member = new Member({
			name: data.name
		});

		member.save(function (err) {
			if (err) {
				console.log(err);
				res.error(500);
			}

			res.end(member._id);
		});
	},

	delete: function (req, res) {
		var member = req.params.member;
		res.json('member delete ' + member);
	},
};

module.exports = ctrl;
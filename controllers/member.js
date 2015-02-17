var Member = require('../models/member');

var ctrl = {
	create: function (req, res) {
		var member = new Member({
			name: req.body.name,
			email: req.body.email
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
		res.json([]);
	},

	show: function (req, res) {
		var member = req.params.member;
		res.json({name: member});
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
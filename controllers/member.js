var Member = require('../models/member');

var ctrl = {
	create: function (req, res) {

	},

	index: function (req, res) {
		res.json([]);
	},

	show: function (req, res) {
		var member = req.params.member;
		res.json({name: member});
	},

	save: function (req, res) {
		var member 	= req.params.member;
		var data = req.body;

		var member = new Member({
			name: "Jose"
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
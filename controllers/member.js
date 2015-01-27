var ctrl = {

	index: function (req, res) {
		res.json([]);
	},

	show: function (req, res) {
		var member = req.params.member;
		res.json({name: member});
	},

	save: function (req, res) {
		var member 	= req.params.member;
		var data 	= req.body;
		res.json('member save ' + member);
	},

	delete: function (req, res) {
		var member = req.params.member;
		res.json('member delete ' + member);
	},
};

module.exports = ctrl;
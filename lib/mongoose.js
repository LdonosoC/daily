var mongoose = require('mongoose');
var Q 		 = require('q');

mongoose.connect('mongodb://localhost/daily');

mongoose.Document.prototype.savePromise = function () {
    var that = this;
    return Q.Promise(function(resolve, reject) {
        that.save(function (err, item, numberAffected) {
            if (err) {
                return reject(err);
            }

            resolve(item);
        });
    });
};

module.exports = mongoose;
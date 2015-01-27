var app = require('../app');
var ctrl = require('../controllers/member');

console.log('loading route member');
app.get('/member', ctrl.index);
app.get('/member/:member', ctrl.show);
app.post('/member/:member', ctrl.save);
app.delete('/member/:member', ctrl.delete);
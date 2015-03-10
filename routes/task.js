var app = require('../app');
var ctrl = require('../controllers/task');

console.log('loading route task');
app.post('/task', ctrl.create);
app.get('/task', ctrl.index);
app.get('/task/:task', ctrl.show);
app.post('/task/:task', ctrl.save);
app.delete('/task/:task', ctrl.delete);
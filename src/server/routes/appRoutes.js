module.exports = function(app) {
  var controller = require('../controller/appController')
  var path = require('path');

//usage root path
  app.route('/usage')
    .post(controller.post_new_application);

  app.route('/')
    .get(function (req, res) {
      res.sendFile(path.join(__dirname, 'index.html'));
    })
}

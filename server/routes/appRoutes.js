module.exports = function(app) {
  var controller = require('../controller/appController')

//usage root path
  app.route('/usage')
    .post(controller.post_new_application);
}

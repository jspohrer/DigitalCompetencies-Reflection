module.exports = function(app) {
  var controller = require('../controller/appController')
  var path = require('path');

//usage root path
  app.route('/usage')
    .post(controller.post_new_application);

  app.route('/')
    .get(function (req, res) {
      res.sendFile(path.join(__dirname, 'index.html'));
        //var thisClient = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 19);
        //res.cookie('clientId', thisClient).send('cookie set');
        //res.status(200).json({success: 'success'});
    })
}

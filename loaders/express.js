const bodyParser = require('body-parser');
const cors = require('./cors');
const logger = require('morgan');
const compression = require('compression');
const routes = require ('../routes');

module.exports = ({ app }) => {
  app.use(compression());
  app.use(logger('dev'));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ limit: '5mb', extended: false }));
  app.use(cors());
  app.use('/', routes);
}

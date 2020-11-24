const expressLoader = require('./express');
require('./logger');

exports.default = ({ app }) => {
  expressLoader({ app });
}

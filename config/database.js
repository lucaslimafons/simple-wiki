require('dotenv').config();

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'wiki.sqlite'
  },
  test: {
    dialect: 'sqlite',
    storage: 'wiki_test.sqlite'
  },
  production: {
    dialect: 'sqlite',
    storage: 'wiki.sqlite'
  }
}

'use strict';

const moment = require('moment');
const file = require('../../gistfile1.json');

module.exports = {
  up: (queryInterface, Sequelize) => {
    let listAcronym = [];
    for (let abbrev of file) {
      let [abbreviation, text] = Object.entries(abbrev)[0];
      listAcronym.push({ created_at: moment().format('YYYY-MM-DD'), abbreviation, text });
    }

    return queryInterface.bulkInsert('acronym', listAcronym);
  },

  down: (queryInterface, Sequelize) => {
  }
};

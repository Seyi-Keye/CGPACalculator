module.exports = function () {
  var faker = require('faker');
  var _ = require('lodash');
  return {
    'members': _.times(100, (n) => {
      return {
        id: n,
      name: faker.name.findName(),
      avatar: faker.internet.avatar()
    }
    })
  };
};
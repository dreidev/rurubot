const app = require(`../app.js`);
// const config = require('../config/config');
const {clearDB} = require(`./setup.js`);
// const mongoose = require(`mongoose`);
const assert = require(`chai`).assert;

const test = require(`supertest-as-promised`)(require(`bluebird`))(app);

// eslint-disable-next-line
describe(`Post API`, function() {
  // eslint-disable-next-line
  before(clearDB);
  // eslint-disable-next-line
  describe(`Daily Tasks Retrieval`, () => {
    // eslint-disable-next-line
    it(`should return a list of daily tasks`, done => {
      test.get(`/api/daily-tasks`)
      // .set('Authorization', `JWT ${token}`)
        .expect(200).then(({body}) => {
        assert.isArray(body);
        // assert.equal(body[0].title, title)
      }). finally(done);
    });
  });
});

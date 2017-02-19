const app = require(`../app.js`);
// const config = require('../config/config');
const {clearDB} = require(`./setup.js`);
// const mongoose = require(`mongoose`);
const assert = require(`chai`).assert;

const test = require(`supertest`)(app);

// eslint-disable-next-line
describe(`Daily Tasks API`, function() {
  // eslint-disable-next-line
  before(clearDB);
  // eslint-disable-next-line
  before((done) => {
  let user_id = `U0U05G6JZ`;
  let tasks = [{description: 'dreidev admin system'}];
  test.post(`/api/daily-tasks`).send({
      user_id,
      tasks,
    })
  .then(() => {
    done();
  }).catch();
});
  // eslint-disable-next-line
  describe(`Daily Tasks Retrieval`, () => {
    // eslint-disable-next-line
    it(`should return a list of daily tasks`, () => {
      return test.get(`/api/daily-tasks`)
        .expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].tasks[0].description, 'dreidev admin system');
      });
    });
  });
});

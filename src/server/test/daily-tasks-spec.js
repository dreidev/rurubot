const app = require(`../app.js`);
const {clearDB} = require(`./setup.js`);
const assert = require(`chai`).assert;

const test = require(`supertest`)(app);

describe(`Daily Tasks API`, function() {
  before(clearDB);
  before((done) => {
    let user_id = `U0U05G6JZ`;
    let tasks = [
      {
        description: 'dreidev admin system',
      },
    ];
    test.post(`/api/daily-tasks`).send({user_id, tasks}).then(() => {
      done();
    }).catch();
  });
  describe(`Daily Tasks Retrieval`, () => {
    it(`should return a list of daily tasks`, () => {
      return test.get(`/api/daily-tasks`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].tasks[0].description, 'dreidev admin system');
      });
    });
    it(`should return a list of daily tasks belonging to the user`, () => {
      return test.get(`/api/daily-tasks/user/U0U05G6JZ`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].user_id, 'U0U05G6JZ');
      });
    });
  });
});

const app = require(`../app.js`);
// const config = require('../config/config');
const {clearDB} = require(`./setup.js`);
// const mongoose = require(`mongoose`);
const assert = require(`chai`).assert;

const test = require(`supertest`)(app);

// eslint-disable-next-line
describe(`Grocery List API`, function() {
  // eslint-disable-next-line
  let _id;
  // eslint-disable-next-line
  before(clearDB);
  // eslint-disable-next-line
  before((done) => {
    let name = 'fanart';
    let category = `web`;
    let client = `Min Young`;
    test.post(`/api/project`).send({name, category, client}).then((res) => {
      _id = res.body;
      done();
    }).catch();
  });
  // eslint-disable-next-line
  describe(`Projects Retrieval`, () => {
    // eslint-disable-next-line
    it(`should return a list of projects`, () => {
      return test.get(`/api/projects`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].name, 'fanart');
      });
    });
  });
  // eslint-disable-next-line
  describe(`Projects Retrieval by name)`, () => {
    // eslint-disable-next-line
    it(`should return a list of projects by name`, () => {
      return test.get(`/api/project/name/fanart`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].name, 'fanart');
      });
    });
  });
  // eslint-disable-next-line
  describe(`Project Retrieval by id)`, () => {
    // eslint-disable-next-line
    it(`should return a project by id`, () => {
      return test.get(`/api/project/${_id}`).expect(200).then(({body}) => {
        assert.equal(body.name, 'fanart');
      }).catch();
    });
  });
});

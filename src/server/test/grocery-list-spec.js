const app = require(`../app.js`);
// const config = require('../config/config');
const {clearDB} = require(`./setup.js`);
// const mongoose = require(`mongoose`);
const assert = require(`chai`).assert;

const test = require(`supertest`)(app);

// eslint-disable-next-line
describe(`Grocery List API`, function() {
  // eslint-disable-next-line
  before(clearDB);
  // eslint-disable-next-line
  describe(`Grocery List Retrieval`, () => {
    // eslint-disable-next-line
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = ['milk'];
      test.post(`/api/grocery-list`).send({
        user_id,
        name,
      })
      .then(() => {
        done();
      }).catch();
    });
    // eslint-disable-next-line
    it(`should return a list of grocery list items`, () => {
      return test.get(`/api/grocery-list`)
        .expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].name, 'milk');
      });
    });
  });
  // eslint-disable-next-line
  describe(`Daily Tasks Retrieval (not checked)`, () => {
    // eslint-disable-next-line
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = ['milk'];
      test.post(`/api/grocery-list`).send({
        user_id,
        name,
      })
      .then(() => {
        done();
      }).catch();
    });
    // eslint-disable-next-line
    it(`should return a list of unchecked grocery list items`, () => {
      return test.get(`/api/grocery-list/state/notChecked`)
        .expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].name, 'milk');
      });
    });
  });
  // eslint-disable-next-line
  describe(`Daily Tasks Retrieval ( checked)`, () => {
    // eslint-disable-next-line
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = ['milk'];
      let state = 'checked';
      test.post(`/api/grocery-list`).send({
        user_id,
        name,
        state,
      })
      .then(() => {
        done();
      }).catch();
    });
    // eslint-disable-next-line
    it(`should return a list of unchecked grocery list items`, () => {
      return test.get(`/api/grocery-list/state/checked`)
        .expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].name, 'milk');
      });
    });
  });
});

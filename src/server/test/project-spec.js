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
      let name = 'milk';
      test.post(`/api/grocery-list`).send({user_id, name}).then(() => {
        done();
      }).catch();
    });
    // eslint-disable-next-line
    it(`should return a list of grocery list items`, () => {
      return test.get(`/api/grocery-list`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].name, 'milk');
      });
    });
  });
  // eslint-disable-next-line
  describe(`Daily Tasks Retrieval by state (not checked)`, () => {
    // eslint-disable-next-line
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = 'milk';
      test.post(`/api/grocery-list`).send({user_id, name}).then(() => {
        done();
      }).catch();
    });
    // eslint-disable-next-line
    it(`should return a list of unchecked grocery list items`, () => {
      return test.get(`/api/grocery-list/state/notChecked`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].state, 'notChecked');
      });
    });
  });
  // eslint-disable-next-line
  describe(`Daily Tasks Retrieval by state (checked)`, () => {
    // eslint-disable-next-line
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = 'milk';
      let state = 'checked';
      test.post(`/api/grocery-list`).send({user_id, name, state}).then(() => {
        done();
      }).catch();
    });
    // eslint-disable-next-line
    it(`should return a list of checked grocery list items`, () => {
      return test.get(`/api/grocery-list/state/checked`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].state, 'checked');
      });
    });
  });
  // eslint-disable-next-line
  describe(`Daily Tasks Retrieval by User`, () => {
    // eslint-disable-next-line
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = 'milk';
      let state = 'checked';
      test.post(`/api/grocery-list`).send({user_id, name, state}).then(() => {
        done();
      }).catch();
    });
    // eslint-disable-next-line
    it(`should return a list of grocery list items by user`, () => {
      return test.get(`/api/grocery-list/user/U0U05G6JZ`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].user_id, 'U0U05G6JZ');
      });
    });
  });
  // eslint-disable-next-line
  describe(`Daily Tasks Update`, () => {
    let _id;
    // eslint-disable-next-line
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = 'milk';
      test.post(`/api/grocery-list`).send({user_id, name}).then((res) => {
        _id = res.body;
        done();
      }).catch();
    });
    // eslint-disable-next-line
    it(`should update the state of the grocery list item to checked`, () => {
      return test.put(`/api/grocery-list/${_id}/check`).expect(200);
    });
    // eslint-disable-next-line
    it(`should update the state of the grocery list item to unchecked`, () => {
      return test.put(`/api/grocery-list/${_id}/uncheck`).expect(200);
    });
  });
});

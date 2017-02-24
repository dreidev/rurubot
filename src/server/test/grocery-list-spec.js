const app = require(`../app.js`);
const {clearDB} = require(`./setup.js`);
const assert = require(`chai`).assert;

const test = require(`supertest`)(app);

describe(`Grocery List API`, function() {
  before(clearDB);
  describe(`Grocery List Retrieval`, () => {
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = ['milk'];
      test.post(`/api/grocery-list`).send({user_id, name}).then(() => {
        done();
      }).catch();
    });
    it(`should return a list of grocery list items`, () => {
      return test.get(`/api/grocery-list`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].name, 'milk');
      });
    });
  });
  describe(`Daily Tasks Retrieval by state (not checked)`, () => {
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = ['milk'];
      test.post(`/api/grocery-list`).send({user_id, name}).then(() => {
        done();
      }).catch();
    });
    it(`should return a list of notChecked grocery list items`, () => {
      return test.get(`/api/grocery-list/state/notChecked`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].state, 'notChecked');
      });
    });
  });
  describe(`Daily Tasks Retrieval by state (checked)`, () => {
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = ['milk'];
      let state = 'checked';
      test.post(`/api/grocery-list`).send({user_id, name, state}).then(() => {
        done();
      }).catch();
    });
    it(`should return a list of checked grocery list items`, () => {
      return test.get(`/api/grocery-list/state/checked`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].state, 'checked');
      });
    });
  });
  describe(`Daily Tasks Retrieval by User`, () => {
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = ['milk'];
      let state = 'checked';
      test.post(`/api/grocery-list`).send({user_id, name, state}).then(() => {
        done();
      }).catch();
    });
    it(`should return a list of grocery list items by user`, () => {
      return test.get(`/api/grocery-list/user/U0U05G6JZ`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].user_id, 'U0U05G6JZ');
      });
    });
  });
  describe(`Daily Tasks Update`, () => {
    let _id;
    before((done) => {
      let user_id = `U0U05G6JZ`;
      let name = ['milk'];
      test.post(`/api/grocery-list`).send({user_id, name}).then((res) => {
        _id = res.body;
        done();
      }).catch();
    });
    it(`should update the state of the grocery list item to checked`, () => {
      return test.put(`/api/grocery-list/${_id}/check`).expect(200);
    });
    it(`should update the state of the grocery list item to notChecked`, () => {
      return test.put(`/api/grocery-list/${_id}/uncheck`).expect(200);
    });
  });
});

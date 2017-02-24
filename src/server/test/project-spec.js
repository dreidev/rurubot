const app = require(`../app.js`);
const {clearDB} = require(`./setup.js`);
const assert = require(`chai`).assert;

const test = require(`supertest`)(app);

describe(`Grocery List API`, function() {
  let _id;
  before(clearDB);
  before((done) => {
    let name = 'fanart';
    let category = `web`;
    let client = `Min Young`;
    test.post(`/api/project`).send({name, category, client}).then((res) => {
      _id = res.body;
      done();
    }).catch();
  });
  describe(`Projects Retrieval`, () => {
    it(`should return a list of projects`, () => {
      return test.get(`/api/projects`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].name, 'fanart');
      });
    });
  });
  describe(`Projects Retrieval by name)`, () => {
    it(`should return a list of projects by name`, () => {
      return test.get(`/api/project/name/fanart`).expect(200).then(({body}) => {
        assert.isArray(body);
        assert.equal(body[0].name, 'fanart');
      });
    });
  });
  describe(`Project Retrieval by id)`, () => {
    it(`should return a project by id`, () => {
      return test.get(`/api/project/${_id}`).expect(200).then(({body}) => {
        assert.equal(body.name, 'fanart');
      }).catch();
    });
  });
});

const assert = require(`chai`).assert;
const app = require(`../app.js`);
// const config = require(`../../config/config.js`);
const {clearDB} = require(`./setup.js`);
// const {createAUser} = require('./utils');
// const mongoose = require(`mongoose`);
const test = require(`supertest`)(app);
const User = require(`../../models/user`);

describe(`User API`, function() {
  before(clearDB);
  let name = `drazious`;
  let email = `amr.m.draz@gmail.com`;
  let password = `12345`;
  let slack_id = `U0U05G6JY`;
  let token;
  before((done) => {
    User.create({
      slack_id: 'U0U05G6JZ',
      slack_team_id: 'T04NXFZPN',
      email: 'ahmed.tokyo1@gmail.com',
      password: '123456',
      name: 'tokyo',
      deleted: false,
      real_name: 'Ahmed Tokyo',
      // This follows profile in slack schema.
      profile: {
        first_name: 'Ahmed',
        last_name: 'Tokyo',
        email: 'ahmed.tokyo1@gmail.com',
        title: 'Front End Engineer',
        phone: '01124711175',
      },
      is_admin: true,
      is_owner: false,
      is_primary_owner: false,
      is_restricted: false,
      is_ultra_restricted: false,
      is_bot: false,
      has_2fa: false,
    }).then(() => {
      done();
    }).catch(done);
  });
  describe('user API', () => {
    it(`should signup if email is unique`, (done) => {
      test.post(`/api/auth/signup`).send({email, name, password, slack_id}).then(function({status, body}) {
        assert.equal(status, 200);
        assert.isDefined(body.token);
        token = body.token;
        return User.findOne({email}).exec();
      }).then((user) => {
        assert.notEqual(user, null);
        done();
      }).catch(done);
    });
  });
  describe(`User Signup`, () => {
    it(`should signup if email is unique`, (done) => {
      test.post(`/api/auth/signup`).send({email, name, password, slack_id}).then(function({status, body}) {
        return User.findOne({email}).exec();
      }).then((user) => {
        assert.notEqual(user, null);
        done();
      }).catch(done);
    });
  });
  describe(`User Login`, () => {
    it(`should log in if email and password match`, (done) => {
      test.post(`/api/auth/login`).send({email, password}).then(function({status}) {
        assert.equal(status, 200);
        done();
      }).catch(done);
    });
    it(`should not log in if email is incorrect`, (done) => {
      let email = `j.doee@hotmail.com`;
      test.post(`/api/auth/login`).send({email, password}).then(function({status}) {
        assert.equal(status, 401);
        done();
      }).catch(done);
    });
    it(`should not log in if password is incorrect`, (done) => {
      let password = `1287345`;
      test.post(`/api/auth/login`).send({email, password}).then(function({status}) {
        assert.equal(status, 401);
        done();
      }).catch(done);
    });
  });
  describe(`User profile`, () => {
    let _id;
    it(`should return user profile from id`, (done) => {
      User.find().exec().then((users) => _id = users[0]._id)
      .then(() => test.get(`/api/users/${_id}`)).then(function({status, body}) {
        assert.equal(status, 200);
        assert.equal(body._id, _id);
        done();
      }).catch(done);
    });
    it(`should return user not found`, (done) => {
      test.get(`/api/users/5834200320000e3abe469b53`).then(function({status}) {
        assert.equal(status, 404);
        done();
      }).catch(done);
    });
    it(`should return profile from token`, (done) => {
      test.get(`/api/me`).set(`Authorization`, `jwt ${token}`).then(function({status, body}) {
        assert.equal(status, 200);
        assert.equal(body.email, email);
        done();
      }).catch(done);
    });
    it(`should fail if user is not signed up`, (done) => {
      test.get(`/api/me`).set(`Authorization`, `jwt ${ `ldkfjgbldskjflkj`}`).then(function({status, body}) {
        assert.equal(status, 401);
        done();
      }).catch(done);
    });
    it(`should update user if token is valid`, (done) => {
      let email = `ahmed.tokyo1.2@gmail.com`;
      test.put(`/api/me`).set(`Authorization`, `jwt ${token}`).send({email}).then(function({status, body}) {
        assert.equal(body.email, email);
        assert.equal(status, 200);
        done();
      }).catch(done);
    });
  });
});

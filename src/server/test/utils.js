const User = require('../models/user');

exports.createAUser = ({
    email = 'ahmed.tokyo1@gmail.com',
    password = '12345',
  }) => {
    return User.create(
  {
    slack_id: 'U0U05G6JZ',
    slack_team_id: 'T04NXFZPN',
    email: email,
    password: password,
    name: 'tokyo',
    deleted: false,
    real_name: 'Ahmed Tokyo',
    // This follows profile in slack schema.
    profile: {
      first_name: 'Ahmed',
      last_name: 'Tokyo',
      email: email,
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
  });
};

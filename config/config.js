module.exports = {
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/rurubot',
  MONGO_TEST_URI: process.env.MONGO_TEST_URI || `mongodb://localhost:27017/rurubot_test`,
  CLEVERBOT_API_USER: process.env.CLEVERBOT_API_USER,
  CLEVERBOT_API_KEY: process.env.CLEVERBOT_API_KEY,
  SALCKBOT_TOKEN: process.env.SALCKBOT_TOKEN,
  SALCKBOT_API_TOKEN: process.env.SALCKBOT_API_TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  VERIFICATION_TOKEN: process.env.VERIFICATION_TOKEN,
  WORDSAPI_API_KEY: process.env.WORDSAPI_API_KEY,
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  PORT: 4820,
};

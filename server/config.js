module.exports = {
  db: process.env.db || 'localhost',
  clientSecret: process.env.clientSecret || 'fceb0322832a409cb76c484425431ba9',
  tokenSecret: process.env.tokenSecret || 'someHardToGuessString'
};
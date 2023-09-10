const test = require('./test');
const works = require('./works');
const user = require('./user');
const stat = require('./stat');
const answer = require('./answer');

const mockList = [...test, ...works, ...user, ...stat, ...answer];

module.exports = mockList;

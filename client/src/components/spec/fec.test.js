/* ---- FEC Testing Requirements --------------

Controller functions (via unit tests)
Custom models (via unit tests)
React components (via unit tests)
Seeding function (via unit tests)
One end-to-end test for each service

  ---------------------------------------------
*/

const sum = require('./testingFile');

// first test attempt
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// does component render to the screen (example - title)

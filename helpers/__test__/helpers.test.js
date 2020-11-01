const { getDayString } = require('..');

test('getDayString returns "today" if the date string is today', () => {
  const dayString = new Date().toDateString();

  expect(getDayString(dayString)).toMatch('today');
});

test('getDayString returns "yesterday (latest data)" if the date string is yesterday', () => {
  const d = new Date();
  const y = new Date(d.setDate(d.getDate() - 1));

  expect(getDayString(y.toDateString())).toMatch('yesterday (latest data)');
});

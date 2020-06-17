const round = require('./index.js')

test('round number should have one digit after comma', () => {
    expect(round({lon: 21.2222, lat: 31.4})).toStrictEqual({lat:"31.4", lon: "21.2",});
  });
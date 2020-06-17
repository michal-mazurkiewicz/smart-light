
const {checkInput} = require('../js/formHandler')

let correctInputMock = {
  city:'Madrid',
  countryCode: 'ES',
  startDate: '03-04',
  endDate: '04-05'
}

let incorrectInputMock = {
  city:'Madrid',
  countryCode: 'ES',
  startDate: '03-04',
  endDate: ''
}

test('Correct input true', () => {
    const {city, countryCode, startDate, endDate} = correctInputMock
    expect(checkInput(city, countryCode, startDate, endDate)).toBe('true');
  });

  test('incorrect input false', () => {
    const {city, countryCode, startDate, endDate} = incorrectInputMock
    expect(checkInput(city, countryCode, startDate, endDate)).toBe('false');
  });
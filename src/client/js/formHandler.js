let isImputCorrect;
let country;
let duration;

//Single Trip Data
let colorData = {
  light: 1,
  power: 0,
  red: 0,
  green: 0,
  blue: 0,
  white: 0,
};

//Action performed on submit form
function handleSubmit(event) {
  event.preventDefault();
  //Translate to rgb
  //Get the power
  setColor('http://localhost:8000/color', colorData)
}

//Promises to fetch data:

const setColor = async (url = "", data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const res = await response;
    return res;
  } catch (error) {
    console.log("Set color error: ", error);
  }
};

//Helper functions:

//Insert Data into index.html

//Check if user input is correct

function handleColor(event){
  console.log("Color:", event.target.value);

  let value = event.target.value.match(/[A-Za-z0-9]{2}/g);

// ["XX", "XX", "XX"] -> [n, n, n]
  value = value.map(function(v) { return parseInt(v, 16) });

  colorData = {
    ...colorData,
    red: value[0],
    green: value[1],
    blue: value[2],
  }
  console.log(colorData);
}

function handlePower(event){
  console.log("POWER:", event.target.value)
  colorData = {
    ...colorData,
    power: parseInt(event.target.value)
  }
}

function checkInput(city, countryCode, startDate, endDate) {
  if (
    city === "false" ||
    checkDate(startDate) === "false" ||
    checkDate(endDate) === "false" ||
    countryCode === "false"
  ) {
    return "false";
  } else {
    return "true";
  }
}

export { handleSubmit, handlePower, handleColor };

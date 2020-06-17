let isImputCorrect;
let country;
let duration;

//Single Trip Data
let tripData = {
  city: "",
  country: "",
  startDate: "",
  endDate: "",
  weather: [],
  img: "",
};

//Action performed on submit form
function handleSubmit(event) {
  event.preventDefault();

  // Collect data from user input
  const city = document.getElementById("city-input").value;
  const countryCode = document.getElementById("country-code-input").value;
  const { startDate, endDate } = dateFormater();

  //Set avaible data to trip object
  tripData.city = city;
  tripData.country = countryCode;

  //TODO: Check if data is correct: city, country, startDate, endDate
  if (checkInput(city, countryCode, startDate, endDate) === "false") {
    alert("Please enter correct data before submit");
  } else {
    //Chained promisses that fetch data from the server

    //Get city lon, lat needed to fetch weather
    getCity("http://localhost:8000/getCity", {
      city: city,
      country: countryCode,
    })
      .then(function (data) {
        //Get historical data for coordinates of the given city
        getWeather("http://localhost:8000/getWeather", {
          ...data,
          startDate: startDate,
          endDate: endDate,
        }).then(function (data) {
          //After requests get trip object and update UI
          updateUi("http://localhost:8000/getTrip").then(function (data) {
            //Update trip object with all necessarly information from server
            setTrip(data);
            //Update UI with the information from the trip object
            setUi();
          });
        });
      })
      .then(
        //Get picture for given country
        getPicture("http://localhost:8000/getPicture", {
          country: country,
        })
      );
  }
}

//Promises to fetch data:

const getCity = async (url = "", data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const coordinates = await response.json();
    return coordinates;
  } catch (error) {
    console.log("POST GET City ERROR: ", error);
  }
};

const getPicture = async (url = "", data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const url = await response.json();
    return url;
  } catch (error) {
    console.log("POST GET Picture ERROR: ", error);
  }
};

const getWeather = async (url = "", data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const weather = await response.json();
    return weather;
  } catch (error) {
    console.log("POST GET Weather ERROR: ", error);
  }
};

const updateUi = async (url) => {
  const response = await fetch(url);
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("GET ERROR: ", error);
  }
};

//Helper functions:

//Insert Data into index.html
function setUi() {
  document.getElementById("trip-title").innerText = "Your Trip to " + country;
  document.getElementById(
    "city"
  ).innerText = `Destination: ${tripData.city}, ${tripData.country}`;
  document.getElementById(
    "duration"
  ).innerText = `Duration: ${duration + 1} Day/s.`;
  document.getElementById(
    "start-date"
  ).innerText = `Departure: ${tripData.startDate}`;
  document.getElementById("end-date").innerText = `Return: ${tripData.endDate}`;
  document.getElementById(
    "startWeather"
  ).innerText = `Weather when you'll come: temp: ${tripData.weather[0].temp} C, wind: ${tripData.weather[0].wind} km/h`;
  document.getElementById(
    "endWeather"
  ).innerText = `Weather when you'll leave: temp: ${tripData.weather[1].temp} C, wind: ${tripData.weather[1].wind} km/h`;

  document.getElementById(
    "trip-section"
  ).style.backgroundImage = `url(${tripData.img})`;
}
//Check if user input is correct
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
//Check if data is in correct format
const checkDate = (date) => {
  if (/\d\d-\d\d/.test(date)) {
    return "true";
  } else {
    return "false";
  }
};
//Format data in the way that api need it
function dateFormater() {
  const sDate = document.getElementById("start-date-picker").value.split("-");
  const eDate = document.getElementById("end-date-picker").value.split("-");

  //calculate the time difference
  const start = new Date(sDate[0],sDate[1],sDate[2]);
  const end = new Date(eDate[0],eDate[1],eDate[2]);
  const diff = end - start;
  //Trip duration in days
  duration = convertToDays(diff)

  tripData.startDate = document.getElementById("start-date-picker").value;
  tripData.endDate = document.getElementById("end-date-picker").value;

  //Check if the data values make sens. Make date input red if there was mistake
  if (sDate[1] > 12 || eDate[1] > 12 || sDate[2] > 31 || eDate[2] > 31 || duration < 0) {
    document.getElementById("start-date-picker").style.color = 'red'
    document.getElementById("end-date-picker").style.color = 'red'
    return {startDate: 'false', endDate: 'false'}
  }else{
    document.getElementById("start-date-picker").style.color = 'black'
    document.getElementById("end-date-picker").style.color = 'black'
    const startDate = sDate[1] + "-" + sDate[2];
    const endDate = eDate[1] + "-" + eDate[2];


  return { startDate, endDate };
  }

}
//Sava fetched data into tripData object
function setTrip(data) {
  tripData = {
    ...tripData,
    weather: data.weather,
    img: data.img,
  };
}

//Get name of the country from select element in html
const getCountry = (sel) => {
  country = sel.options[sel.selectedIndex].text;
};

function convertToDays(miliseconds) {

  let seconds = parseInt(Math.floor(miliseconds / 1000));
  let minutes = parseInt(Math.floor(seconds / 60));
  let hours = parseInt(Math.floor(minutes / 60));
  let days = parseInt(Math.floor(hours / 24));

  return days
};

export { handleSubmit, checkInput, getCountry };

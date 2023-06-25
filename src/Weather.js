import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

function Weather(props) {
  let [city, setCity] = useState("");

  let [lastUpdate, setLastUpdate] = useState("");
  let [condition, setcondition] = useState("");
  let [temperature, setTemperature] = useState("");
  let [humidity, setHumidity] = useState("");
  let [wind, setWind] = useState("");

  let apiKey = "32b4b295foaa231fc57f93c96aat80ba";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  function handleSubmit(event) {
    event.preventDefault();
    if (city) {
      axios.get(url).then(handleResponse);
    } else {
      alert("Please enter a city");
    }
  }
  function updateCity(event) {
    setCity(event.target.value);
  }

  function handleResponse(response) {
    if (response.data.message === "City not found") {
      alert("Please enter a valid value!");
    } else {
      let returnedDate = new Date(response.data.time * 1000);
      let months = [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let dateString = `${returnedDate.getDate()} ${
        months[returnedDate.getMonth()]
      } ${returnedDate.getFullYear()} ${returnedDate.getHours()}:${returnedDate.getMinutes()}:${returnedDate.getSeconds()}`;

      setLastUpdate(dateString);
      let returnedDscription = response.data.condition.description;
      let descArr = returnedDscription.split(" ");
      for (var i = 0; i < descArr.length; i++) {
        descArr[i] = descArr[i].charAt(0).toUpperCase() + descArr[i].slice(1);
      }
      let weatherDescription = descArr.join(" ");
      setcondition(weatherDescription);
      setTemperature(Math.round(response.data.temperature.current));
      setHumidity(response.data.temperature.humidity);
      setWind(response.data.wind.speed);
    }
  }

  return (
    <div className="Weather">
      <div className="container col-8">
        <div className="border border-dark border-3 rounded p-4 mt-5">
          <div className="row">
            <form id="city-search" onSubmit={handleSubmit}>
              <div className="row d-flex justify-content-center">
                <div className="col-auto form-control-lg m-1">
                  <input
                    type="search"
                    name="city"
                    id="city"
                    placeholder="City"
                    onChange={updateCity}
                  />
                </div>
                <div className="col-auto form-control-lg">
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="Weather">
            <div className="row mt-3">
              <div className="col text-center">
                <h1>{city}</h1>
                <p>Last Updated: {lastUpdate}</p>
                <p>{condition}</p>
              </div>
            </div>

            <div className="row m-2">
              <div className="col-12 col-sm-4 text-left">
                <p>
                  <span id="current-weather-icon" role="img" aria-label="Sunny">
                    🌤️
                  </span>
                  <span id="current-temp">{temperature}</span>
                  <span id="current-degree">
                    <a href="./" id="celsius">
                      °C
                    </a>
                  </span>
                </p>
              </div>
              <div className="col-12 col-sm-4 text-center p-3">
                <p className="weather-condition">
                  Humidity: <span id="humidity">{humidity}</span>%
                  <br />
                  Wind: <span id="wind">{wind}</span> km/h
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;

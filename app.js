const apiKey = "5b7d94eb2fc959eb774f78742236fe25";

const weatherDataEle = document.querySelector(".weather-data");
const cityInputEle = document.querySelector("#city-input");
const formEle = document.querySelector("form");
const iconEle = document.querySelector(".icon");
const datailsEle = document.querySelector(".details");
// weatherDataEle.addEventListener("click", () => {
//   console.log("hi");
// });

formEle.addEventListener("submit", (e) => {
  e.preventDefault();
  const cityName = cityInputEle.value;
  //   console.log(cityName);
  if (cityName == "") {
    alert("Please Enter City Name");
  }
  getcityWeather(cityName);
});

async function getcityWeather(cityName) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error("This city Data is Not Available Now");
    }
    //Temperature
    const temp = Math.floor(data.main.temp);
    console.log(temp);
    weatherDataEle.querySelector(".temp").textContent = `${temp}°C`;

    //Description
    const desc = data.weather[0].description;
    console.log(desc);
    weatherDataEle.querySelector(".desc").textContent = `${desc}`;

    //Icon
    const icon = data.weather[0].icon;
    console.log(icon);
    iconEle.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}.png" alt="" />`;

    //Feels Like
    const feelsLike = Math.floor(data.main.feels_like);
    console.log(feelsLike);
    datailsEle.querySelector(
      ".detail1"
    ).textContent = `Feels Like:${feelsLike}°C`;

    //Humidity
    const humidity = data.main.humidity;
    console.log(humidity);
    datailsEle.querySelector(".detail2").textContent = `Humidity:${humidity}%`;

    //Wind Speed
    const windspeed = data.wind.speed;
    console.log(windspeed);
    datailsEle.querySelector(
      ".detail3"
    ).textContent = `Wind Speed:${humidity}m/s`;
  } catch (error) {
    console.log(error);
  }
}

function formatDate(timestamp){
    let date = new Date(timestamp);
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
      }
    let min = date.getMinutes();
    if (min < 10) {
        min = `0${min}`;
      }
    return `${day} ${hour}:${min}`;
}

function displayTemperature(respone){
    let temp = document.querySelector("#temperature");
    temp.innerHTML = Math.round(respone.data.main.temp);
    let city = document.querySelector("#city");
    city.innerHTML = respone.data.name;
    let desc=document.querySelector("#description");
    desc.innerHTML = respone.data.weather[0].description;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML=respone.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML=Math.round(respone.data.wind.speed);
    let date = document.querySelector("#date");
    date.innerHTML = formatDate(respone.data.dt * 1000);
    let icon = document.querySelector("#icon");
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${respone.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt", respone.data.weather[0].description);
    celciusTemperature = respone.data.main.temp;
}

function search(city){
  let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
  let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handelSubmit(event){
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
  
}

function displayFahrenheit(event){
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit1.classList.add("active");
  let temperature = document.querySelector("#temperature");
  let fahrenheit = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheit);
}

function displayCelsius(event){
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit1.classList.remove("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celciusTemperature);
}


let celciusTemperature = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handelSubmit);

let fahrenheit1=document.querySelector("#fahrenheit");
fahrenheit1.addEventListener("click",displayFahrenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click",displayCelsius);

search("Bushehr");
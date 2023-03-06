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
        minu = `0${min}`;
      }
    return `${day} ${hour}:${min}`;
}

function displayTemperature(respone){
    console.log(respone.data);
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
}

let apiKey = "aca4dd3643b89e94dbd3cac6cf6f2638";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
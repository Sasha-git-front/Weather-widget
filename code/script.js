
document.getElementById('date').innerText = getCurrentDate();
const input = document.querySelector('input[type=text]');
const btn = document.querySelector('.weather-container__btn');
const city = document.querySelector('.city');
const weatherStatus = document.querySelector('.status');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const loadingIndicator = document.querySelector('.weather-container__loading-indicator');
const weatherInfo = document.querySelector('.weather-container__info');

function getCurrentDate() {
    const now = new Date();
    
    // Отримання дня тижня
    const dayOfWeek = now.toLocaleDateString('en-En', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const formattedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    return formattedDayOfWeek.replace(/р\./, '');
}

input.addEventListener('input', () => {
    request(input.value,getWeather);
})

async function request(value,callback) {


    loadingIndicator.style.display = 'block';

    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${value}&appid=5868385811e81ae08671f43616141be1`, {
        method: 'GET',
    });

    const respons = await data.json();
    loadingIndicator.style.display = 'none';
    btn.addEventListener('click', () => {
        if (data.ok) {
            callback(respons)
            input.value = '';
        } else {
            input.value = '';
            weatherInfo.style.display = 'none';
        }

    });
}
/*async function translateToUkrainian(text) {
    const apiUrl = 'https://libretranslate.de/translate';
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            q: text,
            source: 'en',
            target: 'uk',
        }),
    });

    if (!response.ok) {
        console.log("Fals.ERROR");
    }
    const data = await response.json();

    return data.translatedText;
}*/

async function getWeather(data) {

    console.log(data);
    weatherInfo.style.display = 'block';
    //const cityNameUkr = await translateToUkrainian(data.name);
    city.innerHTML = data.name;
    weatherStatus.innerHTML = data.weather[0].main;
    weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    weatherIcon.alt = data.weather[0].main;
    temperature.innerHTML = `${Math.round(data.main.temp)} °C`;
    feelsLike.innerHTML = `Відчувається як: ${Math.round(data.main.feels_like)} °C`;

}  
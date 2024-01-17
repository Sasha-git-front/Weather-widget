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
    const dayOfWeek = now.toLocaleDateString('uk-UA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const formattedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
    return formattedDayOfWeek.replace(/р\./, '');
}

input.addEventListener('input', () => {
    request(input.value);
})

async function request(value) {

    try {
        loadingIndicator.style.display = 'block';
        
        const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${value}&appid=5868385811e81ae08671f43616141be1`, {
            method: 'GET',
        });
        console.log(data.ok)
        const response = await data.json();
        loadingIndicator.style.display = 'none';
        btn.addEventListener('click', () => {
            if(data.ok){
                getWeather(response)
                input.value = '';
            }else{
                input.value = '';
                weatherInfo.style.display = 'none';
            }
            
        });
    } catch (error) {
        console.error('Помилка при отриманні даних:', error);
    }
}
function getWeather(data) {
    if(data){
        console.log(data);

        weatherInfo.style.display = 'block';
        city.innerHTML = data.name;
        weatherStatus.innerHTML = data.weather[0].main;
        weatherIcon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        weatherIcon.alt = data.weather[0].main;
        temperature.innerHTML = `${Math.round(data.main.temp)} °C`;
        feelsLike.innerHTML = `Feels like: ${Math.round(data.main.feels_like)} °C`; 
    }

}











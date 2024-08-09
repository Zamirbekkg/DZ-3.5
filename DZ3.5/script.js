
let isCelsius = true;
const apiKey = 'YOUR_API_KEY';

document.getElementById('getWeather').addEventListener('click', async function() {
    const city = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');

    if (city === '') {
        weatherResult.textContent = 'Please enter a city.';
        return;
    }

    try {
        const unit = isCelsius ? 'metric' : 'imperial';
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7013c0154c9a44a892430916230407&q=${city}&appid=${apiKey}&units=${unit}`);
        const data = await response.json();

        if (data.cod === 200) {
            const temperature = data.main.temp;
            const windSpeed = data.wind.speed;
            const tempUnit = isCelsius ? '°C' : '°F';
            weatherResult.textContent = `Temperature: ${temperature} ${tempUnit}, Wind Speed: ${windSpeed} m/s`;
        } else {
            weatherResult.textContent = `Error: ${data.message}`;
        }
    } catch (error) {
        weatherResult.textContent = 'Error fetching weather data.';
    }
});

document.getElementById('toggleTemp').addEventListener('click', function() {
    isCelsius = !isCelsius;
    document.getElementById('toggleTemp').textContent = isCelsius ? 'Switch to Fahrenheit' : 'Switch to Celsius';
});
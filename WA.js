document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY';
    const weatherInfo = document.querySelector('.weather-info');
    const locationName = document.getElementById('location-name');
    const temperature = document.getElementById('temperature');
    const weatherDescription = document.getElementById('weather-description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    const getWeatherButton = document.getElementById('get-weather');
    const locationInput = document.getElementById('location-input');

    getWeatherButton.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeatherData(location);
        }
    });

    function fetchWeatherData(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.style.display = 'none';
            });
    }

    function displayWeatherData(data) {
        if (data.cod === 200) {
            weatherInfo.style.display = 'block';
            locationName.textContent = `${data.name}, ${data.sys.country}`;
            temperature.textContent = `Temperature: ${data.main.temp}°C`;
            weatherDescription.textContent = `Conditions: ${data.weather[0].description}`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        } else {
            weatherInfo.style.display = 'none';
            alert('Location not found');
        }
    }
});

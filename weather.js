const date = getQueryParam('date');
let latitude = getQueryParam('latitude'); // Get latitude from query parameters
let longitude = getQueryParam('longitude'); // Get longitude from query parameters

// Fallback to localStorage if latitude and longitude are not in query parameters
if (!latitude || !longitude) {
    latitude = localStorage.getItem('latitude');
    longitude = localStorage.getItem('longitude');
}

function setCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('timeInput').value = `${hours}:${minutes}`;
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function fetchWeatherData() {
    if (!latitude || !longitude) {
        console.error('Latitude and longitude are required to fetch weather data.');
        document.getElementById('weather').textContent = 'Latitude and longitude are missing.';
        return;
    }

    const url = `https://api.weather.gov/points/${latitude},${longitude}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching points data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const forecastUrl = data.properties.forecastHourly; // Use hourly forecast
            console.log('Fetching forecast data from:', forecastUrl); // Debugging log
            return fetch(forecastUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching forecast data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Full forecast data:', data); // Debugging log

            const timeInput = document.getElementById('timeInput').value; // Get the user-set time
            const [hours, minutes] = timeInput.split(':').map(Number); // Parse hours and minutes
            const selectedDate = new Date(date); // Use the date from the query parameter
            selectedDate.setHours(hours, minutes, 0, 0); // Set the desired time

            // Debugging: Log the user-set date and time
            console.log('User-set date and time:', selectedDate);

            const forecast = data.properties.periods.find(period => {
                const startTime = new Date(period.startTime);
                console.log('Checking forecast period:', startTime); // Debugging log
                return (
                    startTime.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0] && // Match the date
                    startTime.getHours() === selectedDate.getHours() // Match the hour
                );
            });

            if (forecast) {
                console.log('Matching forecast found:', forecast); // Debugging log
                document.getElementById('weather').textContent = `Weather: ${forecast.shortForecast}`;
                document.getElementById('temperature').textContent = `Temperature: ${forecast.temperature}°${forecast.temperatureUnit}`;
                document.getElementById('wind').textContent = `Wind: ${forecast.windSpeed}`;
                document.getElementById('precipitation').textContent = `Precipitation: ${forecast.probabilityOfPrecipitation.value}%`;
            } else {
                console.error('No matching forecast data available.');
                document.getElementById('weather').textContent = 'No forecast data available for the selected time.';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather').textContent = 'Error fetching weather data.';
        });
}

if (date) {
    document.getElementById('date').textContent = `Date: ${date}`;
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the time input with the current time
    setCurrentTime();

    // Fetch and display weather data
    fetchWeatherData();

    // Add event listener to update weather data when the time changes
    const timeInput = document.getElementById('timeInput');
    timeInput.addEventListener('change', fetchWeatherData);
});
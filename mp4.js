// Selects the input field where the user types the city name
const input = document.querySelector("input"); 

// Selects the button element with the ID "btn"
const btn = document.getElementById("btn"); 

// Selects the element with the class "icon" where the weather icon will be displayed
const icon = document.querySelector(".icon"); 

// Selects the element with the class "weather" where weather details will be displayed
const weather = document.querySelector(".weather"); 

// Selects the element with the class "temperature" where the temperature will be shown
const temperature = document.querySelector(".temperature"); 

// Selects the element with the class "description" where the weather description will be displayed
const description = document.querySelector(".description"); 


// Function to fetch weather data for the entered city
function getWeather(city) {
    const apiKey = "1edf780ee938033a88b5213a04e0b321"; // Your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`; 
    // Constructs the API request URL using the city name and API key

    fetch(url) // Sends a request to the OpenWeather API
        .then(response => response.json()) // Converts the API response to JSON format
        .then(data => {
            if (data.cod === 200) { // Checks if the response status code is 200 (successful)
                const iconCode = data.weather[0].icon; // Retrieves the weather icon code from the API response
                icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon"/><p>${data.name}</p>`; 
                // Displays the weather icon using OpenWeather's icon URL
                
                temperature.innerHTML = `${data.main.temp}°C`; // Displays the temperature in Celsius
                description.innerHTML = `${data.weather[0].description}`; // Displays the weather description (e.g., "clear sky")
            } else {
                weather.innerHTML = `<p>City not found. Please try again!</p>`; 
                // Displays an error message if the city is not found
            }
        })
        .catch(error => {
            console.error("Error fetching weather:", error); // Logs any errors to the console
            weather.innerHTML = `<p>Failed to fetch data. Try again later.</p>`; 
            // Displays an error message if there's a problem with fetching data
        });
}
// Adds an event listener to the button that triggers when clicked
function handleWeatherRequest() { 
    let city = input.value.trim(); // Retrieves the user-inputted city name and trims extra spaces
    if (city) { 
        getWeather(city); // Calls the getWeather function with the city name if it's not empty
    } else {
        alert("Please enter a city name!"); // Shows an alert if the input is empty
    }
}
// Adds an event listener to the button that triggers when clicked
btn.addEventListener("click", handleWeatherRequest);

// Adds an event listener to detect the Enter key press inside the input field
input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        handleWeatherRequest();
}
});

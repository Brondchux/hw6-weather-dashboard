// PSEUDO CODE =============================================

// DEPENDENCIES (DOM Elements) =============================
let mainWeather = $("#main-weather");
let weatherForecast = $("#weather-forecast");
let searchButton = $("#search-button");
let searchCity = $("#search-city");
let alertMessages = $("#alert-messages");
let cityButtons = $("#city-buttons");

// DATA ====================================================
let apiKey = "1517cd55cab8c75d16cd1fade8e7890d"; // Not secured
let baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
let baseCity = "new york";
let localStorageName = "lookedUpCities";
let cityNamesArr = [];

// FUNCTIONS ===============================================
// Primary function to run the app
function initApp() {
	// Ensure a city name was provided
	if (!searchCity.val()) {
		return alertMessages
			.addClass("text-danger")
			.text("A city name is required!");
	}

	// Clear out alert message if any
	alertMessages.text("");

	// Store city
	storeCityName(searchCity.val());

	// Fetch weather
	fetchCityWeather(searchCity.val());

	// Clear out search city
	searchCity.val("");
}

// Update the main weather display section
function displayMainWeather(weatherObj) {
	if (!weatherObj) return;

	// Empty the mainWeather div content
	mainWeather.html("");

	// Create
	let h2El = $("<h2>");
	let pElTemp = $("<p>");
	let pElWind = $("<p>");
	let pElHumidity = $("<p>");
	let pElUV = $("<p>");
	let uvSpan = $("<span class='badge badge-success'>");

	// Build
	h2El.text(`${weatherObj.city}, ${weatherObj.country} (${todaysDate()})`);
	pElTemp.text(`Temp: ${weatherObj.temp}`);
	pElWind.text(`Wind: ${weatherObj.wind}`);
	pElHumidity.text(`Humidity: ${weatherObj.humidity}`);
	pElUV.text(`UV Index: `);
	uvSpan.text(`TBA`);
	pElUV.append(uvSpan);

	// Place
	mainWeather.append(h2El);
	mainWeather.append(pElTemp);
	mainWeather.append(pElWind);
	mainWeather.append(pElHumidity);
	mainWeather.append(pElUV);
}

// Card collections of 5 days weather forecast
function miniWeatherCard(forecastObj) {
	// Create
	let miniColEl = $("<div class='col mb-2'>");
	let miniCardEl = $("<div class='card bg-dark text-white'>");
	let miniCardHeaderEl = $("<div class='card-header'>");
	let miniCardH5El = $("<h5>"); // .text() here
	let miniCardBodyEl = $("<div class='card-body'>");
	let miniCardPTempEl = $("<p>"); // .text() here
	let miniCardPWindEl = $("<p>"); // .text() here
	let miniCardPHumidityEl = $("<p>"); // .text() here

	// Build
	miniCardH5El.text(`${forecastObj.date}`);
	miniCardPTempEl.text(`Temp: ${forecastObj.temp}`);
	miniCardPWindEl.text(`Wind: ${forecastObj.wind}`);
	miniCardPHumidityEl.text(`Humidity: ${forecastObj.humidity}`);

	// Place
	miniCardHeaderEl.append(miniCardH5El);
	miniCardBodyEl.append(miniCardPTempEl);
	miniCardBodyEl.append(miniCardPWindEl);
	miniCardBodyEl.append(miniCardPHumidityEl);
	miniCardEl.append(miniCardHeaderEl);
	miniCardEl.append(miniCardBodyEl);
	miniColEl.append(miniCardEl);
	weatherForecast.append(miniColEl);
}

// Display saved cites
function listSavedCities() {
	let cities = fetchStoredCities() ? fetchStoredCities() : [];

	// Loop through the cities
	cities.map((city) => {
		// Create button
		let buttonEl = $(
			"<button class='btn btn-secondary form-control mt-2 text-capitalize'>"
		);

		// Build buttons
		buttonEl.text(city);

		// Place buttons
		cityButtons.append(buttonEl);

		// Add event listener
		buttonEl.on("click", function () {
			let buttonCityName = buttonEl.text();
			fetchCityWeather(buttonCityName);
		});
	});
}

// Store the searched city name
function storeCityName(newCityName) {
	if (!newCityName) return;

	// Combine the new array with the cities array from localstorage
	let existingCitiesArr = fetchStoredCities() ? fetchStoredCities() : [];
	let updatedCitiesArr = [...existingCitiesArr, newCityName];

	// Save in local storage
	localStorage.setItem(localStorageName, JSON.stringify(updatedCitiesArr));
}

// Fetch stored cities from local storage
function fetchStoredCities() {
	return JSON.parse(localStorage.getItem(localStorageName));
}

// Fetch base city weather details
function fetchCityWeather(cityName) {
	// Test data to save api calls
	console.log("Weather details fetched for ", cityName);
	let weatherObj = {
		country: "Country",
		city: "City",
		temp: "Temp",
		wind: "Wind",
		humidity: "Humidity",
	};
	displayMainWeather(weatherObj);
	daysWeatherForecast(cityName);
	return;
	// End of test data to save api calls

	// // Real data to use api calls
	// let requestUrl = `${baseUrl}q=${cityName}&appid=${apiKey}`;
	// fetch(requestUrl)
	// 	.then(function (response) {
	// 		return response.json();
	// 	})
	// 	.then(function (data) {
	// 		let weatherObj = {
	// 			country: data && data.sys ? data.sys.country : "Country",
	// 			city: data && data.name ? data.name : "No City",
	// 			temp: data && data.main ? data.main.temp : "Temp",
	// 			wind: data && data.wind ? data.wind.speed : "Speed",
	// 			humidity: data && data.main ? data.main.humidity : "Humidity",
	// 		};
	// 		// Display the result on DOM
	// 		displayMainWeather(weatherObj);
	// 	});
}

// Fetch 5 days weather forecast
function daysWeatherForecast(theCityName) {
	// Clear out the previous content of weather forecast
	weatherForecast.html("");
	console.log("daysWeatherForecast:", theCityName);
	for (let i = 0; i < 5; i++) {
		let forecastObj = {
			date: i + theCityName,
			temp: i + theCityName,
			wind: i + theCityName,
			humidity: i + theCityName,
		};
		miniWeatherCard(forecastObj);
	}
}

// Display todays date
function todaysDate() {
	let today = Date.now();
	return moment(today).format("MM/DD/YY");
}

// INITIALIZATION ==========================================
fetchCityWeather(baseCity);
searchButton.on("click", initApp);
listSavedCities();

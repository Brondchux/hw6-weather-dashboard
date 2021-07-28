// PSEUDO CODE =============================================

// DEPENDENCIES (DOM Elements) =============================

// DATA ====================================================
let apiKey = "1517cd55cab8c75d16cd1fade8e7890d"; // Not secured
let baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
let baseCity = "new york";
let localStorageName = "lookedUpCities";
let cityNamesArr = [];

// FUNCTIONS ===============================================
// Store the searched city name
function storeCityName(newCityName) {
	if (!newCityName) return;
	cityNamesArr.unshift(newCityName);

	// Save in local storage
	localStorage.setItem(localStorageName, JSON.stringify(cityNamesArr));
}

// Fetch stored cities from local storage
function fetchStoredCities() {
	return JSON.parse(localStorage.getItem(localStorageName));
}

// Fetch base city weather details
function fetchCityWeather(cityName) {
	let requestUrl = `${baseUrl}q=${cityName}&appid=${apiKey}`;
	fetch(requestUrl)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
		});
}

// INITIALIZATION ==========================================
fetchCityWeather(baseCity);

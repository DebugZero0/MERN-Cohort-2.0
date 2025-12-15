

const cityInput = document.querySelector('.city-input');
const searchBtn = document.querySelector('.search-btn');

const notFoundSection = document.querySelector('.notfound-city');
const searchCitySection = document.querySelector('.search-city');
const weatherInfoSection = document.querySelector('.weather-info');

const contrytxt = document.querySelector('.contry-text');
const temptxt = document.querySelector('.temp-txt');
const conditiontxt = document.querySelector('.condition-txt');
const humiditytxt = document.querySelector('.Humidity-val-txt');
const windtxt = document.querySelector('.Wind-val-txt');
const weatherSummaryImg= document.querySelector('.weather-summary-img');
const currentDateText= document.querySelector('.current-date-text');

const forcastItemcontainer = document.querySelector('.forcast-item-container');

searchBtn.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value.trim()); 
        cityInput.value = '';
        cityInput.blur(); 
    }
});
cityInput.addEventListener('keydown', (event) => {
    if(event.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeatherInfo(cityInput.value.trim()); 
        cityInput.value = '';
        cityInput.blur(); 
    }
});

async function getWeatherData(endpoint, city){

    const key = typeof apiKey === 'string' && apiKey.trim() !== '' ? apiKey : (window.API_KEY || '');
    if(!key){
        console.warn('Missing API key: set window.API_KEY or apiKey constant');
    }
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${key}&units=metric`;
    const response =  await fetch(apiUrl);
    return await response.json();
}

// This value is used to map weather condition codes to icon filenames. Can be found in OpenWeatherMap documentation.
function getWeatherIcon(id){
    if(id <= 232) return 'thunderstorm.svg';
    else if(id <= 321) return 'drizzle.svg';
    else if(id <= 531) return 'rain.svg'; 
    else if(id <= 622) return 'snow.svg';
    else if(id <= 781) return 'atmosphere.svg';
    else if(id===800) return 'clear.svg';
    else if(id<=804) return 'clouds.svg';
    else return 'default.png';
}
function getCurrentDate(){
    const currentDate = new Date(); // Get the current date
    const options = { weekday:'short',day:'2-digit',month:'short'}; // Formatting options
    return currentDate.toLocaleDateString('en-gb', options); // en-gb for day-month-year format
}

async function updateWeatherInfo(city) {
    const weatherData = await getWeatherData('weather',city);
    console.log(weatherData);
    if(weatherData.cod != 200){
        showDisplaySection(notFoundSection);
        return;
    }
    const{
        name:county,
        main: { temp, feels_like, humidity },
        weather: [{id, main}],
        wind: { speed}
    } = weatherData;

    contrytxt.textContent = county;
    conditiontxt.textContent = main;
    temptxt.textContent = `${Math.round(temp)}°C`;
    humiditytxt.textContent = `${humidity}%`;
    windtxt.textContent = `${speed} m/s`;

    currentDateText.textContent = getCurrentDate();

    weatherSummaryImg.src = `./assets/weather/${getWeatherIcon(id)}`;

    await updateforcastInfo(city);
    showDisplaySection(weatherInfoSection);

}
async function updateforcastInfo(city){
    const forcastData = await getWeatherData('forecast',city);
    const timeTaken="12:00:00";
    const todayDate = new Date().toISOString().split('T')[0];

    forcastItemcontainer.innerHTML= '';
    forcastData.list.forEach(item=>{
        if(item.dt_txt.includes(timeTaken) && !item.dt_txt.includes(todayDate)) {
            updateforcastItems(item);
        };
    });
    
}
function updateforcastItems(item){
    const{
        dt_txt: date,
        main: { temp },
        weather: [{id}]
    }= item;
    const dateTaken = new Date(date);
    const options = { day:'2-digit', month:'short'};
    const formattedDate = dateTaken.toLocaleDateString('en-gb', options);

    const forcastItem = `
        <div class="forcast-item">
                <h5 class="forcast-item-date regular-txt">${formattedDate}</h5>
                <img src="./assets/weather/${getWeatherIcon(id)}" alt="" class="forcast-item-img">
                <h5 class="forcast-item-temp ">${Math.round(temp)}°C</h5>
        </div>
        `
    forcastItemcontainer.insertAdjacentHTML('beforeend',forcastItem);
}
    


function showDisplaySection(section){
    [weatherInfoSection, notFoundSection, searchCitySection].forEach(section=>{
        section.style.display = 'none';
    });
    section.style.display = 'flex';
}

// Suggestion 

const input = document.getElementById("search");
const suggestionsBox = document.getElementById("suggestions");

let debounceTimer;

// Debounce function
function debounce(fn, delay = 400) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(fn, delay);
}

// Fetch cities
async function fetchCities(query) {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${query}&limit=5&types=CITY`;
  const key2= window.city_api || '';
  const response = await fetch(url, {
    headers: {
      "X-RapidAPI-Key": key2, 
      "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com" 
    }
  });

  const data = await response.json();
  return data.data;
}

// Render suggestions
function renderSuggestions(cities) {
  suggestionsBox.innerHTML = "";

  cities.forEach(city => {
    const div = document.createElement("div");
    div.className = "suggestion";
    div.textContent = `${city.city}, ${city.country}`;
    suggestionsBox.appendChild(div);
  });
}

// Input event
input.addEventListener("input", () => {
  const query = input.value.trim();

  if (query.length === 0) {
    suggestionsBox.innerHTML = "";
    return;
  }

  debounce(async () => {
    const cities = await fetchCities(query);
    renderSuggestions(cities);
  });
});

// Select city
suggestionsBox.addEventListener("click", e => {
  if (e.target.classList.contains("suggestion")) {
    input.value = e.target.textContent;
    suggestionsBox.innerHTML = "";
    updateWeatherInfo(cityInput.value.trim()); 
        cityInput.value = '';
        cityInput.blur();
  }
});

// Click outside → close dropdown
document.addEventListener("click", e => {
  if (!e.target.closest(".container")) {
    suggestionsBox.innerHTML = "";
  }
});


# Weatherwise 


[Live demo](https://mern-cohort-2-0-vi8p.vercel.app/)

🌦️ WeatherWise — Simple Weather Forecast App
===========================================

A clean, modern **JavaScript weather application** that fetches **real-time weather data** and a **5-day forecast** using the OpenWeatherMap API.  
Search any city, hit enter, and instantly see what the skies have planned ☁️☀️🌧️

---

## ✨ Features

- ✔️ Search weather by city name  
- ✔️ Real-time temperature (°C)  
- ✔️ Weather condition summary  
- ✔️ Humidity & wind speed  
- ✔️ 5-day forecast (midday snapshot)  
- ✔️ Dynamic weather icons  
- ✔️ Error handling for invalid cities  
- ✔️ Minimal & responsive UI logic

---

## 🛠️ Tech Stack
--------------
- **HTML5**
- **CSS3**
- **Vanilla JavaScript**
- **OpenWeatherMap API**

No frameworks. No libraries. Just clean JS 🔥

---

## 📂 Project Structure

```bash
📦 weather-dashboard
┣ 📂 assets
┃ ┗ 📂 weather # SVG weather icons
┣ 📜 index.html
┣ 📜 style.css
┣ 📜 script.js # Core logic (this file)
┗ 📜 README.md

```


## ⚙️ How It Works

- User enters a city name
- App fetches:
   - **Current weather**
   - **5-day forecast**
- Data is parsed and displayed dynamically
- Weather icons change based on condition codes
- UI updates without page reload



🔑 API Setup (Important!)
-------------------------
This project uses **OpenWeatherMap**.

### 1️⃣ Get your API key  
Create one at 👉 https://openweathermap.org/api

### 2️⃣ Add it to your project  
In your JavaScript file or HTML:


## 📸 Weather Icons Logic

```bash
Weather condition codes are mapped like this:

| Condition Code | Icon                |
| -------------- | ------------------- |
| Thunderstorm   | ⛈️ thunderstorm.svg |
| Drizzle        | 🌦️ drizzle.svg      |
| Rain           | 🌧️ rain.svg         |
| Snow           | ❄️ snow.svg         |
| Clear          | ☀️ clear.svg        |
| Clouds         | ☁️ clouds.svg       |
```

## 📅 Forecast Logic
- Displays one forecast per day
- Uses 12:00 PM readings for consistency
- Skips today and shows upcoming days only
- Clean, readable, and useful.

<p>Enjoy building your Weather Dashboard! ☀️🌧️⛅</p>


<h2>🚀 Future Improvements</h2>
<ul>
<li>🌍 Location-based weather
<li>🌙 Dark mode
<li>📊 Hourly forecast view
<li>🧠 Caching API responses
<li>🔔 Weather alerts
</ul>
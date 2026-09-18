const API_KEY = "PASTE_YOUR_OPENWEATHERMAP_KEY_HERE";
const LOCATION = { lat: 5.532, lon: 7.486 };

const menuButton = document.querySelector("#menu-button");
const navMenu = document.querySelector("#nav-menu");
menuButton?.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  menuButton.querySelector("span").textContent = isOpen ? "×" : "☰";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

const weatherMessage = (message) => {
  document.querySelector("#current-weather").innerHTML = `<p>${message}</p>`;
  document.querySelector("#forecast").innerHTML = "";
};

const formatDay = (unixTime) => new Intl.DateTimeFormat("en-NG", { weekday:"long" }).format(new Date(unixTime * 1000));
async function getWeather() {
  if (API_KEY === "PASTE_YOUR_OPENWEATHERMAP_KEY_HERE") { weatherMessage("Weather information is unavailable until an OpenWeatherMap API key is added."); return; }
  const query = `lat=${LOCATION.lat}&lon=${LOCATION.lon}&units=metric&appid=${API_KEY}`;
  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?${query}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?${query}`)
    ]);
    if (!currentResponse.ok || !forecastResponse.ok) throw new Error("Weather request failed.");
    const [current, forecast] = await Promise.all([currentResponse.json(), forecastResponse.json()]);
    const description = current.weather[0].description;
    document.querySelector("#current-weather").innerHTML = `<img src="https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png" alt="${description}" width="80" height="80"><div><p class="temperature"><strong>${Math.round(current.main.temp)}°C</strong></p><p>${description}</p><p>Feels like ${Math.round(current.main.feels_like)}°C</p></div>`;
    const readings = forecast.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    document.querySelector("#forecast").innerHTML = readings.map(item => `<article class="forecast-card"><h4>${formatDay(item.dt)}</h4><p><strong>${Math.round(item.main.temp)}°C</strong></p><p>${item.weather[0].description}</p></article>`).join("");
  } catch (error) { console.info(error.message); weatherMessage("Weather information is currently unavailable."); }
}

async function getMembers() {
  const container = document.querySelector("#spotlights");
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Member data could not be loaded.");
    const members = await response.json();
    const qualified = members.filter(({ membership_level }) => ["Gold", "Silver"].includes(membership_level));
    const selected = qualified.sort(() => Math.random() - 0.5).slice(0, 3);
    if (!selected.length) throw new Error("No Gold or Silver members found.");
    container.innerHTML = selected.map(member => `<article class="spotlight-card"><img src="images/${member.image}" alt="${member.name} logo" width="120" height="80" loading="lazy"><h3>${member.name}</h3><p><strong>Membership:</strong> ${member.membership_level}</p><p>${member.address}</p><p>${member.phone}</p><p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit website</a></p></article>`).join("");
  } catch (error) { console.info(error.message); container.innerHTML = "<p>Business spotlights are currently unavailable.</p>"; }
}

getWeather();
getMembers();

// Shared site behaviour: mobile navigation and footer dates.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
}

const yearElement = document.querySelector("#current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const modifiedElement = document.querySelector("#last-modified");
if (modifiedElement) {
  const modifiedDate = new Date(document.lastModified);
  modifiedElement.textContent = Number.isNaN(modifiedDate.getTime())
    ? "Date unavailable"
    : modifiedDate.toLocaleString("en-NG", {
        year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit"
      });
}

fetch("data/members.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });

    async function getMembers() {
    const response = await fetch("data/members.json");

    const data = await response.json();

    console.log(data);
}

const response = await fetch("data/members.json");

const data = await response.json();

const weatherAPI =
    "https://api.open-meteo.com/v1/forecast?latitude=5.5320&longitude=7.4860&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Africa%2FLagos";

async function getWeather() {
    try {
        const response = await fetch(weatherAPI);

        if (!response.ok) {
            throw new Error("Unable to retrieve weather data");
        }

        const weather = await response.json();

        console.log(weather);

        document.querySelector("#temperature").textContent =
            `${weather.current.temperature_2m}°C`;

        document.querySelector("#weather-description").textContent =
            "Current weather conditions";

        document.querySelector("#weather-high").textContent =
            `${weather.daily.temperature_2m_max[0]}°C`;

        document.querySelector("#weather-low").textContent =
            `${weather.daily.temperature_2m_min[0]}°C`;

    } catch (error) {
        console.error("Weather error:", error);
    }
}

getWeather();

function getRandomMembers(members, numberOfMembers) {

    const shuffled = [...members].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, numberOfMembers);
}

function displaySpotlights(members) {

    const spotlightContainer = document.querySelector("#spotlights");

    spotlightContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("article");

        card.classList.add("spotlight-card");

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo">

            <h3>${member.name}</h3>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <a href="${member.website}" target="_blank">
                Visit Website
            </a>
        `;

        spotlightContainer.appendChild(card);

    });
}

/*
 * WDD 231 - Chamber Discover Page
 * discover.js
 */

import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");

const dialog = document.querySelector("#place-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogAddress = document.querySelector("#dialog-address");
const dialogDescription = document.querySelector("#dialog-description");
const dialogMapLink = document.querySelector("#dialog-map-link");
const closeDialog = document.querySelector("#close-dialog");

const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const VISIT_STORAGE_KEY = "Abia business chamber DiscoverLastVisit";


/* =========================================
   1. Visitor visit-date message
========================================= */

function displayVisitMessage() {
  const now = Date.now();
  const previousVisit = localStorage.getItem(VISIT_STORAGE_KEY);

  let message;

  if (previousVisit === null) {
    message = "Welcome! Let us know if you have any questions.";
  } else {
    const previousTime = Number(previousVisit);
    const elapsed = now - previousTime;

    if (!Number.isFinite(previousTime) || elapsed < 0) {
      message = "Welcome! Let us know if you have any questions.";
    } else if (elapsed < MILLISECONDS_PER_DAY) {
      message = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(elapsed / MILLISECONDS_PER_DAY);
      const unit = days === 1 ? "day" : "days";

      message = `You last visited ${days} ${unit} ago.`;
    }
  }

  visitMessage.replaceChildren();

  const paragraph = document.createElement("p");
  paragraph.textContent = message;
  visitMessage.append(paragraph);

  // Save the current visit timestamp in milliseconds.
  localStorage.setItem(VISIT_STORAGE_KEY, String(now));
}


/* =========================================
   2. Create each attraction card
========================================= */

function createPlaceCard(place) {
  const article = document.createElement("article");
  article.className = "place-card";

  const heading = document.createElement("h2");
  heading.textContent = place.name;

  const figure = document.createElement("figure");
  const image = document.createElement("img");

  image.src = place.image;
  image.alt = place.alt;
  image.width = 300;
  image.height = 200;
  image.loading = "lazy";
  image.decoding = "async";

  figure.append(image);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.textContent = place.description;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "learn-more";
  button.textContent = "Learn More";
  button.setAttribute(
    "aria-label",
    `Learn more about ${place.name}`
  );

  button.addEventListener("click", () => {
    openPlaceDialog(place);
  });

  article.append(
    heading,
    figure,
    address,
    description,
    button
  );

  return article;
}


/* =========================================
   3. Render all eight cards
========================================= */

function renderDiscoverItems() {
  if (!discoverGrid) return;

  const fragment = document.createDocumentFragment();

  discoverItems.forEach((place) => {
    fragment.append(createPlaceCard(place));
  });

  discoverGrid.replaceChildren(fragment);
}


/* =========================================
   4. Learn More dialog
========================================= */

function openPlaceDialog(place) {
  dialogTitle.textContent = place.name;
  dialogAddress.textContent = place.address;
  dialogDescription.textContent = place.description;

  const mapSearch = new URLSearchParams({
    api: "1",
    query: `${place.name}, ${place.address}`
  });

  dialogMapLink.href =
    `https://www.google.com/maps/search/?${mapSearch.toString()}`;

  dialog.showModal();
}

closeDialog.addEventListener("click", () => {
  dialog.close();
});

// Close the dialog when the user clicks outside its content.
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});


/* =========================================
   5. Mobile navigation menu
========================================= */

menuToggle.addEventListener("click", () => {
  const isOpen = primaryNav.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );
});


/* =========================================
   6. Footer dates
========================================= */

document.querySelector("#current-year").textContent =
  new Date().getFullYear();

document.querySelector("#last-modified").textContent =
  document.lastModified;


/* =========================================
   7. Initialize the page
========================================= */

displayVisitMessage();
renderDiscoverItems();

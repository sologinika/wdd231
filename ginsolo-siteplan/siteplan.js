// Ginsolo Ventures Site Plan JavaScript
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#primary-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.textContent = "☰";
    });
  });
}

// Set the copyright year automatically.
const year = document.querySelector("#current-year");
if (year) year.textContent = new Date().getFullYear();

// Click a palette swatch to copy its hexadecimal color value.
const paletteMessage = document.querySelector("#palette-message");
document.querySelectorAll(".swatch").forEach(swatch => {
  swatch.addEventListener("click", async () => {
    const color = swatch.dataset.color;
    try {
      await navigator.clipboard.writeText(color);
      if (paletteMessage) paletteMessage.textContent = `${color} copied to clipboard.`;
    } catch {
      if (paletteMessage) paletteMessage.textContent = `Selected color: ${color} (copy it manually).`;
    }
  });
});

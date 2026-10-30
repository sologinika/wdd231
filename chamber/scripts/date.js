// ===============================
// CURRENT COPYRIGHT YEAR
// ===============================

const currentYear = new Date().getFullYear();

document.querySelector("#current-year").textContent = currentYear;


// ===============================
// DOCUMENT LAST MODIFIED
// ===============================

const lastModified = document.lastModified;

document.querySelector("#last-modified").textContent = lastModified;
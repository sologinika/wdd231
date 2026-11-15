```javascript
// ======================================
// ABIA CHAMBER OF COMMERCE
// THANK YOU PAGE JAVASCRIPT
// ======================================


// GET URL PARAMETERS

const urlParams = new URLSearchParams(window.location.search);


// ======================================
// RETRIEVE FORM INFORMATION
// ======================================

const firstName = urlParams.get("firstName");

const lastName = urlParams.get("lastName");

const email = urlParams.get("email");

const phone = urlParams.get("phone");

const businessName = urlParams.get("businessName");

const timestamp = urlParams.get("timestamp");


// ======================================
// DISPLAY FORM INFORMATION
// ======================================

function displayInformation(elementId, value) {

    const element = document.getElementById(elementId);

    if (element) {

        element.textContent = value || "Not provided";

    }

}


// DISPLAY REQUIRED INFORMATION

displayInformation("display-first-name", firstName);

displayInformation("display-last-name", lastName);

displayInformation("display-email", email);

displayInformation("display-phone", phone);

displayInformation("display-business", businessName);


// ======================================
// FORMAT APPLICATION DATE
// ======================================

if (timestamp) {

    const date = new Date(timestamp);

    if (!Number.isNaN(date.getTime())) {

        const formattedDate = date.toLocaleString(
            "en-NG",
            {
                dateStyle: "full",
                timeStyle: "short"
            }
        );

        displayInformation(
            "display-timestamp",
            formattedDate
        );

    } else {

        displayInformation(
            "display-timestamp",
            "Invalid timestamp"
        );

    }

} else {

    displayInformation(
        "display-timestamp",
        "Not provided"
    );

}


// ======================================
// UPDATE FOOTER YEAR
// ======================================

const currentYear = document.querySelector("#current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}
```
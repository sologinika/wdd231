```javascript
// ======================================
// ABIA CHAMBER OF COMMERCE
// MEMBERSHIP APPLICATION JAVASCRIPT
// ======================================


// SELECT FORM ELEMENTS

const membershipForm = document.querySelector("#membership-form");

const timestampField = document.querySelector("#timestamp");


// ======================================
// GENERATE CURRENT TIMESTAMP
// ======================================

if (timestampField) {

    const currentDate = new Date();

    timestampField.value = currentDate.toISOString();

}


// ======================================
// MEMBERSHIP MODALS
// ======================================

const modalLinks = document.querySelectorAll(".modal-link");

const closeButtons = document.querySelectorAll(".close-modal");


// OPEN MODALS

modalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const modalId = link.dataset.modal;

        const modal = document.getElementById(modalId);

        if (modal) {

            modal.showModal();

        }

    });

});


// CLOSE MODALS

closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal = button.closest("dialog");

        if (modal) {

            modal.close();

        }

    });

});


// ======================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ======================================

document.querySelectorAll(".membership-modal").forEach((modal) => {

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            modal.close();

        }

    });

});


// ======================================
// UPDATE FOOTER YEAR
// ======================================

const currentYear = document.querySelector("#current-year");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}
```
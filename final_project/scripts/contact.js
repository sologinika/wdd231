import "./main.js";


const form =
    document.querySelector("#quote-form");


if (form) {

    form.addEventListener(
        "submit",
        event => {

            /*
             * The form is allowed to continue
             * to form-action.html.
             */

            const formData =
                new FormData(form);


            const customerName =
                formData.get("name");


            localStorage.setItem(
                "lastCustomerName",
                customerName
            );

        }
    );

}
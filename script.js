document.addEventListener("DOMContentLoaded", function () {
    const ticketForm = document.getElementById("ticket-form");
    const visitDate = document.getElementById("visit-date");
    const visitTime = document.getElementById("visit-time");
    const ticketType = document.getElementById("ticket-type");
    const phoneNumber = document.getElementById("phone-number");
    const deliveryMethod = document.getElementById("delivery-method");

    const dateError = document.getElementById("date-error");
    const timeError = document.getElementById("time-error");
    const typeError = document.getElementById("type-error");
    const phoneError = document.getElementById("phone-error");
    const deliveryError = document.getElementById("delivery-error");

    // Validate phone number (basic validation, you may want to use a more sophisticated approach)
    function validatePhoneNumber(number) {
        const phoneRegex = /^\+\d{10,14}$/; // Example: +1234567890
        return phoneRegex.test(number);
    }

    // Ensure date is not in the past
    visitDate.addEventListener("input", function () {
        const today = new Date().toISOString().split("T")[0];
        if (visitDate.value < today) {
            dateError.textContent = "The visit date cannot be in the past.";
            visitDate.classList.add("is-invalid");
        } else {
            dateError.textContent = "";
            visitDate.classList.remove("is-invalid");
        }
    });

    // Ensure time is within museum hours (e.g., 10 AM to 6 PM)
    visitTime.addEventListener("input", function () {
        const selectedTime = visitTime.value;
        if (selectedTime < "10:00" || selectedTime > "18:00") {
            timeError.textContent = "The museum is open between 10:00 AM and 6:00 PM.";
            visitTime.classList.add("is-invalid");
        } else {
            timeError.textContent = "";
            visitTime.classList.remove("is-invalid");
        }
    });

    // Validate the form on submit
    ticketForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let valid = true;

        // Validate date
        if (visitDate.value < new Date().toISOString().split("T")[0]) {
            dateError.textContent = "Please select a valid date.";
            visitDate.classList.add("is-invalid");
            valid = false;
        } else {
            dateError.textContent = "";
            visitDate.classList.remove("is-invalid");
        }

        // Validate time
        if (visitTime.value < "10:00" || visitTime.value > "18:00") {
            timeError.textContent = "Please select a time within museum hours.";
            visitTime.classList.add("is-invalid");
            valid = false;
        } else {
            timeError.textContent = "";
            visitTime.classList.remove("is-invalid");
        }

        // Validate ticket type
        if (ticketType.value === "") {
            typeError.textContent = "Please select a ticket type.";
            ticketType.classList.add("is-invalid");
            valid = false;
        } else {
            typeError.textContent = "";
            ticketType.classList.remove("is-invalid");
        }

        // Validate phone number
        if (!validatePhoneNumber(phoneNumber.value)) {
            phoneError.textContent = "Please enter a valid phone number.";
            phoneNumber.classList.add("is-invalid");
            valid = false;
        } else {
            phoneError.textContent = "";
            phoneNumber.classList.remove("is-invalid");
        }

        // Validate delivery method
               // Validate delivery method
               if (deliveryMethod.value === "") {
                deliveryError.textContent = "Please select a delivery method.";
                deliveryMethod.classList.add("is-invalid");
                valid = false;
            } else {
                deliveryError.textContent = "";
                deliveryMethod.classList.remove("is-invalid");
            }
    
            // If the form is valid, submit the data to the server
            if (valid) {
                // Create an object with form data
                const formData = {
                    date: visitDate.value,
                    time: visitTime.value,
                    type: ticketType.value,
                    phone: phoneNumber.value,
                    deliveryMethod: deliveryMethod.value
                };
    
                // Send data to the backend (replace `your-backend-endpoint` with the actual endpoint)
                fetch('your-backend-endpoint', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Ticket purchased successfully! You will receive your ticket via " + formData.deliveryMethod + ".");
                        ticketForm.reset();
                    } else {
                        alert("There was a problem with your purchase. Please try again.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("There was an error processing your request. Please try again.");
                });
            }
        });
    });
    
    function selectMuseum(museumName) {
        window.location.href = `museum-ticket.html?museum=${encodeURIComponent(museumName)}`;
    }

    // Filter museums based on search input
    function filterMuseums() {
        const searchValue = document.getElementById('search-bar').value.toLowerCase();
        const museums = document.getElementsByClassName('museum-item');

        for (let i = 0; i < museums.length; i++) {
            const museumTitle = museums[i].getElementsByClassName('card-title')[0].innerText.toLowerCase();
            if (museumTitle.includes(searchValue)) {
                museums[i].style.display = '';
            } else {
                museums[i].style.display = 'none';
            }
        }
    }

    function selectMuseum(museumName) {
        window.location.href = `tickets.html?museum=${encodeURIComponent(museumName)}`;
    }

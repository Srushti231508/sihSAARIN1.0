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
    

    // Filter museums based on search input
 function filterMuseums() {
            // Get search input value
            let input = document.getElementById('museumSearch').value.toLowerCase();
            let cards = document.getElementsByClassName('museum-card');

            // Loop through all museum cards
            for (let i = 0; i < cards.length; i++) {
                let museumName = cards[i].getAttribute('data-museum').toLowerCase();
                
                // Show or hide cards based on the search query
                if (museumName.includes(input)) {
                    cards[i].style.display = "";
                } else {
                    cards[i].style.display = "none";
                }
            }
        }


    const museums = {
        "National Museum": {
            name: "National Museum",
            description: "Explore the nation's history and cultural heritage with a vast collection of artifacts.",
            details: "<p>The National Museum offers a comprehensive look into the history of the country, from ancient civilizations to modern times.</p>"
        },
        "Art Gallery": {
            name: "Art Gallery",
            description: "Immerse yourself in art from different eras and movements.",
            details: "<p>The Art Gallery showcases pieces from Renaissance to modern art movements.</p>"
        },
        "Science Museum": {
            name: "Science Museum",
            description: "Discover the wonders of science and technology with interactive exhibits.",
            details: "<p>The Science Museum offers interactive experiences that highlight technological advancements and scientific discoveries.</p>"
        },
        "Car Museum": {
            name: "Car Museum",
            description: "Discover the wonders of science and technology with interactive exhibits.",
            details: "<p>The Science Museum offers interactive experiences that highlight technological advancements and scientific discoveries.</p>"
        },
        "Sardar Museum": {
            name: "Sardar Museum",
            description: "Discover the wonders of science and technology with interactive exhibits.",
            details: "<p>The Science Museum offers interactive experiences that highlight technological advancements and scientific discoveries.</p>"
        },
        "LD Museum": {
            name: "LD Museum",
            description: "Discover the wonders of science and technology with interactive exhibits.",
            details: "<p>The Science Museum offers interactive experiences that highlight technological advancements and scientific discoveries.</p>"
        }
    };

    // Get the museum name from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const museumName = urlParams.get('museum');

    // Display the corresponding museum data
    if (museums[museumName]) {
        document.getElementById('museum-name').innerText = museums[museumName].name;
        document.getElementById('museum-description').innerText = museums[museumName].description;
        document.getElementById('museum-details').innerHTML = museums[museumName].details;
    } else {
        document.getElementById('museum-name').innerText = "Museum not found";
    }

    // Redirect to buy tickets
    document.getElementById('buy-ticket-btn').addEventListener('click', function() {
        window.location.href = `museum-ticket.html?museum=${encodeURIComponent(museumName)}`;
    });
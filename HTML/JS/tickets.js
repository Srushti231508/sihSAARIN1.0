document.addEventListener("DOMContentLoaded", function () {
    const ticketForm = document.getElementById("ticket-form");
    const visitDate = document.getElementById("visit-date");
    const visitTime = document.getElementById("visit-time");
    const museumName = document.getElementById("museum-name");
    const adultTicket = document.getElementById("adult-ticket");
    const childrenTicket = document.getElementById("children-ticket");
    const phoneNumber = document.getElementById("phone-number");
    const deliveryMethod = document.getElementById("delivery-method");

    const dateError = document.getElementById("date-error");
    const timeError = document.getElementById("time-error");
    const phoneError = document.getElementById("phone-error");
    const deliveryError = document.getElementById("delivery-error");

    // Museum-specific timings
    const museumTimings = {
        "Lalbhai Dalpatbhai Museum": ["10:30", "17:30"],
        "Vikram Sarabhai Space Exhibition Center (ISRO)": ["09:00", "18:00"],
        "Shreyas Folk Museum": ["09:00", "12:00", "15:30", "18:00"],
        "The Calico Museum of Textiles": ["10:30", "13:00"],
        "Auto World Vintage Car Museum": ["08:00", "21:00"],
        "NC Mehta Gallery": ["10:30", "17:30"],
        "Conflictorium": ["11:00", "19:00"]
    };

    // Museum ticket prices
    const museumTicketPrices = {
        "Lalbhai Dalpatbhai Museum": { adult: 0, children: 0 },
        "Vikram Sarabhai Space Exhibition Center (ISRO)": { adult: 0, children: 0 },
        "Shreyas Folk Museum": { adult: 30, children: 15 },
        "The Calico Museum of Textiles": { adult: 0, children: 0 },
        "Auto World Vintage Car Museum": { adult: 50, children: 25 },
        "NC Mehta Gallery": { adult: 0, children: 0 },
        "Conflictorium": { adult: 50, children: 10 }
    };

    // Validate phone number (basic validation)
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

    // Validate time based on selected museum
    function validateVisitTime(selectedMuseum) {
        const selectedTime = visitTime.value;
        let museumTiming = museumTimings[selectedMuseum];

        if (museumTiming.length === 4) {
            if ((selectedTime >= museumTiming[0] && selectedTime <= museumTiming[1]) ||
                (selectedTime >= museumTiming[2] && selectedTime <= museumTiming[3])) {
                timeError.textContent = "";
                visitTime.classList.remove("is-invalid");
            } else {
                timeError.textContent = "Please select a time within the museum's working hours.";
                visitTime.classList.add("is-invalid");
            }
        } else if (museumTiming.length === 2) {
            if (selectedTime >= museumTiming[0] && selectedTime <= museumTiming[1]) {
                timeError.textContent = "";
                visitTime.classList.remove("is-invalid");
            } else {
                timeError.textContent = "Please select a time within the museum's working hours.";
                visitTime.classList.add("is-invalid");
            }
        }
    }

    visitTime.addEventListener("input", function () {
        const selectedMuseum = museumName.value;
        if (selectedMuseum) {
            validateVisitTime(selectedMuseum);
        } else {
            timeError.textContent = "Please select a museum first.";
            visitTime.classList.add("is-invalid");
        }
    });

    museumName.addEventListener("change", function () {
        updateMuseumInfo();
    });

    // Update museum timing and ticket prices dynamically
    function updateMuseumInfo() {
        const selectedMuseum = museumName.value;
        const timing = document.getElementById("museum-timing");
        const ticketInfo = document.getElementById("museum-ticket");

        if (museumTimings[selectedMuseum]) {
            timing.innerText = `Timings: ${museumTimings[selectedMuseum].join(" - ")}`;
            ticketInfo.innerText = `Adult Ticket: ₹${museumTicketPrices[selectedMuseum].adult}, Children Ticket: ₹${museumTicketPrices[selectedMuseum].children}`;
        } else {
            timing.innerText = "";
            ticketInfo.innerText = "";
        }
    }

    // Validate form before submission
    ticketForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let valid = true;

        // Date validation
        const today = new Date().toISOString().split("T")[0];
        if (visitDate.value < today) {
            dateError.textContent = "Please select a valid date.";
            visitDate.classList.add("is-invalid");
            valid = false;
        } else {
            dateError.textContent = "";
            visitDate.classList.remove("is-invalid");
        }

        // Phone number validation
        if (!validatePhoneNumber(phoneNumber.value)) {
            phoneError.textContent = "Please enter a valid phone number in international format.";
            phoneNumber.classList.add("is-invalid");
            valid = false;
        } else {
            phoneError.textContent = "";
            phoneNumber.classList.remove("is-invalid");
        }

        // Delivery method validation
        if (deliveryMethod.value === "") {
            deliveryError.textContent = "Please select a delivery method.";
            deliveryMethod.classList.add("is-invalid");
            valid = false;
        } else {
            deliveryError.textContent = "";
            deliveryMethod.classList.remove("is-invalid");
        }

        // Ensure at least one ticket is selected
        const adultTicketCount = parseInt(adultTicket.value);
        const childrenTicketCount = parseInt(childrenTicket.value);

        if (adultTicketCount === 0 && childrenTicketCount === 0) {
            alert("Please select at least one ticket.");
            valid = false;
        }

        // If valid, submit the data to the server
        if (valid) {
            const formData = {
                museum: museumName.value,
                date: visitDate.value,
                time: visitTime.value,
                adultTickets: adultTicketCount,
                childrenTickets: childrenTicketCount,
                phone: phoneNumber.value,
                deliveryMethod: deliveryMethod.value
            };

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

document.addEventListener("DOMContentLoaded", function () {
    const visitTime = document.getElementById("visit-time");

    function enforceTimeIntervals() {
        const value = visitTime.value;
        if (value) {
            const [hours, minutes] = value.split(':').map(Number);
            const roundedMinutes = Math.round(minutes / 15) * 15;
            const correctedMinutes = roundedMinutes === 60 ? 0 : roundedMinutes;
            visitTime.value = `${hours.toString().padStart(2, '0')}:${correctedMinutes.toString().padStart(2, '0')}`;
        }
    }

    visitTime.addEventListener('change', enforceTimeIntervals);
});

// document.addEventListener("DOMContentLoaded", function () {
//     const adultTicketInput = document.getElementById("adult-ticket");
//     const childrenTicketInput = document.getElementById("children-ticket");
//     const museumSelect = document.getElementById("museum-name");
//     const adultTotal = document.getElementById("adult-total");
//     const childrenTotal = document.getElementById("children-total");
//     const totalPayment = document.getElementById("total-payment");

//     const museumPrices = {
//         "Lalbhai Dalpatbhai Museum": { adult: 0, children: 0 },
//         "Vikram Sarabhai Space Exhibition Center (ISRO)": { adult: 0, children: 0 },
//         "Shreyas Folk Museum": { adult: 30, children: 30 },
//         "The Calico Museum of Textiles": { adult: 0, children: 0 },
//         "Auto World Vintage Car Museum": { adult: 50, children: 50 },
//         "NC Mehta Gallery": { adult: 0, children: 0 },
//         "Conflictorium": { adult: 50, children: 10 }
//     };

//     function updateTotals() {
//         const selectedMuseum = museumSelect.value;
//         const numAdultTickets = parseInt(adultTicketInput.value) || 0;
//         const numChildrenTickets = parseInt(childrenTicketInput.value) || 0;

//         if (selectedMuseum) {
//             const prices = museumPrices[selectedMuseum];
//             const adultTicketPrice = prices.adult;
//             const childrenTicketPrice = prices.children;

//             const totalAdult = numAdultTickets * adultTicketPrice;
//             const totalChildren = numChildrenTickets * childrenTicketPrice;
//             const total = totalAdult + totalChildren;

//             // Update the display
//             adultTotal.textContent = `Adult Ticket Total: ₹${totalAdult}`;
//             childrenTotal.textContent = `Children Ticket Total: ₹${totalChildren}`;
//             totalPayment.textContent = `Total Payment: ₹${total}`;
//         } else {
//             // If no museum is selected, reset totals
//             adultTotal.textContent = `Adult Ticket Total: ₹0`;
//             childrenTotal.textContent = `Children Ticket Total: ₹0`;
//             totalPayment.textContent = `Total Payment: ₹0`;
//         }
//     }

    // Attach event listeners
//     adultTicketInput.addEventListener("input", updateTotals);
//     childrenTicketInput.addEventListener("input", updateTotals);
//     museumSelect.addEventListener("change", updateTotals);

//     // Initial call to update totals
//     updateTotals();
// });

    // Listen for museum selection changes
    document.getElementById('museum-name').addEventListener('change', function() {
        const selectedMuseum = this.value;

        // Find the selected museum's prices from the JSON object
        const museum = museumPrices.find(museum => museum.name === selectedMuseum);
        
        if (museum) {
            // Get the number of adult and children tickets selected
            const adultTickets = parseInt(document.getElementById('adult-ticket').value);
            const childrenTickets = parseInt(document.getElementById('children-ticket').value);

            // Calculate the total cost
            const totalAdultPrice = adultTickets * museum.adult_price;
            const totalChildrenPrice = childrenTickets * museum.children_price;
            const totalPayment = totalAdultPrice + totalChildrenPrice;

            // Display the prices
            document.getElementById('adult-total').innerHTML = "Adult Ticket Total: ₹" + totalAdultPrice;
            document.getElementById('children-total').innerHTML = "Children Ticket Total: ₹" + totalChildrenPrice;
            document.getElementById('total-payment').innerHTML = "Total Payment: ₹" + totalPayment;
        }
    });


document.addEventListener("DOMContentLoaded", function() {
    // Select all 'Learn More' buttons
    const learnMoreButtons = document.querySelectorAll(".btn-primary");

    learnMoreButtons.forEach(button => {
        button.addEventListener("click", function() {
            // Get the museum name from the parent card's data attribute
            const museumCard = this.closest('.museum-card');
            const museumName = museumCard.getAttribute('data-museum');

            // Redirect to museum-info.html with the museum name as a query parameter
            window.location.href = `museum-info.html?museum=${encodeURIComponent(museumName)}`;
        });
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

    // Fetch data from the PHP backend
fetch('http://localhost/your_repository/api.php')
.then(response => response.json())
.then(data => {
    console.log(data);  // Data fetched from MySQL through PHP
    // Use the fetched data in your frontend
})
.catch(error => console.error('Error:', error));

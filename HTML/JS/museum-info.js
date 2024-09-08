const museumsData = {
    "Vikram Sarabhai Space Exhibition Center (ISRO)": {
        image: "/Assets/IMAGES/vikram1.jpg",
        description: "The Vikram Sarabhai Space Exhibition Center showcases India's space achievements, featuring models, exhibits, and information about the ISRO’s history and contributions."
    },
    "Shreyas Folk Museum": {
        image: "/Assets/IMAGES/shreyas1.jpg",
        description: "The Shreyas Folk Museum is a celebration of Indian folk art, culture, and heritage, featuring rare artifacts and traditional arts from across the country."
    },
    "The Calico Museum of Textiles": {
        image: "/Assets/IMAGES/calico1.jpg",
        description: "The Calico Museum of Textiles is renowned for its vast collection of Indian textiles, offering insights into the intricate craft of weaving, dyeing, and printing."
    },
    "Auto World Vintage Car Museum": {
        image: "/Assets/IMAGES/autovintage1.jpeg",
        description: "Auto World Vintage Car Museum houses an impressive collection of vintage cars, showcasing the evolution of automobile design and engineering."
    },
    "NC Mehta Gallery": {
        image: "/Assets/IMAGES/nc1.jpg",
        description: "NC Mehta Gallery features a fine collection of miniature paintings, offering a glimpse into India's rich artistic heritage."
    },
    "Conflictorium": {
        image: "/Assets/IMAGES/Conflictorium1.jpg",
        description: "Conflictorium is a unique museum that focuses on conflict resolution, encouraging discussions and creative exploration of societal issues."
    }
};

// Function to get the query parameter from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to load museum data based on the URL parameter
function loadMuseumData() {
    const museumName = getQueryParam("museum");

    if (museumName && museumsData[museumName]) {
        const museumInfo = museumsData[museumName];

        // Set the museum title
        document.getElementById("museum-title").textContent = museumName;

        // Set the museum content (image and description)
        const museumContentDiv = document.getElementById("museum-content");
        museumContentDiv.innerHTML = `
            <img src="${museumInfo.image}" alt="${museumName}" class="img-fluid mb-4" style="max-width: 100%;">
            <p>${museumInfo.description}</p>
        `;
    } else {
        document.getElementById("museum-title").textContent = "Museum not found";
        document.getElementById("museum-content").innerHTML = "<p>We couldn't find the museum you were looking for.</p>";
    }
}

// Call the function to load museum data when the page loads
document.addEventListener("DOMContentLoaded", loadMuseumData);
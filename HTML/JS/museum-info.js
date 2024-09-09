const museumsData = {
    "Vikram Sarabhai Space Exhibition Center (ISRO)": {
        images: [
            "/Assets/IMAGES/vikram1.jpg",
            "/Assets/IMAGES/vikram2.webp",
            "/Assets/IMAGES/vikram3.jpeg"
        ],
        description: "The Vikram Sarabhai Space Exhibition Center in Ahmedabad is a significant facility dedicated to showcasing India's advancements in space science and technology. Named after the visionary Indian scientist Dr. Vikram Sarabhai, the founder of the Indian Space Research Organisation (ISRO), the center serves as an educational and inspirational hub for space enthusiasts and the general public. Located at the Space Applications Centre (SAC) campus in Ahmedabad, the exhibition offers visitors a deep insight into ISRO’s journey, from its humble beginnings to its remarkable achievements in satellite launches, space exploration, and communication technologies. The center features a range of interactive exhibits, models of satellites, rockets, and launch vehicles, as well as multimedia presentations that explain various space missions, such as the Mars Orbiter Mission (Mangalyaan), Chandrayaan, and various communication and weather satellites. It also highlights the critical role space technology plays in everyday life, including areas like telecommunication, meteorology, navigation, and disaster management. Through informative displays and demonstrations, the Vikram Sarabhai Space Exhibition Center fosters curiosity about space exploration and provides an engaging learning experience, particularly for students, inspiring future generations to take an interest in science and space research.",
        // video: "https://example.com/video-link", // optional
        additionalDetails: "Explore more about ISRO's significant contributions to space exploration..."
    },
    "Shreyas Folk Museum": {
        images: [
            "/Assets/IMAGES/shreyas1.jpg",
            "/Assets/IMAGES/shreyas2.jpg"
        ],
        description: "The Shreyas Folk Museum is a celebration of Indian folk art...",
        additionalDetails: "This museum offers a unique collection of traditional arts, rare artifacts..."
    },
    "The Calico Museum of Textiles": {
        images: [
            "/Assets/IMAGES/shreyas1.jpg",
            "/Assets/IMAGES/shreyas2.jpg"
        ],
        description: "The Shreyas Folk Museum is a celebration of Indian folk art...",
        additionalDetails: "This museum offers a unique collection of traditional arts, rare artifacts..."
    },
    "Auto World Vintage Car Museum": {
        images: [
            "/Assets/IMAGES/shreyas1.jpg",
            "/Assets/IMAGES/shreyas2.jpg"
        ],
        description: "The Shreyas Folk Museum is a celebration of Indian folk art...",
        additionalDetails: "This museum offers a unique collection of traditional arts, rare artifacts..."
    },
    "NC Mehta Gallery": {
        images: [
            "/Assets/IMAGES/shreyas1.jpg",
            "/Assets/IMAGES/shreyas2.jpg"
        ],
        description: "The Shreyas Folk Museum is a celebration of Indian folk art...",
        additionalDetails: "This museum offers a unique collection of traditional arts, rare artifacts..."},
    "Conflictorium": {
        images: [
            "/Assets/IMAGES/shreyas1.jpg",
            "/Assets/IMAGES/shreyas2.jpg"
        ],
        description: "The Shreyas Folk Museum is a celebration of Indian folk art...",
        additionalDetails: "This museum offers a unique collection of traditional arts, rare artifacts..."}
};

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

        // Load images into the gallery
        const galleryDiv = document.getElementById("museum-gallery");
        galleryDiv.innerHTML = '';  // Clear previous content
        museumInfo.images.forEach(imageUrl => {
            const imgElement = document.createElement("img");
            imgElement.src = imageUrl;
            imgElement.alt = museumName;
            imgElement.className = "col-md-4 mb-3 img-fluid";
            galleryDiv.appendChild(imgElement);
        });

        // Set the museum description and additional details
        const descriptionDiv = document.getElementById("museum-description");
        descriptionDiv.innerHTML = `<p>${museumInfo.description}</p>
                                    <p><strong>Additional Information:</strong> ${museumInfo.additionalDetails}</p>`;

        // Load video if available
        if (museumInfo.video) {
            const videoDiv = document.getElementById("museum-video");
            videoDiv.innerHTML = `<h5>Watch More</h5>
                                  <iframe width="100%" height="315" src="${museumInfo.video}" frameborder="0" allowfullscreen></iframe>`;
        }

        // Ensure the speech synthesis works correctly
        document.getElementById("speak-button").addEventListener("click", function() {
            speakDescription(museumInfo.description);
        });
        // Add event listener to the "Stop Listening" button
        document.getElementById("stop-button").addEventListener("click", function() {
            stopSpeech();
        });

    } else {
        document.getElementById("museum-title").textContent = "Museum not found";
        document.getElementById("museum-content").innerHTML = "<p>We couldn't find the museum you were looking for.</p>";
    }
}

// Function to speak the museum description
function speakDescription(text) {
    if ('speechSynthesis' in window) {
        const message = new SpeechSynthesisUtterance();
        message.text = text;
        message.lang = 'en-US';  // Optionally set the language
        window.speechSynthesis.speak(message);
    } else {
        alert('Sorry, your browser does not support speech synthesis.');
    }
}
// Function to stop the speech synthesis
function stopSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}
// Stop speech when user navigates away from the page or closes it
window.addEventListener("beforeunload", function () {
    stopSpeech(); // Stop speech synthesis when the user closes or reloads the page
});

// Stop speech when the page becomes hidden (e.g., switching tabs)
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "hidden") {
        stopSpeech(); // Stop speech synthesis when the page is hidden
    }
});


// Call the function to load museum data when the page loads
document.addEventListener("DOMContentLoaded", loadMuseumData);
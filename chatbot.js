// Get references to HTML elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Function to scroll chat box to the bottom
function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to add a message to the chat box
function addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message',{sender}-message);
    const span = document.createElement('span');
    span.textContent = message;
    messageElement.appendChild(span);
    chatBox.appendChild(messageElement);
    scrollToBottom();
}

// Simulated chatbot response
function chatbotResponse(userMessage) {
    const responses = {
        "hello": "Hi there! Welcome to the Museum Ticket Booking system. How can I assist you today?",
        "book tickets": "Sure! How many tickets would you like to book?",
        "1 ticket": "Great! One ticket for an adult is $20. Would you like to proceed with the payment?",
        "yes": "Please enter your payment details to complete the booking.",
        "no": "No problem! Feel free to ask if you need anything else.",
        "thanks": "You're welcome! Enjoy your visit to the museum."
    };

    const botMessage = responses[userMessage.toLowerCase()] || "I'm sorry, I didn't understand that. Can you rephrase?";
    addMessage(botMessage, 'bot');
}

// Send button click event
sendBtn.addEventListener('click', function () {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        addMessage(userMessage, 'user');
        chatbotResponse(userMessage);
        userInput.value = '';
    }
});

// Enter key press event
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendBtn.click();
    }
});

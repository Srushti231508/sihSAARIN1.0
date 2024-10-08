<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Museum Name | Tickets</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <!-- <link rel="stylesheet" href="CSS/styles.css"> -->
    <link rel="stylesheet" href="CSS/tickets.css">
</head>
<body class="tickets"> 
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="index.html">Museum Name</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="exhibits.html">Exhibits</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="tickets.php">Tickets</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="events.html">Events</a>
                    </li>
                    <!-- <li class="nav-item">
                        <a class="nav-link" href="visitor-info.html">Visitor Info</a>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link" href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
        <br><br>
    </header>
    <main class="content">
        <div class="container mt-5">
            <div class="con">
                <h1>Buy Tickets</h1>
                <p>Select the date, time, and details of your visit.</p>
                <div class="form1">
                <form id="ticket-form" action="process_ticket.php" method="post">
                    <!-- Museum selection -->
                    <label for="museum-name">Select Museum:</label>
                    <select id="museum-name">
                        <option value="">Select a museum</option>
                        <option value="1">Lalbhai Dalpatbhai Museum</option>
                        <option value="2">Vikram Sarabhai Space Exhibition Center (ISRO)</option>
                        <option value="3">Shreyas Folk Museum</option>
                        <option value="4">The Calico Museum of Textiles</option>
                        <option value="5">Auto World Vintage Car Museum</option>
                        <option value="6">NC Mehta Gallery</option>
                        <option value="7">Conflictorium</option>
                    </select>
                
                    <!-- Ticket Categories -->
                    <label for="adult-ticket">Adult Tickets:</label>
                    <input type="number" id="adult-ticket" value="0" min="0">
                    
                    <label for="children-ticket">Children Tickets:</label>
                    <input type="number" id="children-ticket" value="0" min="0">
                
                    <!-- Date -->
                    <label for="visit-date">Visit Date:</label>
                    <input type="date" id="visit-date">
                    <div id="date-error" class="error"></div>
                
                    <!-- Time -->
                    <!-- Time -->
                    <label for="visit-time">Visit Time:</label>
                    <input type="time" id="visit-time" min="00:00" max="23:59">
                    <div id="time-error" class="error"></div>

                
                    <!-- Phone Number -->
                    <label for="phone-number">Phone Number (Indian Format):</label>
                    <input type="tel" id="phone-number" placeholder="+911234567890">
                    <div id="phone-error" class="error"></div>

                                            <!-- Email Address -->
                    <label for="email-address">Email Address:</label>
                    <input type="email" id="email-address" placeholder="you@example.com">
                    <div id="email-error" class="error"></div>
                    
                
                    <!-- Delivery Method -->
                    <label for="delivery-method">Delivery Method:</label>
                    <select id="delivery-method">
                        <option value="">Select delivery method</option>
                        <option value="email">Email</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="sms">SMS</option>
                    </select>
                    <div id="delivery-error" class="error"></div>
                
                    <!-- Submit Button -->
                    <button type="submit">Buy Tickets</button>
                </form>
            </div>

            <div id="total-calculation">
                <h3>Total Calculation</h3>
                <p id="adult-total">Adult Ticket Total: ₹0</p>
                <p id="children-total">Children Ticket Total: ₹0</p>
                <p id="total-payment">Total Payment: ₹0</p>
            </div>
                <!-- Museum Info -->
                <div id="museum-info">
                    <p id="museum-timing"></p>
                    <p id="museum-ticket"></p>
                </div>
                
    </main>

    <?php
// Connect to the database
$servername = "localhost";
$username = "root";
$password = ""; // your DB password
$dbname = "museum_ticketing_system";

// Create connection
$conn = new mysqli1($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all museum prices
$sql = "SELECT name, ticket_price_adult, ticket_price_children FROM museums";
$result = $conn->query($sql);

$museums = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $museums[] = $row;
    }
}

// Close the connection
$conn->close();

// Pass museum data as JSON to JavaScript
echo "<script>var museumPrices = " . json_encode($museums) . ";</script>";
?>


    <footer class="text-muted text-center py-4">
        <div class="container">
            <p>&copy; 2024 Museum Name. All rights reserved.</p>
        </div>
    </footer>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="JS/tickets.js"></script>
    <!-- <link rel="php" href="/php/process_ticket.php">
    <link rel="php" href="/php/db.php"> -->

</body>
</html>

<?php
// Connect to the database
$servername = "localhost";
$username = "root";
$password = ""; // Your database password
$dbname = "museum_ticketing_system";

$conn = new mysqli($servername, $username, $password, $dbname);


// Check connection
if ($conn->connect_error) {
    
    die("Connection failed: " . $conn->connect_error);
}
else { echo"connectes";}

// Fetch all museum prices
$price_sql = "SELECT name, ticket_price_adult, ticket_price_children FROM museums";
$result = $conn->query($price_sql);

$museums = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $museums[] = $row;
    }
}

// Close connection
$conn->close();

// Pass the museum data as JSON to JavaScript
echo "<script>var museumPrices = " . json_encode($museums) . ";</script>";


<?php
$servername = "localhost";
$username = "root"; // Default WAMP MySQL user
$password = ""; // Leave empty if no password is set
$dbname = "museum_ticketing_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
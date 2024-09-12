<?php
// db.php
$host = "127.0.0.1"; // Change to your database host
$db = "saarin"; // Your database name
$user = "root"; // Your database username
$pass = "Het@1992"; // Your database password

try {
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    // Set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully"; // This message will appear if the connection is successful
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage(); // This message will appear if the connection fails
}
?>
?>

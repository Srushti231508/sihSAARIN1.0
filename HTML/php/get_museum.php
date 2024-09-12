<?php
// Database connection parameters
$host = 'localhost';
$db = 'museum_ticketing_system'; // Replace with your database name
$user = 'root'; // Replace with your database username
$pass = ''; // Replace with your database password

// Create a new PDO instance
try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Define the SQL query
    $sql = 'SELECT museum_id, name, description, location, image FROM museums';

    // Execute the query
    $stmt = $pdo->query($sql);
    
    // Fetch all results as an associative array
    $museums = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Set the content type to JSON
    header('Content-Type: application/json');

    // Output the results as JSON
    echo json_encode($museums);

} catch (PDOException $e) {
    // Output an error message if the connection fails
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
}
?>

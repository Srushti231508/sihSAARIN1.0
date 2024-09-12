<?php
// Include the database connection file
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $museum_id = $_POST['museum_name'];
    $visit_date = $_POST['visit_date'];
    $visit_time = $_POST['visit_time'];
    $adult_tickets = $_POST['adult_tickets'];
    $children_tickets = $_POST['children_tickets'];
    $phone = $_POST['phone_number'];
    $email = $_POST['email_address'];

    // Fetch ticket prices for the selected museum
    $price_sql = "SELECT ticket_price_adult, ticket_price_children FROM museums WHERE id = '$museum_id'";
    $result = $conn->query($price_sql);

    if ($result->num_rows > 0) {
        // Fetch the prices
        $row = $result->fetch_assoc();
        $adult_price = $row['adult_price'];
        $children_price = $row['children_price'];
        
        // Calculate total amount
        $total_amount = ($adult_tickets * $adult_price) + ($children_tickets * $children_price);

        // Insert the ticket data into the tickets table
        $sql = "INSERT INTO tickets (museum_id, date, time, adult_tickets, children_tickets, total_amount, status)
                VALUES ('$museum_id', '$visit_date', '$visit_time', '$adult_tickets', '$children_tickets', '$total_amount', 'pending')";

        if ($conn->query($sql) === TRUE) {
            echo "Ticket booked successfully! Total Payment: ₹$total_amount";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    } else {
        echo "Error fetching museum prices.";
    }

    // Close the database connection
    $conn->close();
}
?>

<?php
// Include database connection
include('db.php');

header('Content-Type: application/json');

// Use prepared statement
$sql = "SELECT id, name, description, price, image FROM products";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result   = $stmt->get_result();
$products = $result->fetch_all(MYSQLI_ASSOC);

// Return products as JSON
echo json_encode($products, JSON_PRETTY_PRINT);

// Close connection
$stmt->close();
$conn->close();

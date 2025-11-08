<?php
// Return JSON response
header("Content-Type: application/json");

// Include DB connection
include 'db.php';

// Read JSON from request
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (
  empty($data['name']) ||
  empty($data['address']) ||
  empty($data['phone']) ||
  empty($data['items']) ||
  empty($data['total'])
) {
  echo json_encode(["status" => "error", "message" => "Missing required fields"]);
  exit;
}

// Clean input
$name = htmlspecialchars($data['name']);
$address = htmlspecialchars($data['address']);
$phone = htmlspecialchars($data['phone']);
$total = floatval($data['total']);
$items = json_encode($data['items']);

// Insert into DB
try {
  $sql = "INSERT INTO orders (customer_name, address, phone, total, items)
          VALUES (?, ?, ?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("sssds", $name, $address, $phone, $total, $items);

  if ($stmt->execute()) {
    echo json_encode([
      "status" => "success",
      "message" => "Order placed successfully",
      "order_id" => $stmt->insert_id
    ]);
  } else {
    echo json_encode(["status" => "error", "message" => "Failed to save order"]);
  }

  $stmt->close();
  $conn->close();

} catch (Exception $e) {
  echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}
?>

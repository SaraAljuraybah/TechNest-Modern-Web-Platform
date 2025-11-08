<?php
session_start();
include("db.php");

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = trim($_POST["username"] ?? "");
    $password = trim($_POST["password"] ?? "");

    if ($username === "" || $password === "") {
        echo json_encode(["status" => "error", "message" => "Please fill all fields."]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $res = $stmt->get_result();

    if ($res->num_rows === 0) {
        echo json_encode(["status" => "error", "message" => "User not found."]);
        exit;
    }

    $user = $res->fetch_assoc();
    $hashed = $user["password"];

    if (password_verify($password, $hashed)) {
        $_SESSION["user_id"] = $user["id"];
        $_SESSION["username"] = $user["username"];
        $_SESSION["email"] = $user["email"];

        echo json_encode([
            "status" => "success",
            "message" => "Login successful!",
            "redirect" => "../frontend/index.html"
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect password."]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>

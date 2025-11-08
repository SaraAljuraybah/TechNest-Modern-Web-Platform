<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === '' || $email === '' || $password === '') {
        echo "<script>alert('⚠️ Please fill all fields.'); window.history.back();</script>";
        exit;
    }

    try {
        // تحقق من وجود المستخدم أو الإيميل مسبقًا
        $checkSql = "SELECT id FROM users WHERE username = ? OR email = ?";
        $checkStmt = $conn->prepare($checkSql);
        $checkStmt->bind_param("ss", $username, $email);
        $checkStmt->execute();
        $checkRes = $checkStmt->get_result();

        if ($checkRes->num_rows > 0) {
            echo "<script>alert('❌ Username or Email already exists.'); window.history.back();</script>";
            exit;
        }
        $checkStmt->close();

        // تشفير كلمة المرور
        $hashed = password_hash($password, PASSWORD_DEFAULT);

        // إدخال المستخدم الجديد
        $insertSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        $insertStmt = $conn->prepare($insertSql);
        $insertStmt->bind_param("sss", $username, $email, $hashed);

        if ($insertStmt->execute()) {
            // ✅ نجاح التسجيل → بوب أب + تحويل تلقائي
            echo "
                <script>
                    alert('🎉 Account created successfully! You will be redirected to Login page.');
                    setTimeout(() => {
                        window.location.href = '../frontend/login.html';
                    }, 1500);
                </script>
            ";
        } else {
            echo 'Signup failed. SQL Error: ' . $insertStmt->error;
        }

        $insertStmt->close();

    } catch (Exception $e) {
        echo 'Error: ' . $e->getMessage();
    }

    $conn->close();
}
?>

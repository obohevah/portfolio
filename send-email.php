<?php
require "vendor/autoload.php";
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header("Content-Type: application/json");

$name = $_POST["name"] ?? '';
$email = $_POST["email"] ?? '';
$subject = $_POST["subject"] ?? '';
$message = $_POST["messages"] ?? '';

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(["status" => "error", "message" => "All fields are required."]);
    exit;
}

try {
    $mail = new PHPMailer(true);

    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'mail.webmast.com.ng'; // Check your cPanel for the correct SMTP host
    $mail->SMTPAuth = true;
    $mail->Username = 'evah@webmast.com.ng'; // Your email address
    $mail->Password = 'XnON)oq@889@'; // Your email password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Use ENCRYPTION_STARTTLS if using port 587
    $mail->Port = 465; // 465 for SSL, 587 for TLS

    // Set From (must match SMTP email)
    $mail->setFrom('evah@webmast.com.ng', 'Evah'); // Do NOT set this to user's email

    // Send Email to Admin
    $mail->addAddress("obohevah@gmail.com", "Evah"); 
    $mail->Subject = $subject;
    $mail->Body = "Name: $name\nEmail: $email\n\n$message";
    
    if ($mail->send()) {
        // Auto-reply to the sender
        $mail->clearAddresses(); // Clear previous recipient
        $mail->addAddress($email, $name);
        $mail->Subject = "Thank You for Your Message!";
        $mail->Body = "Hello $name,\n\nThank you for reaching out! If you need more information, contact us at 07018797590 or via WhatsApp: https://wa.me/2347018797590\n\nBest Regards,\nEvah";

        $mail->send();
         // ✅ Explicitly stop execution after sending response
        echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
        exit;
    } else {
        echo json_encode(["status" => "error", "message" => "Error sending message."]);
        exit;
    }
} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => "Mailer Error: " . $mail->ErrorInfo]);
    exit;
}

?>

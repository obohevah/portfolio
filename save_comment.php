<?php
include 'db_connect.php';

header("Content-Type: application/json");

// Get the raw POST data
$data = json_decode(file_get_contents("php://input"), true);

// Check if data is received properly
if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

// Validate input fields
$blogSlug = isset($data['blogSlug']) ? trim($data['blogSlug']) : null;
$username = isset($data['username']) ? trim($data['username']) : null;
$commentText = isset($data['commentText']) ? trim($data['commentText']) : null;
$parent_id = isset($data['parent_id']) && $data['parent_id'] !== null ? intval($data['parent_id']) : null;

// Check if required fields are filled
if (!$blogSlug || !$username || !$commentText) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

// Debugging log (Check what's being received)
file_put_contents("debug_log.txt", print_r($data, true)); 

// Prepare SQL query
$sql = "INSERT INTO comments (blogSlug, username, commentText, parent_id) VALUES (?, ?, ?, ?)";
$stmt = $con->prepare($sql);
$stmt->bind_param("sssi", $blogSlug, $username, $commentText, $parent_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(["status" => "success", "id" => $stmt->insert_id]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to save comment"]);
}

$stmt->close();
$con->close();
?>

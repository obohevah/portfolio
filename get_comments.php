<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'db_connect.php';

header("Content-Type: application/json");

if (!isset($_GET['blogSlug'])) {
    echo json_encode(["status" => "error", "message" => "Blog slug is required"]);
    exit();
}

$blogSlug = $_GET['blogSlug'];
$sql = "SELECT * FROM comments WHERE blogSlug = ? ORDER BY created_at ASC";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $blogSlug);
$stmt->execute();
$result = $stmt->get_result();

$comments = [];
while ($row = $result->fetch_assoc()) {
    $comments[] = $row;
}

echo json_encode($comments);
?>

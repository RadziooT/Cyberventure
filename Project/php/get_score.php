<?php
include 'db_info.php';

$conn = new mysqli($servername, $username, $password, $databasename);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT * FROM highscores ORDER BY (Score) DESC LIMIT 5;";

$result = mysqli_query($conn, $query);

$index = 0;
$rows = array();
while ($r = mysqli_fetch_assoc($result)) {
    $rows[$index] = $r;
    $index += 1;
}
print json_encode($rows);

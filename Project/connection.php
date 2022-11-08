<?php
$servername = "localhost";
$username = "root";
$password = "";
$databasename = "scores_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $databasename);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

echo "Connected successfully";

$sql = "SELECT * FROM highscores ORDER BY (SCORE) DESC LIMIT 5;";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo $row['Name'];
        echo $row['Score'];
        echo "\\";
    }
}

?>
<!-- //ds -->
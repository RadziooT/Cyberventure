<?php
$servername = "localhost";
$username = "root";
$password = "";
$databasename = "scores_db";

$name = $_POST['Name'];
$score = $_POST['Score'];

$conn = new mysqli($servername, $username, $password, $databasename);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if (empty($name)) {
} else {
    $query = "INSERT INTO highscores(Name,Score) values('$name','$score')";
    $result = mysqli_query($conn, $query);
}

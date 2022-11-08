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

$query = "SELECT * FROM highscores ORDER BY (Score) DESC LIMIT 5;";

$result = mysqli_query($conn, $query);

//echo $result;


// die($conn);
?>
<script type="text/javascript">
    test = "<?php echo $result; ?>";
    console.log("PHP");
    console.log(test);
</script>
<!-- //ds -->
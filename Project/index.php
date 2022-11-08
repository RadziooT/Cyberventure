<?php
include_once 'connection.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Floppy Bird</title>
    <meta name="description" content="Our Game, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="cyberButtons.css">
    <link rel="stylesheet" href="glitch.css">
    <link rel="stylesheet" href="volume.css">
    <link rel="shortcut icon" href="#">
    <link rel="stylesheet" href="fontawesome-free-6.2.0-web/css/all.css">

    <script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/p5.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.5.0/lib/addons/p5.sound.js"></script>
    <script src="game.js"></script>
    <script src="div_master.js"></script>
    <script src="Image_rendering.js"></script>
    <script src="player.js"></script>
    <script src="object.js"></script>
    <script src="laser.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js" integrity="sha512-aVKKRRi/Q/YV+4mjoKBsE4x3H+BkegoM/em46NNlCqNTmUYADjBbeNefNxYV7giUp0VxICtqdrbqU7iVaeZNXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-ajaxtransport-xdomainrequest/1.0.4/jquery.xdomainrequest.min.js" integrity="sha512-AqrEfeiUZBu9nWx7jHZlve8pPY3Mavhhwobv+pVxTSc10vpElmhFNDqe8DopVSvApKGfUrOQO3OshR8avd+pTw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->

</head>

<body style="background-color:rgb(0, 0, 0); color: white;font-size: xx-large;">
    <div class="disable-dbl-tap-zoom" id="canvas_sketch" style="position: relative;"></div>
</body>

</html>
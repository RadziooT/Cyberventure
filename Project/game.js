if (localStorage.getItem('PersonalBest') == null)
    localStorage.setItem('PersonalBest', 0);

var bestscore = localStorage.getItem('PersonalBest');
var player;
var counter = 0;
var gameRunning = false;
var objects = [];
var score = 0;
var laser;
var obstacle_distance;
var obstacle_amount;
const pickup_intensity = 1;
const laser_intensity = 5;
const laser_timer = 400;
const frames_per_obstacle = 160;

var start_menu_div, end_screen_div, authors_div, options_div, sound_div; //divs responsible for different windows of game

//TESTING DATA FOR LEADERBOARD
dbData =
    [
        {
            "name": "Radzio",
            "score": 2
        },
        {
            "name": "Mati",
            "score": 314
        },
        {
            "name": "Boliver",
            "score": 69
        },
        {
            "name": "Pabloskyy",
            "score": "Dota"
        },
        {
            "name": "Kulson",
            "score": "asud"
        },
        {
            "name": "Wyrzo",
            "score": "ej"
        },
    ]

var soundtrack_volume_state;
var jump_volume_state;
var soundtrack;
var never_played = 1;//made to get rid of annoying blocking of autoplay
var jump_sound, end_sound;

//-----------------------------------Responsible for customizing game experience by user-----------------------------------
var obstacle_gravity = false;
var obstacle_laser = false;
var obstacle_additional_points = false;

function preload() {
    player_img = loadImage('images/player.png');
    collectible = loadImage('images/collectible.png');
    obstacle = loadImage('images/obstacle.png');

    laser_1 = loadImage('images/laser_1.png');
    laser_2 = loadImage('images/laser_2.png');
    laser_3 = loadImage('images/laser_3.png');
    laser_4 = loadImage('images/laser_4.png');

    game_background_s = loadImage('images/480p/s.png');
    game_background_b1 = loadImage('images/480p/b1.png');
    game_background_c1 = loadImage('images/480p/c1.png');
    game_background_f1 = loadImage('images/480p/f1.png');

    jump_sound = createAudio('sounds/jump_sound.mp3');
    jump_sound.volume(0);
    end_sound = createAudio('sounds/end_sound.mp3');
    end_sound.volume(0);
    soundtrack = createAudio('sounds/background_soundtrack.mp3');
    soundtrack.volume(0);
}

function setup() {
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas_sketch');
    obstacle_distance = width / 5;
    obstacle_amount = 8;
    frameRate(60);

    div_create_all();

    //----------------------GENERATING OBJECTS--------------------------------------------
    player = new Player;
    laser = new Laser;

    background_s = new Image_rendering(game_background_s, 1);
    background_b1 = new Image_rendering(game_background_b1, 1.5);
    background_c1 = new Image_rendering(game_background_c1, 2);
    background_f1 = new Image_rendering(game_background_f1, 2.5);
}

function draw() {
    makeBackground();

    if (gameRunning)
        gameloop();

}

//---------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------DETECTING PLAYER JUMP-----------------------------------------------------------------------------------------------------------
function keyPressed() {
    if (key == ' ') {
        jump_sound.stop();
        jump_sound.play();
        player.gainHeight();
    }
}
function mouseClicked() {
    jump_sound.stop();
    jump_sound.play();
    player.gainHeight();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

//-------------------MAIN FUNCTIONS---------------------------------------
function game_end() {
    if (score > localStorage.getItem('PersonalBest')) {
        localStorage.setItem('PersonalBest', score)
        bestscore = score;
    }
    draw_leaderboard(dbData);
    end_screen_update();
    gameRunning = false;
    end_sound.stop();
    end_sound.play();
    end_screen_div.show();
}

function gameloop() {
    player.dropHeight();

    obstacles_length = objects.length;
    delete_obstacle_value = -(width / 2 + objects[0].width);

    for (let i = 0; i < obstacles_length; i++) {
        objects[i].render();
        objects[i].move();
    }

    for (let i = 0; i < 3; i++) {
        if (objects[i].collision_detected(player)) {
            //game_end();
        }

        if (obstacle_additional_points == true) {
            if (objects[i].collision_pickup(player)) {
                if (objects[i].has_pickup) {
                    objects[i].has_pickup = false;
                    score += 5;

                    if (obstacle_gravity == true) {
                        player.gravity = -player.gravity;
                        player.momentum = 0;
                        player.step = -player.step;
                    }
                }
            }
        }

        //--------------DETECTING GETTING SCORE AND DELETING USED OBSTACLES---------------------------------------------
        if (objects[i].object_x + objects[i].width / 2 < player.player_x) {
            if (objects[i].point_given == false) {
                score++;
                objects[i].point_given = true;
            }
        }
    }

    if (objects[0].object_x < -2 * obstacle_distance) {
        objects.shift();
        counter++;
        objects.push(new Collision_object(objects[objects.length - 1].object_x + obstacle_distance));
        if (counter == pickup_intensity && obstacle_additional_points == true) {
            counter = 0;
            objects[objects.length - 1].has_pickup = true;
        }
    }

    //--------------------------LASER MECHANIC---------------------------------------------------------------------------
    if (obstacle_laser == true) {
        if (score % laser_intensity == 1 && laser.firing == false)
            laser.start_laser(laser_timer);

        laser.render();
        laser.count_down();

        //if (laser.collision_laser(player))
        //    game_end();
    }

    player.render();
    document.getElementById('score').innerHTML = 'Current Score:<br>' + score;

    //if (player.collision_border()) {
    //    game_end();
    //}
}

function makeBackground() {
    background_s.move_background();
    background_b1.move_background();
    background_c1.move_background();
    background_f1.move_background();
}
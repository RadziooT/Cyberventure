if (sessionStorage.getItem('PersonalBest') == null)
    sessionStorage.setItem('PersonalBest', 0);

var bestscore = sessionStorage.getItem('PersonalBest');
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
const laser_timer = 1000;
const frames_per_obstacle = 160;

let loaded = 0;
let loaded2 = false;

var start_menu_div, end_screen_div, authors_div, options_div, sound_div; //divs responsible for different windows of game

var dbData =
    [
        {
            "Name": "Player1",
            "Score": 5
        },
        {
            "Name": "Player2",
            "Score": 4
        },
        {
            "Name": "Player3",
            "Score": 3
        },
        {
            "Name": "Player4",
            "Score": 2
        },
        {
            "Name": "Player5",
            "Score": 1
        },
    ]

var soundtrack;
var never_played = 1;//made to get rid of annoying blocking of autoplay
var jump_sound, end_sound;
var volume_state;

//-----------------------------------Responsible for customizing game experience by user-----------------------------------
var obstacle_gravity = false;
var obstacle_laser = false;
var obstacle_additional_points = false;

function preload() {
    jump_sound = createAudio('sounds/jump_sound.mp3');
    jump_sound.volume(0);
    end_sound = createAudio('sounds/end_sound.mp3');
    end_sound.volume(0);
    soundtrack = createAudio('sounds/background_soundtrack.mp3');
    soundtrack.volume(0);

    player_img = loadImage('images/player.png', () => loaded++);
    collectible = loadImage('images/collectible.png', () => loaded++);
    obstacle = loadImage('images/obstacle.png', () => loaded++);

    game_background_s = loadImage('images/720p/s.png', () => loaded++);
    game_background_b1 = loadImage('images/720p/b1.png', () => loaded++);
    game_background_b2 = loadImage('images/720p/b2.png', () => loaded++);
    game_background_c1 = loadImage('images/720p/c1.png', () => loaded++);
    game_background_c2 = loadImage('images/720p/c2.png', () => loaded++);
    game_background_f1 = loadImage('images/720p/f1.png', () => loaded++);
    game_background_f2 = loadImage('images/720p/f2.png', () => loaded++);
}

function setup() {
    get_top();
    var myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.parent('canvas_sketch');

    obstacle_distance = width / 5;
    obstacle_amount = 8;
    frameRate(60);

    //----------------------GENERATING OBJECTS--------------------------------------------
    player = new Player;
    laser = new Laser;

    background_0 = new Image_rendering(game_background_s, game_background_s, game_background_s, 1);
    background_1 = new Image_rendering(game_background_b1, game_background_b2, game_background_b1, 1.5);
    background_2 = new Image_rendering(game_background_c1, game_background_c2, game_background_c1, 2);
    background_3 = new Image_rendering(game_background_f1, game_background_f2, game_background_f1, 2.5);
}

function draw() {
    if (loaded != 10) {
    } else {
        if (!loaded2) {
            div_create_all();

            const element = document.getElementById('splash');
            element.remove();

            loaded2 = true;
        }
        makeBackground();

        if (gameRunning)
            gameloop();
    }
}

//---------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------DETECTING PLAYER JUMP-----------------------------------------------------------------------------------------------------------
function mouseClicked() {
    if (gameRunning) {
        jump_sound.stop();
        jump_sound.play();
        player.gainHeight();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background_0.reset_background();
    background_1.reset_background();
    background_2.reset_background();
    background_3.reset_background();
}
function game_start() {
    score = 0;
    counter = 0;
    spawn_obstacles(obstacle_distance);
    laser.stop_timer();
    player.reset_player();
    hide_all_divs();
    gameRunning = true;
}

function game_reset() {
    score = 0;
    counter = 0;
    spawn_obstacles(obstacle_distance);
    laser.stop_timer();
    player.reset_player();
    hide_all_divs();
    gameRunning = true;
}

function game_end() {
    gameRunning = false;
    if (score > sessionStorage.getItem('PersonalBest')) {
        sessionStorage.setItem('PersonalBest', score)
        bestscore = score;
    }
    end_screen_update();
    end_sound.stop();
    end_sound.play();
    end_screen_div.show();
}

function spawn_obstacles(distance) {
    let first_obstacle = width / 4 * 3;
    objects = [];
    for (var i = 0; i < obstacle_amount; i++)
        objects.push(new Collision_object(first_obstacle + i * distance));
}

function send_score() {
    const fd = new FormData();
    player_name = document.getElementById('send_score_input').value;
    fd.append("Name", player_name);
    fd.append("Score", score);
    $.post("send_score.php",
        {
            Name: player_name,
            Score: score
        });
    get_top();
    end_screen_div.hide();
    start_menu_div.show();
}

function get_top() {
    $.get("get_score.php", function (data) {
        dbData = JSON.parse(data);

        if (document.getElementById("all_scores") != null)
            draw_leaderboard(dbData);
    });
}

function makeBackground() {
    background_0.move_background();
    background_1.move_background();
    background_2.move_background();
    background_3.move_background();
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
            // game_end();
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

        if (laser.collision_laser(player))
            if (score > 0)
                score--;
    }

    player.render();
    document.getElementById('score').innerHTML = 'Current Score:<br>' + score;

    if (player.collision_border()) {
        // game_end();
    }
}

window.onload = (event) => {
    var interval = setInterval(get_top, 60000);
};
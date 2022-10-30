if (localStorage.getItem('PersonalBest') == null)
    localStorage.setItem('PersonalBest', 0);

var bestscore = localStorage.getItem('PersonalBest');
var player;
var counter = 0;
var gameRunning = false;
var objects = [];
var score = 0;
var laser;
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

    sound_0 = loadImage('images/sound_0.png');
    sound_1 = loadImage('images/sound_1.png');
    sound_2 = loadImage('images/sound_2.png');

    game_background = loadImage('images/background.png');
    game_background_0 = loadImage('images/background_0.png');
    game_background_1 = loadImage('images/background_1.png');

    jump_sound = createAudio('sounds/jump_sound.mp3');
    jump_sound.volume(0);
    end_sound = createAudio('sounds/end_sound.mp3');
    end_sound.volume(0);
    soundtrack = createAudio('sounds/background_soundtrack.mp3');
    soundtrack.volume(0);

}

function setup() {
    var myCanvas = createCanvas(displayWidth, displayHeight);
    myCanvas.parent('canvas_sketch');

    //-----------------------------------------------------------------------------------------------------------------------
    //-------------CREATING MAIN MENU WITH BUTTONS---------------------------------------------------------------------------
    start_menu_div = createDiv();
    start_menu_div.parent('canvas_sketch');
    start_menu_div.id('start_menu');
    start_menu_div.size(0.35 * displayWidth, displayHeight);

    button_play = createButton('Start game');
    button_play.parent('start_menu');
    button_play.mousePressed(game_start);
    button_play.id("game_start");
    button_play.addClass("buttons");

    button_options = createButton('Options');
    button_options.parent('start_menu');
    button_options.mousePressed(go_to_options);
    button_options.id("options");
    button_options.addClass("buttons");

    button_authors = createButton('Authors');
    button_authors.parent('start_menu');
    button_authors.mousePressed(go_to_authors);
    button_authors.id("authors");
    button_authors.addClass("buttons");

    //-----------------------------------------------------------------------------------------------------------------------
    //-------------CREATING END SCREEN WITH BUTTONS--------------------------------------------------------------------------
    end_screen_div = createDiv();
    end_screen_div.parent('canvas_sketch');
    end_screen_div.id('end_screen');
    end_screen_div.size(0.35 * displayWidth, displayHeight);
    end_screen_div.hide();

    button_restart = createButton('Restart');
    button_restart.parent('end_screen');
    button_restart.mousePressed(game_reset);
    button_restart.id("restart");
    button_restart.addClass("buttons");

    button_return_to_menu = createButton('Main menu');
    button_return_to_menu.parent('end_screen');
    button_return_to_menu.mousePressed(return_to_menu);
    button_return_to_menu.id("return_to_menu");
    button_return_to_menu.addClass("buttons");

    //-----------------------------------------------------------------------------------------------------------------------
    //-------------CREATING END SCREEN WITH BUTTONS--------------------------------------------------------------------------
    options_div = createDiv();
    options_div.parent('canvas_sketch');
    options_div.id('options_menu');
    options_div.size(0.35 * displayWidth, displayHeight);
    options_div.hide();

    button_laser = createButton('Laser');
    button_laser.parent('options_menu');
    button_laser.mousePressed(laser_pressed);
    button_laser.id("laser_toggle");
    button_laser.addClass("buttons");

    button_points = createButton('Additional points');
    button_points.parent('options_menu');
    button_points.mousePressed(points_pressed);
    button_points.id("points_toggle");
    button_points.addClass("buttons");

    button_gravity = createButton('Swapping gravity');
    button_gravity.parent('options_menu');
    button_gravity.mousePressed(gravity_pressed);
    button_gravity.id("gravity_toggle");
    button_gravity.addClass("buttons");

    button_return_to_menu = createButton('Main menu');
    button_return_to_menu.parent('options_menu');
    button_return_to_menu.mousePressed(return_to_menu);
    button_return_to_menu.id("return_from_options");
    button_return_to_menu.addClass("buttons");

    //-----------------------------------------------------------------------------------------------------------------------
    //-----------CREATING AUTHORS SCREEN WITH BUTTONS------------------------------------------------------------------------
    authors_div = createDiv();
    authors_div.parent('canvas_sketch');
    authors_div.id('authors_screen');
    authors_div.size(0.35 * displayWidth, displayHeight);
    authors_div.hide();

    text_div = createDiv('Authors:<br>Mateusz Siedliski & Radosław Tchórzewski');
    text_div.parent('authors_screen');
    text_div.id('authors_text');

    button_return_from_authors = createButton('Main menu');
    button_return_from_authors.parent('authors_screen');
    button_return_from_authors.mousePressed(return_to_menu);
    button_return_from_authors.id("return_from_authors");
    button_return_from_authors.addClass("buttons");

    //------------------------------------------------------------------------------------------------------------------------------
    //-------------------CREATING SOUND BUTTONS-------------------------------------------------------------------------------------
    sound_div = createDiv();
    sound_div.parent('canvas_sketch');
    sound_div.id('sound_div')
    soundtrack_volume_state = 0;
    sound_div.mousePressed(toggleSound);

    jump_sound_div = createDiv();
    jump_sound_div.parent('canvas_sketch');
    jump_sound_div.id('jump_sound_div')
    jump_volume_state = 0;
    jump_sound_div.mousePressed(toggle_jump_sound);

    //------------------------------------------------------------------------------------------------------------------------------
    //--------------------------------------CREATING LEADERBOARD--------------------------------------------------------------------
    leaderboard_div = createDiv();
    leaderboard_div.parent('canvas_sketch');
    leaderboard_div.id('leaderboard_screen');
    leaderboard_div.size(0.15 * displayWidth, displayHeight);
    leaderboard_div.html('<h1 id="leaderboard_title">Highest scores</h1>')

    all_scores_div = createDiv();
    all_scores_div.parent('leaderboard_screen');
    all_scores_div.id('all_scores');

    score_name_div = createDiv();
    score_name_div.parent('all_scores');
    score_name_div.id('score_name');

    score_value_div = createDiv();
    score_value_div.parent('all_scores');
    score_value_div.id('score_value');

    draw_leaderboard(dbData);

    //------------------------------------------------------------------------------------------------------------------------------
    //----------------------GENERATING OBJECTS--------------------------------------------------------------------------------------
    player = new Player;
    laser = new Laser;
    objects.push(new Collision_object);
    background = new Image_rendering(game_background, 1);
    background_0 = new Image_rendering(game_background_0, 2);
    background_1 = new Image_rendering(game_background_1, 4);
}

function draw() {
    background.move_background();
    background.render_image();
    background_0.move_background();
    background_0.render_image();
    background_1.move_background();
    background_1.render_image();

    if (gameRunning) {
        //--------------------------------------------------------------------------------------------------------------------------
        player.dropHeight();
        //---------------------------------------------------------------------------------------------------------------------
        //-------------------SPAWNING NEW OBSTACLES WITH COLLECTIBLES----------------------------------------------------------
        if (frameCount % frames_per_obstacle == 0) {
            counter++;
            objects.push(new Collision_object());
            if (counter == pickup_intensity && obstacle_additional_points == true) {
                counter = 0;
                objects[objects.length - 1].set_pickup_state(true);
            }
        }

        //-----------------------------------------------------------------------------------------------------------------------------
        //-------------------COLLISION WITH OBSTACLES WITH COLLECTIBLES----------------------------------------------------------------
        for (var i = 0; i < objects.length; i++) {
            objects[i].render();
            objects[i].move();

            if (objects[i].collision_detected(player)) {
                game_end();
            }

            if (obstacle_additional_points == true) {
                if (objects[i].collision_pickup(player)) {
                    if (objects[i].has_pickup) {
                        objects[i].set_pickup_state(false);
                        score += 5;

                        if (obstacle_gravity == true)
                            player.pull_down = !player.pull_down;
                    }
                }
            }

            //------------------------------------------------------------------------------------------------------------------------------
            //--------------DETECTING GETTING SCORE AND DELETING USED OBSTACLES-------------------------------------------------------------
            if (objects[i].object_x + objects[i].width / 2 < player.player_x + player.player_size) {
                if (objects[i].point_given == false) {
                    score++;
                    objects[i].point_given = true;
                }
            }

            if (objects[i].object_x < -(width / 2 + objects[i].width))
                objects.shift();
        }

        //-----------------------------------------------------------------------------------------------------------------------
        //--------------------------LASER MECHANIC-------------------------------------------------------------------------------
        if (obstacle_laser == true) {
            if (score % laser_intensity == 0 && laser.firing == false && score != 0)
                laser.start_laser(laser_timer);

            laser.render();
            laser.count_down();

            if (laser.collision_laser(player)) {
                game_end();
            }
        }

        //------------------------------------------------------------------------------------------------------------------------------------------------------
        draw_leaderboard(dbData);
        player.render();
        updatePixels();

        if (player.collision_border()) {
            game_end();
        }
    }

    render_sound(soundtrack_volume_state);
    render_jump_sound(jump_volume_state);
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

function draw_leaderboard(dbData) {
    score_name_div.html('');
    score_value_div.html('');

    for (i = 0; i < dbData.length; i++) {
        score_name_div.html('<span class="dbRecord">Name: ' + dbData[i]["name"] + '<br></span>', true);
        score_value_div.html('<span class="dbRecord">Score: ' + dbData[i]["score"] + '<br></span>', true);
    }

    score_name_div.html('<br><span class="current_score">Current Score:<br>' + score + '<br></span>', true);
    score_value_div.html('<br><span class="dbRecord">Personal Best:<br>' + bestscore + '<br></span>', true);
}

function toggle_jump_sound() {
    switch (jump_volume_state) {
        case 0:
            jump_volume_state = 1;
            jump_sound.volume(0.5);
            end_sound.volume(0.5);
            break;
        case 1:
            jump_volume_state = 2;
            jump_sound.volume(1);
            end_sound.volume(1);
            break;
        case 2:
            jump_volume_state = 0;
            jump_sound.volume(0);
            end_sound.volume(0);
            break;
        default:
            jump_volume_state = 0;
            jump_sound.volume(0);
            end_sound.volume(0);
            break;
    }
}

function render_jump_sound(i) {
    switch (i) {
        case 0:
            jump_img = sound_0;
            break;
        case 1:
            jump_img = sound_1;
            break;
        case 2:
            jump_img = sound_2;
            break;
        default:
            jump_img = sound_0;
            break;
    }
    image(jump_img, 50, 100, 50, 50);
}

function toggleSound() {
    never_played = 0;
    switch (soundtrack_volume_state) {
        case 0:
            soundtrack_volume_state = 1;
            soundtrack.volume(0.5);
            break;
        case 1:
            soundtrack_volume_state = 2;
            soundtrack.volume(1);
            break;
        case 2:
            soundtrack_volume_state = 0;
            soundtrack.volume(0);
            break;
        default:
            soundtrack_volume_state = 0;
            soundtrack.volume(0);
            break;
    }
}

function render_sound(i) {
    switch (i) {
        case 0:
            img = sound_0;
            break;
        case 1:
            img = sound_1;
            break;
        case 2:
            img = sound_2;
            break;
        default:
            img = sound_0;
            break;
    }
    if (never_played == 1) {
        image(sound_0, 50, 50, 50, 50);
    }
    if (never_played == 0)
        soundtrack.play();
    image(img, 50, 50, 50, 50);
}

//-----------------------------------------------------------------------------------------------------------------------
//-------------------NAVIGATING WITH BUTTONS-------------------------------------------------------------------------------
function game_start() {
    score = 0;
    counter = 0;
    objects = [];
    laser.stop_timer();
    player.reset_player();
    hide_all_divs();
    start();
}

function game_reset() {
    score = 0;
    counter = 0;
    objects = [];
    laser.stop_timer();
    player.reset_player();
    hide_all_divs();
    start();
}

function return_to_menu() {
    hide_all_divs();
    start_menu_div.show();
}

function go_to_authors() {
    hide_all_divs();
    authors_div.show();
}

function go_to_options() {
    hide_all_divs();
    options_div.show();
}

function laser_pressed() {
    obstacle_laser = !obstacle_laser;
}

function points_pressed() {
    obstacle_additional_points = !obstacle_additional_points;
}

function gravity_pressed() {
    obstacle_gravity = !obstacle_gravity;
}

//-----------------------------------------------------------------------------------------------------------------------
//-------------------USED IN OTHER FUNCTIONS-----------------------------------------------------------------------------
function hide_all_divs() {
    start_menu_div.hide();
    end_screen_div.hide();
    authors_div.hide();
    options_div.hide();
}

function start() {
    gameRunning = true;
}

function game_end() {
    player.pull_down = true;
    gameRunning = false;
    end_sound.stop();
    end_sound.play();
    if (score > localStorage.getItem('PersonalBest')) {
        localStorage.setItem('PersonalBest', score)
        bestscore = score;
    }
    end_screen_div.show();
}

function change_game_state() {
    gameRunning = !gameRunning;
}
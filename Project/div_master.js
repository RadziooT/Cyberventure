const divs_scale = 0.35;

function div_create_all() {
    div_main_menu();
    div_end_screen();
    div_menu_screen();
    div_authors_screen();
    div_sound_screen();
    div_leaderboard();
}
//-----------------------------------------------------------------------------------------------------------------------
//-------------CREATING MAIN MENU WITH BUTTONS---------------------------------------------------------------------------
function div_main_menu() {
    start_menu_div = createDiv();
    start_menu_div.parent('canvas_sketch');
    start_menu_div.id('start_menu');
    start_menu_div.size(divs_scale * displayWidth, displayHeight);

    button_play = createButton('Start game');
    button_play.parent('start_menu');
    button_play.mousePressed(game_start);
    button_play.id("game_start");
    button_play.addClass("cyber-button");
    button_play.html("Start game");

    button_options = createButton('Options');
    button_options.parent('start_menu');
    button_options.mousePressed(go_to_options);
    button_options.id("options");
    button_options.addClass("cyber-button");
    button_options.html("Options");

    button_authors = createButton('Authors');
    button_authors.parent('start_menu');
    button_authors.mousePressed(go_to_authors);
    button_authors.id("authors");
    button_authors.addClass("cyber-button");
    button_authors.html("Authors");
}

//-----------------------------------------------------------------------------------------------------------------------
//-------------CREATING END SCREEN WITH BUTTONS--------------------------------------------------------------------------
function div_end_screen() {
    end_screen_div = createDiv();
    end_screen_div.parent('canvas_sketch');
    end_screen_div.id('end_screen');
    end_screen_div.size(divs_scale * displayWidth, displayHeight);
    end_screen_div.hide();

    submit_div = createDiv();
    submit_div.parent('end_screen');
    submit_div.id('submit_div');
    submit_div.size(divs_scale / 2 * displayWidth, divs_scale / 2 * displayHeight);
    submit_div.html('<h2>You scored ' + score + ' points </h2><br><h3>Type your nickname to submit your score</h3><br>');

    button_restart = createButton('Restart');
    button_restart.parent('end_screen');
    button_restart.mousePressed(game_reset);
    button_restart.id("restart");
    button_restart.addClass("cyber-button");
    button_restart.html("Restart");

    button_return_to_menu = createButton('Main menu');
    button_return_to_menu.parent('end_screen');
    button_return_to_menu.mousePressed(return_to_menu);
    button_return_to_menu.id("return_to_menu");
    button_return_to_menu.addClass("cyber-button");
    button_return_to_menu.html("Main menu");

    submit_div.addClass('glitch');
    input = createInput('');
    input.parent('submit_div');
    input.id('send_score_input');
    button = createButton('Submit');
    button.parent('submit_div');
    button.id('send_score_button');
    button.mousePressed(send_score);
}
//-----------------------------------------------------------------------------------------------------------------------
//-------------CREATING OPTIONS SCREEN WITH BUTTONS-------------------------------------------------------------------------
function div_menu_screen() {
    options_div = createDiv();
    options_div.parent('canvas_sketch');
    options_div.id('options_menu');
    options_div.size(divs_scale * displayWidth, displayHeight);
    options_div.hide();

    button_laser = createButton('Laser');
    button_laser.parent('options_menu');
    button_laser.mousePressed(laser_pressed);
    button_laser.id("laser_toggle");
    button_laser.addClass("cyber-button");

    button_points = createButton('Additional points');
    button_points.parent('options_menu');
    button_points.mousePressed(points_pressed);
    button_points.id("points_toggle");
    button_points.addClass("cyber-button");
    button_points.html("Additional Points");

    button_gravity = createButton('Swapping gravity');
    button_gravity.parent('options_menu');
    button_gravity.mousePressed(gravity_pressed);
    button_gravity.id("gravity_toggle");
    button_gravity.addClass("cyber-button");
    button_gravity.html("Gravity switching");

    button_return_to_menu = createButton('Main menu');
    button_return_to_menu.parent('options_menu');
    button_return_to_menu.mousePressed(return_to_menu);
    button_return_to_menu.id("return_from_options");
    button_return_to_menu.addClass("cyber-button");
    button_return_to_menu.html("Main menu");
}
//-----------------------------------------------------------------------------------------------------------------------
//-----------CREATING AUTHORS SCREEN WITH BUTTONS------------------------------------------------------------------------
function div_authors_screen() {
    authors_div = createDiv();
    authors_div.parent('canvas_sketch');
    authors_div.id('authors_screen');
    authors_div.size(divs_scale * displayWidth, displayHeight);
    authors_div.hide();

    text_div = createDiv('Authors:<br><br>Mateusz Siedliski<br>&<br>Radosław Tchórzewski');
    text_div.parent('authors_screen');
    text_div.id('authors_text');

    button_return_from_authors = createButton('Main menu');
    button_return_from_authors.parent('authors_screen');
    button_return_from_authors.mousePressed(return_to_menu);
    button_return_from_authors.id("return_from_authors");
    button_return_from_authors.addClass("cyber-button");
    button_return_from_authors.html("Main menu");
}
//------------------------------------------------------------------------------------------------------------------------------
//-------------------CREATING SOUND BUTTONS-------------------------------------------------------------------------------------
function div_sound_screen() {
    sound_div = createDiv();
    sound_div.parent('canvas_sketch');
    sound_div.id('sound_div')
    soundtrack_volume_state = 0;
    sound_div.mousePressed(toggleSound);
    sound_div.html('<div class="sound"><div class="sound--icon fa fa-volume-off"></div><div class="sound--wave sound--wave_one"></div>', true);
    sound_div.html('<div class="sound--wave sound--wave_two"></div></div>', true);
    sound_div.toggleClass('sound-mute');

    jump_sound_div = createDiv();
    jump_sound_div.parent('canvas_sketch');
    jump_sound_div.id('jump_sound_div')
    jump_volume_state = 0;
    jump_sound_div.mousePressed(toggle_jump_sound);
    jump_sound_div.html('<div class="sound"><div class="sound--icon fa fa-volume-off"></div><div class="sound--wave sound--wave_one"></div>', true);
    jump_sound_div.html('<div class="sound--wave sound--wave_two"></div></div>', true);
    jump_sound_div.toggleClass('sound-mute');

}
//------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------CREATING LEADERBOARD--------------------------------------------------------------------
function div_leaderboard() {
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
    draw_leaderboard(dbData)
}

function draw_leaderboard(dbData) {
    score_name_div.html('<br><span class="dbRecord">Name:<br></span>');
    score_value_div.html('<br><span class="dbRecord">Score:<br></span>');

    for (i = 0; i < dbData.length; i++) {
        score_name_div.html('<span class="dbRecord">' + dbData[i]["Name"] + '<br></span>', true);
        score_value_div.html('<span class="dbRecord">' + dbData[i]["Score"] + '<br></span>', true);
    }

    score_name_div.html('<br><span class="dbRecord" id="score">Current Score:<br>' + score + '<br></span>', true);
    score_value_div.html('<br><span class="dbRecord" id="bestscore">Personal Best:<br>' + bestscore + '<br></span>', true);
}

function toggle_jump_sound() {
    jump_sound_div.toggleClass('sound-mute');
    switch (jump_volume_state) {
        case 0:
            jump_volume_state = 1;
            jump_sound.volume(1);
            end_sound.volume(1);
            break;
        case 1:
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

function toggleSound() {
    never_played = 0;
    if (never_played == 0)
        soundtrack.play();
    sound_div.toggleClass('sound-mute');

    switch (soundtrack_volume_state) {
        case 0:
            soundtrack_volume_state = 1;
            soundtrack.volume(1);
            break;
        case 1:
            soundtrack_volume_state = 0;
            soundtrack.volume(0);
            break;
        default:
            soundtrack_volume_state = 0;
            soundtrack.volume(0);
            break;
    }
}

//-----------------------------------------------------------------------------------------------------------------------
//-------------------NAVIGATING WITH BUTTONS-------------------------------------------------------------------------------
function game_start() {
    get_top();
    score = 0;
    counter = 0;
    spawn_obstacles(obstacle_distance);
    laser.stop_timer();
    player.reset_player();
    hide_all_divs();
    gameRunning = true;
}

function game_reset() {
    get_top();
    score = 0;
    counter = 0;
    spawn_obstacles(obstacle_distance);
    laser.stop_timer();
    player.reset_player();
    hide_all_divs();
    gameRunning = true;
}

function spawn_obstacles(distance) {
    let first_obstacle = width / 4 * 3;
    objects = [];
    for (var i = 0; i < obstacle_amount; i++)
        objects.push(new Collision_object(first_obstacle + i * distance));
}
//TODO add connection with database to send score

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
    delete fd;
    end_screen_div.hide();
    start_menu_div.show();
}

function get_top() {
    $.get("get_score.php", function (data) {
        dbData = JSON.parse(data);
    });
}

function end_screen_update() {
    submit_div.html('<h2>You scored ' + score + ' points </h2><br><h3>Type your nickname to submit your score</h3><br>');
    input.html('');
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
    button_laser.toggleClass("glitch");
    button_laser.toggleClass("cyber-button-clicked");
}

function points_pressed() {
    if (obstacle_gravity)
        gravity_pressed();
    obstacle_additional_points = !obstacle_additional_points;
    button_points.toggleClass("glitch");
    button_points.toggleClass("cyber-button-clicked");
}

function gravity_pressed() {
    if (!obstacle_additional_points)
        points_pressed();
    obstacle_gravity = !obstacle_gravity;
    button_gravity.toggleClass("glitch");
    button_gravity.toggleClass("cyber-button-clicked");
}

function hide_all_divs() {
    start_menu_div.hide();
    end_screen_div.hide();
    authors_div.hide();
    options_div.hide();
}
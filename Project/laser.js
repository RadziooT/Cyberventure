class Laser {
    constructor() {
        this.center_y = 0;
        //this.center_y = height/2;
        this.size = 0.05 * height;
        this.timer = 0;
        this.timer_part = 0;
        this.firing = false;
    }

    stop_timer() {
        this.timer = 0;
    }

    //Timing the duration of laser
    count_down() {
        this.timer -= 1;
    }

    //Starting laser
    start_laser(timer) {
        this.center_y = Math.floor(Math.random() * 0.85 * height) + 0.1 * height;
        this.timer = timer;
        this.timer_part = timer / 4;
        this.firing = true;
    }

    //Checking for collision
    collision_laser(player) {
        if (this.timer <= this.timer_part && this.firing == true) {
            if (player.player_y + player.player_size >= this.center_y - this.size / 2 && player.player_y <= this.center_y + this.size / 2) {
                return true;
            }
            return false;
        }
        return false;
    }

    //Rendering each part of firing laser as well as stopping its firing when duration ends
    render() {

        if (this.timer <= 0) {
            this.firing = false;
            noStroke();
            noFill()
        }

        //rendering action of firing laser
        if (this.firing == true && this.timer > 0) {
            //final part of laser which has collision
            if (this.timer <= this.timer_part) {
                image(laser_4, 0, this.center_y - this.size / 2, width, this.size);
            }

            //3rd part of laser
            if (this.timer > this.timer_part && this.timer <= 2 * this.timer_part) {
                image(laser_3, 0, this.center_y - this.size / 2, width, this.size);
            }

            //2nd part of laser
            if (this.timer > this.timer_part && this.timer <= 3 * this.timer_part) {
                noStroke()
                image(laser_2, 0, this.center_y - this.size * 3 / 10, width, this.size * 3 / 5);
            }

            //1st part of laser
            if (this.timer > this.timer_part) {
                noStroke()
                image(laser_1, 0, this.center_y - this.size / 10, width, this.size / 5);
            }
        }

    }
}
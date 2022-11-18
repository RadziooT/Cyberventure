class Laser {
    constructor() {
        this.center_y = 0;
        //this.center_y = height/2;
        this.size = 0.1 * height;
        this.timer = 0;
        this.timer_part = 0;
        this.firing = false;
        this.value = 0;
        this.i = 0;
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
        this.top_of_laser = this.center_y - this.size / 2;
        this.timer_part = timer / 4;

        this.value = 100 / this.timer_part;
        this.i = this.timer_part;

        document.getElementById("laser_div").style.display = "inline-block";
        document.documentElement.style.setProperty('--laser_position', this.top_of_laser + "px");
        document.documentElement.style.setProperty('--laser_height', this.size + "px");
        document.getElementById("laser_exclamation").style.visibility = "visible";

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

    render() {
        if (this.timer <= 0) {
            document.getElementById("laser_beam").style.visibility = "hidden";
            document.getElementById("laser_exclamation").style.visibility = "hidden";
            document.getElementById("laser_div").style.display = "none";
            this.firing = false;
        }

        if (this.firing == true && this.timer > 0) {
            if (this.timer <= this.timer_part) {
                $('#laser_beam').css({ '-webkit-mask-image': 'unset' });
                document.getElementById("laser_beam").style.visibility = "visible";
                document.getElementById("laser_exclamation").style.visibility = "hidden";
            }
            if (this.timer > this.timer_part && this.timer <= 2 * this.timer_part) {
                document.getElementById("laser_beam").style.visibility = "visible";
                document.getElementById("laser_exclamation").style.visibility = "hidden";
                $('#laser_beam').css({ '-webkit-mask-image': 'linear-gradient(to right, transparent ' + this.i * this.value + '%, black 100%)' });
                this.i -= 5;
            }
        }
        this.timer -= 1;
    }

}
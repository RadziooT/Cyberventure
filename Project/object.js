class Collision_object {
    constructor() {
        this.hole_size = Math.floor(Math.random() * 0.1 * height) + 0.25 * height;//Here you can tune in hole size
        //this.hole_size = 400;
        this.hole_center = Math.floor(Math.random() * 0.85 * height) + 0.1 * height;
        this.has_pickup = false;
        this.speed = 3;
        this.width = 0.03 * width;
        this.object_x = width;
        this.point_given = false;
    }

    //Stopping render of pickup if collected
    set_pickup_state(val) {
        if (this.has_pickup == true || this.has_pickup == false)
            this.has_pickup = val;
    }

    //Collision with obstacles
    collision_detected(player) {
        if ((player.player_x + player.player_size >= this.object_x && player.player_x <= this.object_x + this.width)
            && (player.player_y <= this.hole_center - this.hole_size / 2
                || player.player_y + player.player_size >= this.hole_center + this.hole_size / 2)) {
            return true;
        }
        return false;
    }

    //Collision with pickups
    collision_pickup(player) {
        if ((player.player_x + player.player_size >= this.object_x + this.width / 2 - this.hole_size / 4 && player.player_x <= this.object_x + this.width / 2 + this.hole_size / 2)
            && (player.player_y + player.player_size >= this.hole_center - this.hole_size / 4 && player.player_y <= this.hole_center + this.hole_size / 4)) {
            return true;
        }
        return false;
    }

    //Creating visual representation of obstacles
    render() {
        image(obstacle, this.object_x, 0, this.width, this.hole_center - this.hole_size / 2);
        image(obstacle, this.object_x, this.hole_center + this.hole_size / 2, this.width, height - this.hole_center + this.hole_size / 2);

        if (this.has_pickup) {
            image(collectible, this.object_x + this.width / 2 - this.hole_size / 4, this.hole_center - this.hole_size / 4, this.hole_size / 2, this.hole_size / 2);
        }
    }

    //Moving obstacles with collectibles to the left of the screen
    move() {
        this.object_x -= this.speed;
    }
}
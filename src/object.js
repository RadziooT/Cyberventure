class Collision_object {
    constructor(x_coordinate) {
        this.hole_size = Math.floor(Math.random() * 0.13 * height) + 0.23 * height;//Here you can tune in hole size
        this.hole_center = Math.floor(Math.random() * 0.6 * height) + 0.2 * height;
        this.has_pickup = false;
        this.speed = 5;
        this.width = 0.04 * width;
        this.object_x = x_coordinate;
        this.point_given = false;
    }

    //Collision with obstacles
    collision_detected(player) {
        if (!(player.player_x + player.player_size >= this.object_x))
            return false;
        if (!(player.player_x <= this.object_x + this.width))
            return false;
        if (!(player.player_y <= this.hole_center - this.hole_size / 2
            || player.player_y + player.player_size >= this.hole_center + this.hole_size / 2))
            return false;
        else
            return true;
    }

    //Collision with pickups
    collision_pickup(player) {
        if (!(player.player_x + player.player_size >= this.object_x + this.width / 4))
            return false;
        if (!(player.player_x <= this.object_x + this.width / 4))
            return false;
        if (!(player.player_y + player.player_size >= this.hole_center - this.width / 4))
            return false;
        if (!(player.player_y <= this.hole_center + this.width / 4))
            return false;
        else
            return true;
    }

    //Creating visual representation of obstacles
    render() {
        image(obstacleTOP, this.object_x, 0, this.width, this.hole_center - this.hole_size / 2);
        image(obstacleBOT, this.object_x, this.hole_center + this.hole_size / 2, this.width, height - this.hole_center + this.hole_size / 2);

        if (this.has_pickup) {
            image(collectible, this.object_x + this.width / 4, this.hole_center - this.width / 4, this.width / 2, this.width / 2);
        }
    }

    //Moving obstacles with collectibles to the left of the screen
    move() {
        this.object_x -= this.speed;
    }
}
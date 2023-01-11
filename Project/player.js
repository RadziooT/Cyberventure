class Player {
    constructor() {
        this.player_center = height / 2;
        this.player_size = 0.06 * height;
        this.player_y = this.player_center - this.player_size / 2;
        this.player_x = 0.1 * width - this.player_size / 2;
        this.gravity = 3; //determines how fast does the player fall
        this.momentum = 0;//determines how long the jump lasts as well as speeds up falling down
        this.step = 0.3;
        this.max_momentum = 10;
        this.max_jump = 15;
    }

    reset_player() {
        this.player_y = height / 2;
        this.player_x = width / 10;
        this.momentum = 0;
        this.gravity = 3;
        this.step = 0.3;
    }

    render() {
        image(player_img, this.player_x, this.player_y, this.player_size, this.player_size);
    }

    //Force responsible for pushing player to the borders of the screen
    dropHeight() {
        if (abs(this.momentum) > this.max_momentum)
            this.momentum = this.max_momentum * Math.sign(this.momentum);

        this.momentum += this.step;
        this.player_y += this.momentum;
    }

    //Jumping mechanic
    gainHeight() {
        if (abs(this.momentum) > this.max_jump)
            this.momentum = this.max_jump * Math.sign(this.momentum);
        else
            this.momentum += -this.gravity * 15;
    }

    //Collsision with top/bottow of the screen
    collision_border() {
        if (this.player_y <= 0 || this.player_y + this.player_size >= height)
            return true;
        else
            return false;
    }
}
class Image_rendering {
    constructor(img, speed) {
        this.x1 = -width;
        this.x2 = 0;
        this.x3 = width;
        this.speed = speed;
        this.img = img;
    }

    move_background() {
        this.x1 -= this.speed;
        this.x2 -= this.speed;
        this.x3 -= this.speed;

        if (this.x1 <= -width)
            this.x1 = width;

        if (this.x2 <= -width)
            this.x2 = width;

        if (this.x3 <= -width)
            this.x3 = width;

        image(this.img, this.x1, 0, width, height);
        image(this.img, this.x2, 0, width, height);
        image(this.img, this.x3, 0, width, height);
    }
}
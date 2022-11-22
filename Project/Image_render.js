class Image_render {
    constructor(img, position, speed) {
        this.x = position;
        this.speed = speed;
        this.img = img;
    }

    move_image() {
        this.x -= this.speed;
        image(this.img, this.x, 0, window.innerWidth, window.innerHeight);
    }
}
class Image_rendering {
    constructor(img1, img2, img3, speed) {
        this.x = width;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.img_array = [img1, img2, img3];

        this.to_render_img1 = this.img_array[Math.floor(Math.random() * 3)];
        this.to_render_img2 = this.img_array[Math.floor(Math.random() * 3)];
        this.to_render_img3 = this.img_array[Math.floor(Math.random() * 3)];

        this.img1 = new Image_render(this.to_render_img1, -width / 2, this.speed);
        this.img2 = new Image_render(this.to_render_img2, width / 2, this.speed);
        this.img3 = new Image_render(this.to_render_img3, width * 3 / 2, this.speed);
    }

    move_background() {
        if (this.img1.x <= -width) {
            this.img1.x = 2 * this.x;
            this.img1.img = this.img_array[Math.floor(Math.random() * 3)];
        }

        if (this.img2.x <= -width) {
            this.img2.x = 2 * this.x;
            this.img2.img = this.img_array[Math.floor(Math.random() * 3)];
        }

        if (this.img3.x <= -width) {
            this.img3.x = 2 * this.x;

            this.img3.img = this.img_array[Math.floor(Math.random() * 3)];
        }

        this.img1.move_image();
        this.img2.move_image();
        this.img3.move_image();
    }

    reset_background() {
        this.x = width;
        //Reset position of all images
        this.img1.x = -width / 2;
        this.img2.x = width / 2;
        this.img3.x = width * 3 / 2;
    }
}
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

        this.img1 = new Image_render(this.to_render_img1, -width, this.speed);
        this.img2 = new Image_render(this.to_render_img2, 0, this.speed);
        this.img3 = new Image_render(this.to_render_img3, width, this.speed);

    }

    move_background() {
        if (this.img1.x <= -width) {
            this.img1.x = this.x;
            this.to_render_img1 = this.img_array[Math.floor(Math.random() * 3)];
            this.img1 = new Image_render(this.to_render_img1, this.x, this.speed);
        }

        if (this.img2.x <= -width) {
            this.img2.x = this.x;
            this.to_render_img2 = this.img_array[Math.floor(Math.random() * 3)];
            this.img2 = new Image_render(this.to_render_img2, this.x, this.speed);
        }

        if (this.img3.x <= -width) {
            this.img3.x = this.x;
            this.to_render_img3 = this.img_array[Math.floor(Math.random() * 3)];
            this.img3 = new Image_render(this.to_render_img3, this.x, this.speed);
        }

        this.img1.move_image();
        this.img2.move_image();
        this.img3.move_image();

        // console.log(this.img1.x);
        // console.log(this.img2.x);
        // console.log(this.img3.x);
    }

    reset_background() {
        this.x = width;

    }
}
var Bag = function (canvas) {
    ///<field name="canvas" type="HTMLCanvasElement"></field>

    SL.EventDispatcher.call(this);

    this.canvas = canvas;

    this.context = this.canvas.getContext('2d');

    var w = $(window).width();
    var h = $(window).height();

    var zoom = Math.max(624 / w, 977 / h);
    this.canvas.width = w * zoom;
    this.canvas.height = h * zoom;

    this.canvas2 = document.createElement('canvas');
    this.canvas2.width = this.canvas.width;
    this.canvas2.height = this.canvas.height;
    this.context2 = this.canvas2.getContext('2d');

    this.offsetX = (this.canvas.width - 588) / 2;
    this.offsetY = (this.canvas.height - 977) / 2;

    this.bagX = 0;
    this.bagY = 185;

    this.images = {};

    this.startTime = 0;

    this.running = false;

    this.waiting = true;

    this.paperScale = Math.min(this.canvas.width / 624, this.canvas.height / 828);

    SL.checkImage($('#loading_imgs img').toArray(), (function () {
        $('#loading_imgs img').each((function (index, img) {
            this.images[$(img).data('name')] = img;
        }).bind(this));
        this.startTime = new Date().valueOf();
        this.redraw();
    }).bind(this));

    SL.loadImage([
                { name: 'paperbg', url: 'img/paperbg.png' },
                { name: 'paper_0', url: 'img/paper_0.png' },
                { name: 'bag', url: 'img/bag.jpg' },
                { name: 'bag_top', url: 'img/bag_top.png' },
                { name: 'coin', url: 'img/coin.png' },
                { name: 'line', url: 'img/line.png' },
                { name: 'paper_mask', url: 'img/paper_mask.png' },
                { name: 'hand', url: 'img/hand.png' }
    ], (function (imgs) {
        this.images = imgs;
        this.startTime = new Date().valueOf();
        this.redraw();
    }).bind(this));

    this.redraw = function () {
        if (!this.running && !this.waiting) {
            return;
        }
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.save();

        this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.context.rotate(0 - Math.PI / 180 * 20);
        this.context.translate(0 - this.canvas.width / 2, 0 - this.canvas.height / 2);
        //this.context.scale(0.6, 1);

        this.context.translate(this.offsetX, this.offsetY);

        this.context.drawImage(this.images.bag, this.bagX, this.bagY);

        if (this.waiting) {
            var elapsed = new Date().valueOf() - this.startTime;

            var handTime = elapsed % 2000;
            var x0 = this.bagX + 200;
            var y0 = this.bagY + 234;
            var x1 = this.bagX + 180;
            var y1 = this.bagY + 254;
            if (handTime < 1000) {
                var x = x0 + (x1 - x0) * handTime / 1000;
                var y = y0 + (y1 - y0) * handTime / 1000;
                this.context.drawImage(this.images.hand, x, y);
            }
            else {
                var x = x1 + (x0 - x1) * (handTime - 1000) / 1000;
                var y = y1 + (y0 - y1) * (handTime - 1000) / 1000;
                this.context.drawImage(this.images.hand, x, y);
            }
        }

        if (!this.running) {
            this.context.drawImage(this.images.bag_top, this.bagX, this.bagY);

            this.context.drawImage(this.images.line, this.bagX + 266, this.bagY + 107);

            this.context.drawImage(this.images.coin, this.bagX + 254, this.bagY + 98);

            this.context.drawImage(this.images.coin, this.bagX + 254, this.bagY + 184);
        }
        else {
            var elapsed = new Date().valueOf() - this.startTime;

            //top
            if (elapsed < 1000) {
                this.context.drawImage(this.images.bag_top, this.bagX, this.bagY);
            }
            else if (elapsed >= 1000 && elapsed < 2000) {
                this.context.save();
                this.context.translate(this.bagX, this.bagY);
                this.context.scale(1, 1 - (elapsed - 1000) / 500);
                this.context.drawImage(this.images.bag_top, 0, 0);
                if (elapsed < 1500) {
                    this.context.drawImage(this.images.coin, 254, 98);
                }
                this.context.restore();
            }
            else {
                this.context.save();
                this.context.translate(this.bagX, this.bagY);
                this.context.scale(1, -1);
                this.context.drawImage(this.images.bag_top, 0, 0);
                this.context.restore();
            }

            if (elapsed < 1000) {
                this.context.save();
                this.context.globalAlpha = 1 - elapsed / 1000;
                this.context.drawImage(this.images.line, this.bagX + 266, this.bagY + 107);
                this.context.restore();
            }

            if (elapsed < 1000) {
                this.context.drawImage(this.images.coin, this.bagX + 254, this.bagY + 98);
            }

            this.context.drawImage(this.images.coin, this.bagX + 254, this.bagY + 184);

            if (elapsed >= 2000) {
                var paperTime = elapsed - 2000;

                if (paperTime >= 500) paperTime = 499;

                this.context2.clearRect(0, 0, this.canvas2.width, this.canvas2.height);
                this.context2.save();

                var paperY0 = 476;
                var paperY1 = -134;
                var paperY2 = this.canvas.height / 2;
                var paperScale = 0.7;


                var y = paperY0 + (paperY1 - paperY0) * paperTime / 1500;
                this.context2.translate(this.canvas2.width / 2, y + this.offsetY + this.bagY);
                this.context2.scale(paperScale, paperScale);
                this.context2.drawImage(this.images.paperbg, -312, -414);
                this.context2.drawImage(this.images.paper_0, -312, -414);

                if (paperTime <= 500) {
                    
                }
                else {
                    //if (paperTime > 1000) paperTime = 1000;
                    //var ystart = this.offsetY + this.bagY + paperY1;
                    //var y = ystart + (paperY2 - ystart) * (paperTime - 500) / 500;
                    //this.context2.translate(this.canvas2.width / 2, y);
                    //var scale = paperScale + (this.paperScale - paperScale) * (paperTime - 500) / 500;
                    //this.context2.scale(scale, scale);
                    //this.context2.drawImage(this.images.paperbg, -312, -414);
                    //this.context2.drawImage(this.images.paper_0, -312, -414);
                }
                this.context2.restore();

                this.context2.globalCompositeOperation = 'destination-out';
                this.context2.drawImage(this.images.paper_mask, this.offsetX + this.bagX, this.offsetY + this.bagY);
                this.context2.globalCompositeOperation = 'source-over';

                if (paperTime <= 500) {
                    
                }

                this.context.save();
                this.context.setTransform(1, 0, 0, 1, 0, 0);
                this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
                this.context.rotate(0 - Math.PI / 180 * 20);
                this.context.translate(0 - this.canvas.width / 2, 0 - this.canvas.height / 2);
                this.context.drawImage(this.canvas2, 0, 0);
                this.context.restore();
            }

            if (elapsed >= 2500) {
                this.running = false;

                this.dispatchEvent({
                    type: 'complete'
                });
            }
        }

        this.context.restore();

        if (this.running || this.waiting) {
            SL.requestAnimationFrame(this.redraw.bind(this));
        }
    };

    this.start = function () {
        this.running = true;
        this.startTime = new Date().valueOf();
        this.redraw();
    };

    this.canvas.addEventListener('click', (function () {
        if (this.waiting) {
            this.waiting = false;
            this.running = true;
            this.startTime = new Date().valueOf();
        }
    }).bind(this));
};
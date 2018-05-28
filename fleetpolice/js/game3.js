var Game = function () {
    var self = this;
    self.playing = false;
    self.carTypes = 4;
    self.carcount = 0;
    self.timeleft = 0;
    self.moving = false;
    self.moveSpeed = 300;
    

    self.stage = new PIXI.Stage(0xFFFFFF);
    
    
    self.width = 640;
    self.height = 640 / window.innerWidth * window.innerHeight;

    self.moveTo = self.height;
    self.moveTime = 0;

    //self.renderer = PIXI.autoDetectRenderer(self.width, self.height);
    self.renderer = new PIXI.CanvasRenderer(self.width, self.height, {
        transparent: true
    });
    self.renderer.view.style.display = 'none';
    if (self.renderer.type == 0) {
        //GL
    }
    else {
        //Canvas
        //self.stage.back
        //self.renderer.transparent = true;
        //self.renderer.clearBeforeRender = true;
    }
    
    document.body.appendChild(self.renderer.view);

    self.nextcar = 0;

    self.grids = new PIXI.Graphics();
    self.stage.addChild(self.grids);
    self.grids.y = self.height;
    self.grids.lineStyle(1, 0xFFFFFF, 1);
    self.grids.moveTo(160, 0);
    self.grids.lineTo(160, -160 * 200);
    self.grids.moveTo(320, 0);
    self.grids.lineTo(320, -160 * 200);
    self.grids.moveTo(480, 0);
    self.grids.lineTo(480, -160 * 200);

    self.container = new PIXI.Sprite(new PIXI.Texture(new PIXI.BaseTexture(new Image())));
    self.container.y = self.height;
    self.container.interactive = true;
    self.stage.addChild(self.container);

    self.txtMin = new PIXI.Text('09', {
        font: 'bold 80px sans-serif',
        fill: 'white'
    });
    self.txtMin.x = 210;
    self.txtMin.y = 100;
    self.stage.addChild(self.txtMin);

    self.txt1 = new PIXI.Text("'", {
        font: 'bold 80px sans-serif',
        fill: 'white'
    });
    self.txt1.x = 300;
    self.txt1.y = 100;
    self.stage.addChild(self.txt1);

    self.txtSec = new PIXI.Text('00', {
        font: 'bold 80px sans-serif',
        fill: 'white'
    });
    self.txtSec.x = 320;
    self.txtSec.y = 100;
    self.stage.addChild(self.txtSec);


    self.txt2 = new PIXI.Text('"', {
        font: 'bold 80px sans-serif',
        fill: 'white'
    });
    self.txt2.x = 410;
    self.txt2.y = 100;
    self.stage.addChild(self.txt2);
    
    self.redraw = function () {

        var elapsed = self.timeleft - new Date();
        if (elapsed <= 0) {
            self.end();
            return;
        }
        elapsed = Math.floor(elapsed / 10);
        var min = Math.floor(elapsed / 100).toString();
        var sec = (elapsed % 100).toString();
        if (min.length == 1) min = '0' + min;
        if (sec.length == 1) sec = '0' + sec;
        self.txtMin.setText(min);
        self.txtSec.setText(sec);

        if (self.moving) {
            var elapsed = self.moveTime - new Date();
            
            if (elapsed <= 0) {
                self.moving = false;
                self.moveTime = 0;
                self.container.y = self.moveTo;
                self.grids.y = self.moveTo;
            }
            else {
                var dis = 160 * (elapsed / self.moveSpeed);
                self.container.y = self.moveTo - dis;
                self.grids.y = self.moveTo - dis;
            }
        }

        self.renderer.render(self.stage);
        if (self.playing) {
            requestAnimFrame(self.redraw);
        }
    };

    self.rightclick = function () {
        self.moveTo += 160;
        self.moveTime = new Date() - 0 + self.moveSpeed;
        self.moving = true;
        self.carcount++;
    };

    self.errorclick = function () {
        self.end();
    };

    self.movePoint = new PIXI.Point(0, 0);

    self.createBlock = function (carid) {
        var sprite;
        if (carid == -1) {
            sprite = new PIXI.Sprite(self.images.space);
            sprite.mousedown = sprite.touchstart = self.errorclick;
        }
        else {
            sprite = new PIXI.Sprite(self.images['car' + carid]);
            sprite.mousedown = sprite.touchstart = self.rightclick;
        }
        //sprite.position = self.movePoint;
        

        sprite.interactive = true;
        return sprite;
    };

    self.fill = function () {
        for (var i = 0; i < 100; i++) {
            var x = Math.floor(Math.random() * 100) % 4;
            for (var j = 0; j < 4; j++) {
                var sprite;
                if (j == x) {
                    sprite = self.createBlock(self.nextcar);
                }
                else {
                    sprite = self.createBlock(-1);
                }
                self.container.addChild(sprite);
                sprite.x = j * 160;
                sprite.y = 0 - (i + 1) * 160;
            }
            self.grids.moveTo(0, 0 - (i + 1) * 160);
            self.grids.lineTo(640, 0 - (i + 1) * 160);
            self.nextcar++;
            self.nextcar = self.nextcar % self.carTypes;
        }
    };

    self.end = function () {
        self.playing = false;
        self.renderer.view.style.display = 'none';
        $('#count').text(self.carcount);
        $('#result').show();
        shareDesc = '我已经拥有了' + self.carcount + '辆全新福特福睿斯，you can you up！'
        $.ajax({
            url: 'Score.ashx',
            type: 'post',
            data: {
                score: self.carcount
            }
        });
    };

    self.start = function () {
        self.container.y = self.height;
        self.grids.y = self.height;
        self.container.removeChildren();
        self.fill();
        self.carcount = 0;
        self.moveTo = self.height;
        self.moving = false;
        self.moveTime = 0;
        self.playing = true;
        self.renderer.view.style.display = '';
        self.timeleft = new Date() - 0 + 30000;
        self.redraw();
    };

    var imgs = [];
    imgs.push({ name: 'space', url: 'img/space.png' });
    for (var i = 0; i < self.carTypes; i++) {
        imgs.push({ name: 'car' + i, url: 'img/car' + i + '.png' });
    }
    if (self.renderer.type == 0) {
        imgs.push({ name: 'bg', url: 'img/bg.jpg' });
    }

    loadImage(imgs, function (images) {
        self.images = {};
        for (var n in images) {
            self.images[n] = new PIXI.Texture(new PIXI.BaseTexture(images[n]));
        }

        if (self.renderer.type == 0) {
            var bg = new PIXI.Sprite(self.images.bg);
            bg.width *= Math.max(self.width / images.bg.width, self.height / images.bg.height);
            bg.x = (self.width - bg.width) / 2;
            bg.y = (self.height - bg.height) / 2;
            self.stage.addChildAt(bg, 0);
        }

        $('#home').show();

        //self.start();
    });
};















/**
     * 加载图片列表
     * @param list 图片列表 格式: {name: '图片名称', url: '图片地址'}
     * @param onComplete 加载完成回调方法
     * @param onProgress 加载进度回调方法
     */
var loadImage = function (list, onComplete, onProgress) {
    var loader = {
        onComplete: onComplete,
        onProgress: onProgress,
        isComplete: false
    };

    if (typeof (list) == 'object' && list.constructor == Array) {
        //加载一个数组
        loader.type = 'list';
        loader.images = [];
        for (var i = 0; i < list.length; i++) {
            var item = {
                name: list[i].name,
                image: new Image()
            };
            item.image.addEventListener('load', function () {
                var complete = 0;
                for (var i = 0; i < loader.images.length; i++) {
                    if (loader.images[i].image.complete) {
                        complete++;
                    }
                }

                if (loader.onProgress) {
                    loader.onProgress(Math.floor(complete * 100 / loader.images.length));
                }
                if (complete >= loader.images.length) {
                    if (loader.isComplete) return;
                    loader.isComplete = true;
                    var result = {};

                    for (var i = 0; i < loader.images.length; i++) {
                        result[loader.images[i].name] = loader.images[i].image;
                    }
                    if (loader.onComplete) {
                        loader.onComplete(result);
                        if (loader.onProgress) {
                            delete loader.onProgress;
                        }
                        delete loader.onComplete;
                    }
                }
            });
            item.image.addEventListener('error', function (evt) {
                var src = evt.target.src;
                evt.target.src = "";
                evt.target.src = src;
            });
            loader.images.push(item);

        }
        for (var i = 0; i < list.length; i++) {
            loader.images[i].image.src = list[i].url;
        }
    }
    else if (typeof (list) == 'string') {
        //加载单个图片地址
        loader.type = 'image';
        loader.image = new Image();
        loader.image.addEventListener('load', function (evt) {
            if (loader.onComplete) {
                loader.onComplete(loader.image);
            }
        });
        loader.image.addEventListener('error', function (evt) {
            var src = evt.target.src;
            evt.target.src = "";
            evt.target.src = src;
        });
        loader.image.src = list;
    }
};
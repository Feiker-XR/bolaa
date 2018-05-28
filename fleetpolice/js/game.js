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
                    if(loader.isComplete) return;
                    var result = {};
                    loader.isComplete = true;

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

/**
     * 判断指定的点是否处于某个矩形内
     * @param x x坐标
     * @param y y坐标
     * @param rect 矩形数组 [左上角x, 左上角y, 宽度, 高度]
     */
var inRect = function (x, y, rect) {
    return x >= rect[0] && x <= rect[0] + rect[2] && y >= rect[1] && y <= rect[1] + rect[3];
};


window.requestAnimFrame = (function () {
    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (func) {
            setTimeout(func, 1000 / 60)
        };
})();


var Game = function () {
    var self = this;

    self.canvas = document.createElement('canvas');
    self.context = self.canvas.getContext('2d');

    self.scale = window.innerWidth / 640;
    
    self.canvas.width = 640;
    self.canvas.height = window.innerHeight / self.scale;
    self.height = self.canvas.height;

    self.dy = (self.canvas.height - 1136) / 2;

    self.state = '';

    self.blocks = [];
    self.outBlocks = [];

    self.timeleft = 0;

    self.carcount = 0;

    self.running = false;
    self.runningStart = 0;

    self.maxY = Math.ceil(self.height / 160) + 2;
    
    self.playing = false;
    self.started = false;
    self.carTypes = 4;
    self.nextcar = 0;

    self.touchpoint = null;
    

    self.redraw = function () {
        
        self.context.clearRect(0, 0, 640, self.canvas.height);
        if (!self.playing) return;
        self.context.strokeStyle = 'rgba(255,255,255,0.6)';
        self.context.lineWidth = 1;
        self.context.beginPath();
        self.context.moveTo(160, 0);
        self.context.lineTo(160, self.canvas.height);
        self.context.closePath();
        self.context.stroke();
        self.context.beginPath();
        self.context.moveTo(320, 0);
        self.context.lineTo(320, self.canvas.height);
        self.context.closePath();
        self.context.stroke();
        self.context.beginPath();
        self.context.moveTo(480, 0);
        self.context.lineTo(480, self.canvas.height);
        self.context.closePath();
        self.context.stroke();


        var dy = 0;
        if (self.running) {
            var elapsed = new Date() - self.runningStart;
            if (elapsed >= 200) {
                elapsed = 200;
                self.running = false;
            }
            dy = 160 * elapsed / 200;
        }

        var i = 0;
        for (var y = 0; y < self.outBlocks.length; y++) {
            var item = self.outBlocks[y];
            var x = item.x;
            self.context.drawImage(self.images['car' + item.car], x * 160, self.height - 160 * (i + 1) + dy);
            if (self.touchpoint != null) {
                if (self.touchpoint.x == x && self.touchpoint.y == i) {
                    console.log(x);
                    self.context.fillStyle = 'red';
                    self.context.globalAlpha = 0.6;
                    self.context.fillRect(x * 160, self.height - 160 * (i + 1) + dy, 160, 160);
                    self.context.globalAlpha = 1;
                }
            }
            self.context.beginPath();
            self.context.moveTo(0, self.height - 160 * (i + 1) + dy);
            self.context.lineTo(640, self.height - 160 * (i + 1) + dy);
            self.context.closePath();
            self.context.stroke();
            
            i++;
        }

        for (var y = 0; y < self.blocks.length && i <= self.maxY; y++, i++) {
            var x = self.blocks[y].x;
            self.context.drawImage(self.images['car' + self.blocks[y].car], x * 160, self.height - 160 * (i + 1) + dy);
            if (self.touchpoint != null) {
                if (self.touchpoint.x == x && self.touchpoint.y == i) {
                    console.log(x);
                    self.context.fillStyle = 'red';
                    self.context.globalAlpha = 0.6;
                    self.context.fillRect(x * 160, self.height - 160 * (i + 1) + dy, 160, 160);
                    self.context.globalAlpha = 1;
                }
            }
            
            self.context.beginPath();
            self.context.moveTo(0, self.height - 160 * (i + 1) + dy);
            self.context.lineTo(640, self.height - 160 * (i + 1) + dy);
            self.context.closePath();
            self.context.stroke();
        }

        if (elapsed > 0 && !self.running) {
            self.outBlocks.shift();
            self.touchpoint = null;
        }

        self.context.fillStyle = '#fff';

        if (self.started) {
            var elapsed = self.timeleft - new Date();

            if (elapsed <= 0) {
                self.end();
                return;
            }
            var time = (Math.floor(elapsed / 10) / 100).toString().split('.');
            var min = time[0];
            var sec = time[1];

            self.context.textAlign = 'right';
            self.context.fillText(min, 300, 230 + self.dy);
            self.context.textAlign = 'left';
            self.context.fillText("'" + (sec == undefined ? '00' : sec), 300, 230 + self.dy);
            self.context.fillText('"', 400, 230 + self.dy);
        }
        else {
            self.context.textAlign = 'right';
            self.context.fillText('30', 300, 230 + self.dy);
            self.context.textAlign = 'left';
            self.context.fillText("'00", 300, 230 + self.dy);
            self.context.fillText('"', 400, 230 + self.dy);
        }
        

        window.requestAnimFrame(self.redraw);
    };

    self.fill = function () {
        for (var i = 0; i < 120; i++) {
            self.blocks.push({ x: Math.floor(Math.random() * 100) % 4, car: self.nextcar });
            self.nextcar++;
            self.nextcar = self.nextcar % self.carTypes;
        }
    };

    self.winSize = (window.innerWidth / 4);
    self.canvas.addEventListener('touchstart', function (evt) {
        if (!self.playing) return;
        
        var bx = Math.floor(evt.touches[0].pageX / self.winSize);
        var by = Math.floor((window.innerHeight - evt.touches[0].pageY) / self.winSize);

        if (self.blocks[by].x == bx) {
            if (!self.started) {
                self.started = true;
                self.timeleft = new Date() - 0 + 30000;
            }
            self.touchpoint = { x: bx, y: by };
            console.log(self.touchpoint);
            self.outBlocks.push(self.blocks.shift());
            self.carcount++;
            self.running = true;
            self.runningStart = new Date() - 0;
        }
        else {
            self.end();
        }
    });

    //self.canvas.addEventListener('click', function (evt) {
    //    if (!self.playing) return;
    //    console.log(evt);
    //    var bx = Math.floor(evt.offsetX / self.winSize);
    //    var by = Math.floor((window.innerHeight - evt.offsetY) / self.winSize);

    //    if (self.blocks[by].x == bx) {
    //        if (!self.started) {
    //            self.started = true;
    //            self.timeleft = new Date() - 0 + 30000;
    //        }
    //        self.touchpoint = { x: bx, y: by };
    //        console.log(self.touchpoint);
    //        self.outBlocks.push(self.blocks.shift());
    //        self.carcount++;
    //        self.running = true;
    //        self.runningStart = new Date() - 0;
    //    }
    //    else {
    //        self.end();
    //    }
    //});

    self.end = function () {
        self.playing = false;

        self.redraw();
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
        self.context.fillStyle = '#fff';
        self.context.font = '80px sans-serif bold';
        self.carcount = 0;
        self.blocks = [];
        self.outBlocks = [];
        self.fill();
        self.playing = true;
        self.started = false;
        self.timeleft = new Date().valueOf() + 30000;
        self.redraw();
    };

    var imgs = [];

    for (var i = 0; i < self.carTypes; i++) {
        imgs.push({ name: 'car' + i, url: 'img/car' + i + '.png' });
    }

    loadImage(imgs, function (images) {
        self.images = images;
        
        document.body.appendChild(self.canvas);
        $('#home').show();
        //self.redraw();
    });
};

var imgUrl = 'http://serv.wx.ford-dsfl.com/EscortGame/img/wxlogo.jpg';
var shareTitle = '寻找福睿斯';
var shareDesc = '30秒内看你能拥有多少台全新福特福睿斯！';
var shareLink = 'http://serv.wx.ford-dsfl.com/EscortGame/';


//alert(imgUrl + "|" + lineLink);
function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
        "appid": '',
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareLink,
        "desc": shareDesc,
        "title": shareTitle
    }, function (res) {
        //_report('send_msg', res.err_msg);
    })
}
function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
        "img_url": imgUrl,
        "img_width": "200",
        "img_height": "200",
        "link": shareLink,
        "desc": shareDesc,
        "title": shareDesc
    }, function (res) {
        //_report('timeline', res.err_msg);
    });
}
function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
        "content": shareDesc,
        "url": shareLink
    }, function (res) {
        //_report('weibo', res.err_msg);
    });
}
//触发WeixinJSBridgeReady事件
if (document.addEventListener) {
    document.addEventListener('WeixinJSBridgeReady', function () {
        // 发送给好友
        WeixinJSBridge.on('menu:share:appmessage', function (argv) {
            shareFriend();
        });
        // 分享到朋友圈
        WeixinJSBridge.on('menu:share:timeline', function (argv) {
            shareTimeline();
        });
        // 分享到微博
        WeixinJSBridge.on('menu:share:weibo', function (argv) {
            shareWeibo();
        });

        WeixinJSBridge.call('showOptionMenu');
        WeixinJSBridge.call('hideToolbar');
    }, false);
}
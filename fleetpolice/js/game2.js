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



var Game = function () {

    var self = this;

    self.container = document.createElement('div');
    self.container.className = 'game';
    self.container.style.display = 'none';

    self.table = document.createElement('table');
    self.container.appendChild(self.table);
    self.table.cellPadding = 0;
    self.table.cellSpacing = 0;
    self.tbody = self.table.appendChild(document.createElement('tbody'));
    self.offsetDelta = window.innerWidth / 4;
    self.offset = 0;
    self.nextcar = 0;
    self.carcount = 0;
    self.timeleft = 0;
    self.playing = false;

    self.timeshow = self.container.appendChild(document.createElement('div'));
    self.timeshow.className = 'time';

    self.errclick = function () {
        if (!self.playing) return;
        self.end();
    };

    self.rightclick = function () {
        if (!self.playing) return;
        self.offset += self.offsetDelta;
        $(self.table).css({
            transform: 'translate(0px, ' + self.offset + 'px)',
            webkitTransform: 'translate(0px, ' + self.offset + 'px)'
        });
        self.carcount++;
    };

    self.end = function () {
        self.playing = false;
        $(self.container).hide();
        $('#count').text(self.carcount);
        $('#result').show();
        $(self.tbody).empty();
        $(self.table).css({
            transform: '',
            webkitTransform: ''
        });
        
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
        self.offset = 0;
        self.nextcar = 0;
        self.carcount = 0;
        self.fill();
        $(self.container).show();
        setTimeout(function () {
            self.playing = true;
            self.timeleft = new Date() - 0 + 30000;
            window.requestAnimFrame(self.timer);
        }, 100);
    };

    self.timer = function () {
        var left = self.timeleft - new Date();
        if (left <= 0) {
            self.end();
            return;
        }

        var time = (Math.floor(left / 10) / 100).toString().split('.');
        var min = time[0];
        var sec = time[1];
        if (min.length < 2) min = '0' + min;
        if (sec == undefined) {
            sec = '00';
        }
        if (sec.length < 2) sec = sec + '0';
        $(self.timeshow).text(min + "'" + sec + '"');
        window.requestAnimFrame(self.timer);
    };

    self.fill = function () {
        
        for (var i = 0; i < 200; i++) {
            var x = Math.floor(Math.random() * 100) % 4;
            
            var tr = $('<tr></tr>').prependTo(self.tbody);
            for (var j = 0; j < 4; j++) {
                var td = $('<td></td>').appendTo(tr);
                var img = new Image();
                if (j == x) {
                    img.src = 'img/car' + self.nextcar + '.png';
                    img.addEventListener('touchstart', self.rightclick);
                }
                else {
                    img.src = 'img/space.png';
                    img.addEventListener('touchstart', self.errclick);
                }
                td.append(img);
            }
            self.nextcar++;
            self.nextcar = self.nextcar % 4;
        }
    };

    loadImage([
        { name: 'car0', url: 'img/car0.png' },
        { name: 'car1', url: 'img/car1.png' },
        { name: 'car2', url: 'img/car2.png' },
        { name: 'car3', url: 'img/car3.png' },
        { name: 'space', url: 'img/space.png' }
    ], function () {
        document.body.appendChild(self.container);
        $('#home').show();
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
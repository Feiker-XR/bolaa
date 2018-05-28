/// <field name='stage' type="SL.Stage">舞台对象</field>
var stage;

var IMAGES = {};

/// <field name='game' type="Game">游戏对象</field>
var game;

$(function () {
    SL.resourceReady([
        { name: 'gamebg', url: 'img/gamebg.png' },
        { name: 'car', url: 'img/car.png' },
        { name: 'wheel', url: 'img/wheel.png' },
        { name: 'oil', url: 'img/oil.png' },
        { name: 'oil_0', url: 'img/oil_0.png' },
        { name: 'oil_1', url: 'img/oil_1.png' },
        { name: 'oil_2', url: 'img/oil_2.png' },
        { name: 'person_0', url: 'img/person_0.png' },
        { name: 'person_1', url: 'img/person_1.png' },
        { name: 'person_stand', url: 'img/person_stand.png' },
        { name: 'person_angry', url: 'img/person_angry.png' },
        { name: 'time_bg', url: 'img/time_bg.png' },
        { name: 'time_bar', url: 'img/time_bar.png' },
        { name: 'time_num', url: 'img/time_num.png' }
    ], function (imgs) {
        IMAGES = imgs;

        initBG();

        init();
    }, function (p) { });

    
});

function initBG() {
    var cxt = document.getCSSCanvasContext('2d', 'gamebg', 675, 891);
    cxt.drawImage(IMAGES.gamebg, 0, 0);
}

function init() {
    game = new Game(document.getElementById('gamecanvas'));
    game.reset();

    stage = new SL.Stage($('.sl-stage')[0]);
    stage.showPage(stage.pages[0]);
}


var Game = function (canvas) {
    /// <param name="canvas" type="HTMLCanvasElement">游戏画布</param>

    /// <field name='canvas' type='HTMLCanvasElement'>游戏画布</field>
    this.canvas = canvas;

    /// <field name='context'>绘图句柄</field>
    this.context = this.canvas.getContext('2d');

    
    

    /// <field name='canvas' type='bool'>游戏是否处于运行中</field>
    this.running = false;

    /// <field name='startTime' type='Number'>开始时间</field>
    this.startTime = 0;

    /// <field name='startTime' type='Number'>结束时间</field>
    this.endTime = 0;

    this.timeLimit = 20;

    /// <field name='startTime' type='Number'>上次绘图时间</field>
    this.lastDrawTime = 0;

    /// <field name='zoom' type='Number'>缩放比率</field>
    this.zoom = 1136 / $(window).height();

    this.canvas.width = Math.ceil($(window).width() * this.zoom);
    this.canvas.height = 1136;

    /// <field name="car">车子状态</field>
    this.car = {
        x: this.canvas.width / 2,
        y: this.canvas.height / 2,
        direction: 'left',
        tx: null,
        ty: null,
        running: false
    };

    this.oils = [];

    this.persons = [];

    /// <field name='carSpeed' type='Number'>车辆跑速</field>
    this.carSpeed = 300;

    /// <field name='personSpeed' type='Number'>人物跑速</field>
    this.personSpeed = 75;

    /// <field name='personSpeed' type='Number'>捡到的油桶数</field>
    this.oilCount = 0;

    this.timeCanvas = document.createElement('canvas');
    this.timeCanvas.width = 362;
    this.timeCanvas.height = 33;
    this.timeContext = this.timeCanvas.getContext('2d');

    this.redraw = function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.running) {
            var elapsed = new Date().valueOf() - this.lastDrawTime;

            if (this.car.running) {
                var dx = 0, dy = 0;
                var distance = this.carSpeed * elapsed / 1000;
                if (this.car.tx == this.car.x) {
                    //纵向运动
                    dy = distance * (this.car.ty > this.car.y ? 1 : -1);
                }
                else if (this.car.ty == this.car.y) {
                    //横向运动
                    dx = distance * (this.car.tx > this.car.x ? 1 : -1);
                }
                else {
                    var len = distance;
                    var radian = Math.atan((this.car.ty - this.car.y) / (this.car.tx - this.car.x));
                    dx = Math.abs(Math.cos(radian) * len) * (this.car.tx > this.car.x ? 1 : -1);
                    dy = Math.abs(Math.sin(radian) * len) * (this.car.ty > this.car.y ? 1 : -1);
                }

                var tx = this.car.x + dx;
                var ty = this.car.y + dy;

                if ((dx > 0 && tx >= this.car.tx)
                    || (dx < 0 && tx <= this.car.tx)
                    || (dy > 0 && ty >= this.car.ty)
                    || (dy < 0 && ty <= this.car.ty)) {
                    tx = this.car.tx;
                    ty = this.car.ty;
                    this.car.tx = null;
                    this.car.ty = null;
                    this.car.running = false;
                }

                this.car.x = tx;
                this.car.y = ty;
            }

            //check oil hit
            for (var i = 0; i < this.oils.length; i++) {
                /// <field name="oil" type="Game.Oil"></field>
                var oil = this.oils[i];

                var dx = oil.x - this.car.x;
                var dy = oil.y - this.car.y;
                if (Math.sqrt(dx * dx + dy * dy) < 133) {
                    //捡到油箱
                    this.oilCount++;
                    oil.update();
                }

                this.drawOil(this.oils[i]);
            }

            //check person hit
            for (var i = 0; i < this.persons.length; i++) {

                /// <field name="person" type="Game.Person"></field>
                var person = this.persons[i];

                if (person.state == 'run') {
                    var dx = this.personSpeed * elapsed / 1000 * (person.tx < person.x ? -1 : 1);

                    var tx = person.x + dx;
                    if((person.tx < person.x && tx <= person.tx)
                        || (person.tx > person.x && tx >= person.tx)) {
                        tx = person.tx;
                        person.tx = null;
                        person.stand();
                    }
                    person.x = tx;
                }

                if (person.state != 'angry') {
                    var dx = person.x - this.car.x;
                    var dy = person.y - this.car.y;
                    if (Math.sqrt(dx * dx + dy * dy) < 100) {
                        //撞到警察
                        //this.oilCount++;
                        this.endTime -= 2000;
                        person.angry();
                    }
                }

                

                this.drawPerson(person);
            }
        }

        this.drawCar();

        this.drawTimer();

        this.lastDrawTime = new Date().valueOf();
        if (this.running) {
            SL.requestAnimationFrame(this.redraw.bind(this));
        }
    };

    this.drawCar = function () {
        this.context.save();
        this.context.translate(this.car.x, this.car.y);
        if (this.car.direction != 'left') {
            this.context.scale(-1, 1);
        }
        this.context.drawImage(IMAGES.car, -108.5, -65.5);

        var rotate = 0;
        if (this.car.running) {
            rotate = 0 - ((new Date().valueOf() - this.startTime) % 1000) / 1000 * Math.PI * 2;
        }
        

        this.context.save();
        this.context.translate(50.5 - 108, 99.5 - 65.5);
        this.context.rotate(rotate);
        this.context.drawImage(IMAGES.wheel, -31.5, -31.5);
        this.context.restore();

        this.context.save();
        this.context.translate(168.5 - 108, 99.5 - 65.5);
        this.context.rotate(rotate);
        this.context.drawImage(IMAGES.wheel, -31.5, -31.5);
        this.context.restore();
        

        this.context.restore();
    };

    this.reset = function () {
        this.car = {
            x: this.canvas.width / 4 * 3,
            y: this.canvas.height / 2,
            direction: 'left',
            tx: null,
            ty: null,
            running: false
        };

        this.running = false;
        
        this.startTime = this.lastDrawTime = new Date().valueOf();
        this.endTime = this.startTime + this.timeLimit * 1000;
        this.redraw();
    };

    this.start = function () {
        this.running = true;
        this.oilCount = 0;

        this.oils = [];
        while (this.oils.length < 1) {
            this.oils.push(new Game.Oil(this.canvas.width, this.canvas.height));
        }

        this.persons = [];
        this.persons.push(new Game.Person(this.canvas.width, this.canvas.width / 4 * 3, this.canvas.height / 4));
        this.persons.push(new Game.Person(this.canvas.width, this.canvas.width / 4, this.canvas.height / 2));
        this.persons.push(new Game.Person(this.canvas.width, this.canvas.width / 4 * 3, this.canvas.height / 4 * 3));
        this.persons[1].direction = 'right';
        this.persons[0].update();
        this.persons[1].update();
        this.persons[2].update();

        this.startTime = this.lastDrawTime = new Date().valueOf();
        this.endTime = this.startTime + this.timeLimit * 1000;
        this.redraw();
    };

    this.end = function () {
        this.running = false;
        $('.oilCount').text(this.oilCount);
        $('#popup .sl-content').hide();
        $('#popup').show();
        wxShare.desc = "我在节油大比拼中共节省了" + this.oilCount + "桶油，快来看看你能节省多少？";
        setShareData();
        wx.showAllNonBaseMenuItem();

        $.ajax({
            url: 'Check.ashx',
            type: 'post',
            dataType: 'json',
            success: function (result) {
                if (result == null) {
                    window.location.reload();
                    return;
                }
                if (!result.played) {
                    $('#form').show();
                }
                else {
                    $('.result').hide();
                    $('.played').show();
                    $('#result').show();
                    if (result.shared) {
                        $('#btn_share2').hide();
                    }
                    else {
                        shareVote = true;
                        $('#btn_share2').show();
                    }
                }
            }
        });
    };

    this.drawOil = function (oil) {
        /// <param name="oil" type="Game.Oil"></param>
        var x = oil.x - 136 / 2;
        var y = oil.y - 114 / 2;
        this.context.drawImage(IMAGES.oil, x, y);
        var elapsed = (new Date().valueOf() - this.startTime) % 2000;
        if (elapsed >= 500) {
            this.context.drawImage(IMAGES.oil_0, x, y);
        }
        if (elapsed >= 1000) {
            this.context.drawImage(IMAGES.oil_1, x, y);
        }
        if (elapsed >= 1500) {
            this.context.drawImage(IMAGES.oil_2, x, y);
        }
    };

    this.drawPerson = function (person) {
        /// <param name="person" type="Game.Person"></param>

        var dx = - 37.5;
        var dy = - 80;

        this.context.save();

        this.context.translate(person.x, person.y);
        if (person.direction == 'left') {
            this.context.scale(-1, 1);
        }
        if (person.state == 'run') {
            var elapsed = (new Date().valueOf() - this.startTime) % 1000;
            if (elapsed < 500) {
                this.context.drawImage(IMAGES.person_0, dx, dy);
            }
            else {
                this.context.drawImage(IMAGES.person_1, dx, dy);
            }
        }
        else {
            this.context.drawImage(IMAGES.person_stand, dx, dy);
        }
        if (person.state == 'angry') {
            this.context.translate(15.5, -128);
            this.context.drawImage(IMAGES.person_angry, 0, 0);
        }

        this.context.restore();
    };

    this.drawTimer = function () {
        var timeLeft = this.endTime - new Date().valueOf();
        if (timeLeft < 0) timeLeft = 0;

        this.timeContext.clearRect(0, 0, this.timeCanvas.width, this.timeCanvas.height);
        this.timeContext.save();
        this.timeContext.drawImage(IMAGES.time_bar, 0, 0);
        this.timeContext.globalCompositeOperation = "destination-in";
        var barx = -362 * (this.timeLimit * 1000 - timeLeft) / (this.timeLimit * 1000);
        
        this.timeContext.drawImage(IMAGES.time_bar, barx, 0);
        this.timeContext.restore();

        var x = (this.canvas.width - 362) / 2;
        var y = 995;

        this.context.drawImage(IMAGES.time_bg, x, y);
        this.context.drawImage(this.timeCanvas, x, y);

        var stime = Math.ceil(timeLeft / 1000).toString();
        var sx = x + 10;
        var sy = 954;
        for (var i = 0; i < stime.length; i++) {
            this.context.drawImage(IMAGES.time_num, 0, parseInt(stime[i]) * 48, 28, 48, sx, sy, 28, 48);
            sx += 28;
        }

        if (timeLeft <= 0) {
            this.end();
        }
    };

    this.canvas.addEventListener('touchstart', (function (evt) {
        evt.preventDefault();
        evt.stopPropagation();

        if (this.running) {
            var x = evt.touches[0].pageX * this.zoom;
            var y = evt.touches[0].pageY * this.zoom;

            if (x != this.car.x || y != this.car.y) {
                this.car.tx = x;
                this.car.ty = y;
                this.car.direction = x < this.car.x ? 'left' : 'right';
                this.car.running = true;
            }
        }
    }).bind(this));
};

Game.Oil = function (width, height) {

    this.width = width;
    this.height = height;

    this.update = function () {
        this.x = 136 / 2 + (this.width - 136) * Math.random();
        this.y = 114 / 2 + (this.height - 114) * Math.random();
    };

    this.update();
};

Game.Person = function (width, x, y) {
    this.width = width;
    this.state = 'stand';
    this.direction = 'left';
    this.x = x;
    this.y = y;
    this.tx = null;

    this.timer = 0;

    this.angry = function () {
        clearTimeout(this.timer);
        this.state = 'angry';
        this.timer = setTimeout(this.update.bind(this), 2500);
    };

    this.update = function () {
        this.tx = 75 + (this.width - 150) * Math.random();
        this.state = 'run';
        this.direction = this.tx < this.x ? 'left' : 'right';
    };

    this.stand = function () {
        clearTimeout(this.timer);
        this.state = 'stand';
        this.timer = setTimeout(this.update.bind(this), 2500);
    };
};
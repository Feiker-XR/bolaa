var mainHeight;
var gamebg;

var answer = -1;

var waitAnswer = false;

var star = 0;

var item1, item2, item3;

var gameResult = null;

var more = false;

var waitted = false;

var needinfo = true;

var userStop = true;

var share = {
    title: '来长安福特车展吧，有福等你！',
    desc: '查看你的幸运星，领取属于你的幸运号！'
};

$(function () {
    star = Math.floor(Math.random() * 1000 % 3) + 1;
    $('.star').each(function (index, el) {
        if(index < star)
        {
            $(el).show();
        }
    });

    SL.checkImage(document.getElementsByTagName('img'), function () {
        $('.wrap').show();
        var areasHeight = 0;
        $('.wrap>.area').each(function () {
            if (!$(this).hasClass('main')) {
                areasHeight += $(this).height();
            }
        }).last().hide();

        mainHeight = $(window).height() - 40 - areasHeight;

        $('.main').css({
            height: mainHeight + 'px'
        });

        $('.game').css({
            height: mainHeight - $('.question').height() + 'px'
        });

        var giftimgHeight = mainHeight - $('.hasgift').height();
        $('.giftimg').css('height', giftimgHeight);




        var zoom = ($(window).width() - 30) / 593;

        $('#gamebg').attr('height', (mainHeight - $('.question').height()) / zoom);

        gamebg = new GameBG(document.getElementById('gamebg'));

        $('#question').css({
            transform: 'scale(' + zoom + ',' + zoom + ')',
            webkitTransform: 'scale(' + zoom + ',' + zoom + ')'
        });

        var gameZoom = Math.min(zoom, $('#gamebg').height() / 315);

        $('#game').css({
            transform: 'scale(' + gameZoom + ',' + gameZoom + ')',
            webkitTransform: 'scale(' + gameZoom + ',' + gameZoom + ')',
            left: (($(window).width() - 30) - 593 * gameZoom) / 2 + 'px',
            top: ($('#gamebg').height() - 315 * gameZoom) / 2 + 'px'
        });

        item1 = new GameItem($('#item1')[0]);
        item2 = new GameItem($('#item2')[0]);
        item3 = new GameItem($('#item3')[0]);

        item3.addEventListener('complete', function () {
            if (gameResult.result > 0) {
                setTimeout(function () {
                    $('.page').removeClass('show');
                    $('#p5').addClass('show');
                }, 1500);
            }
            else 
            {
                setTimeout(function () {
                    $('.page').removeClass('show');
                    $('#p3').addClass('show');
                }, 1500);
            }
        });

        var formZoom = Math.min(zoom, mainHeight / 504);

        $('.form').css({
            transform: 'scale(' + formZoom + ',' + formZoom + ')',
            webkitTransform: 'scale(' + formZoom + ',' + formZoom + ')',
            left: (($(window).width() - 30) - 593 * formZoom) / 2 + 'px',
            top: (mainHeight - 504 * gameZoom) / 2 + 'px'
        });

        $('#p1').css('visibility', 'visible');
    });

    $('.car').click(function () {
        if (!waitAnswer) return;

        waitAnswer = false;
        if (parseInt($(this).attr('data-id')) == answer) {
            $(this).find('.result').eq(0).show();
            star++;
            flashStar($('.star').eq(star - 1)[0]);
            
        }
        else {
            $(this).find('.result').eq(1).show();
        }

        $('#btn_play_gray').hide();
        $('#btn_play').show();
    });

    $('#p_cartype').change(function () {
        $('#s_cartype').text($(this).val());
    });
});

function submitInfo() {
    var name = $.trim($('#p_name').val());
    var phone = $.trim($('#p_phone').val());
    var cartype = $('#p_cartype').val();

    if (name == '') {
        alert('请输入您的姓名');
        return;
    }

    if (phone.length != 11 || !/1[0-9]{10}/.test(phone)) {
        alert('请输入有效的手机号');
        return;
    }

    if (cartype == '') {
        alert('请选择您喜爱的车型');
        return;
    }

    $.ajax({
        url: 'SubmitInfo.ashx',
        type: 'post',
        data: {
            name: name,
            phone: phone,
            cartype: cartype
        }
    });

    $('.page').removeClass('show');
    userStop = true;
    needinfo = false;
    $('#p2').addClass('show');
    checkResult();
}

function gameStart()
{
    $('.page').css('visibility', 'visible');
    if (!more) {
        alert('sorry，本时段抽奖机会已用完，请下个时间段再试！');
        return;
    }

    answer = setQuestion();

    waitAnswer = true;

    $('.pages').removeClass('show');

    $('#p2').addClass('show');
}

function runStop() {
    if (userStop) return;

    $('#btn_stop').hide();

    if (needinfo) {
        $('.pages').removeClass('show');
        $('#p4').addClass('show');
    }
    else {
        userStop = true;
        checkResult();
    }
}

function runStart() {
    $('#playbtns img').hide();
    $('#btn_stop').show();

    item1.start();
    item2.start();
    item3.start();

    userStop = false;

    $.ajax({
        url: 'GetGift.ashx',
        type: 'post',
        data: {
            star: star
        },
        dataType: 'json',
        success: function (result) {
            gameResult = result;
            more = result.more;
            checkResult();
            if (result.result > 0) {
                WXENV.shareData.title = '长安福特车展送福啦！';
                WXENV.shareData.desc = '来长安福特展区看车展，还领取到了属于我的幸运号！';
                WXENV.updateShareData();

                $('.giftimg span').empty().append($('<img />').attr('src', 'ShowTicket.ashx?id=' + result.id));
            }
        }
    });

    //setTimeout(function () {
    //    waitted = true;
    //    checkResult();
    //}, 4000);
};

function checkResult() {
    if (gameResult != null && userStop) {

        var arrs = [];

        if (gameResult.result > 0) {
            var id = Math.floor(Math.random() * 1000) % 10;
            arrs.push(id);
            arrs.push(id);
            arrs.push(id);
        }
        else {
            for (var i = 0; i < 3; i++) {
                var id = Math.floor(Math.random() * 1000) % 10;
                while (arrs.indexOf(id) != -1) {
                    id = Math.floor(Math.random() * 1000) % 10;
                }
                arrs.push(id);
            }
        }

        setTimeout(function () {
            item1.stop(arrs[0]);
        }, 0);

        
        setTimeout(function () {
            item2.stop(arrs[1]);
        }, 500);


        setTimeout(function () {
            item3.stop(arrs[2]);
        }, 1500);
    }
};

function checkReset() {
    if (more) {
        runReset();
        $('.page').removeClass('show');

        star = Math.floor(Math.random() * 1000 % 3) + 1;
        $('.star').hide().each(function (index, el) {
            if (index < star) {
                $(el).show();
            }
        });

        $('#playbtns img').hide();
        $('#btn_play_gray').show();

        WXENV.shareData.title = share.title;
        WXENV.shareData.desc = share.desc;
        WXENV.updateShareData();

        gameStart();
    }
    else {
        alert('sorry，本时段抽奖机会已用完，请下个时间段再试！');
    }
}

function runReset() {
    gameResult = null;

    waitted = false;

    userStop = true;

    item1.reset();

    item2.reset();

    item3.reset();
};

function setQuestion() {
    var id = Math.floor(Math.random() * 1000) % 10;
    $('#ques img').hide().eq(id).show();

    var arrs = [];
    arrs.push(id);
    for (var i = 0; i < 2; i++) {
        var fake = Math.floor(Math.random() * 1000) % 10;
        while (arrs.indexOf(fake) != -1) {
            fake = Math.floor(Math.random() * 1000) % 10;
        }
        arrs.push(fake);
    }

    arrs.sort(function () {
        return Math.floor(Math.random() * 1000) % 2 == 1 ? -1 : 1;
    });

    for (var i = 0; i < 3; i++) {
        $('#car' + i).attr('data-id', arrs[i]).find('img').hide().eq(arrs[i]).show();
    }

    return id;
}

var GameBG = function (canvas) {
    /// <field name="canvas" type="HTMLCanvasElement"></field>

    this.canvas = canvas;

    this.cxt = this.canvas.getContext('2d');

    

    this.images = {
        bg1: $('#img_gamebg1')[0],
        bg2: $('#img_gamebg2')[0],
        bg3: $('#img_gamebg3')[0]
    };

    this.cxt.drawImage(this.images.bg1, 0, 0);
    this.cxt.drawImage(this.images.bg2, 0, this.canvas.height - this.images.bg2.height);
    this.cxt.drawImage(this.images.bg3, 0, (this.canvas.height - this.images.bg3.height) / 2);

    //this.redraw();
};

var GameItem = function (canvas) {
    /// <field name="canvas" type="HTMLCanvasElement"></field>

    SL.EventDispatcher.call(this);

    this.canvas = canvas;

    this.cxt = this.canvas.getContext('2d');

    this.maxSpeed = 50;

    this.acc = 25;

    this.speed = 0;

    this.running = false;

    this.stopPos = null;

    this.lastTime = 0;

    this.pos = 0;
    this.y = 17.5;

    this.imgs = {
        bg: $('#img_item_bg')[0],
        mask: $('#img_item_mask')[0],
        cars: $('#img_cars')[0],
        cars_alt: $('#img_cars_alt')[0]
    };

    this.redraw = function () {
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var elapsed = this.lastTime == 0 ? 0 : new Date().valueOf() - this.lastTime;

        if (this.running) {
            if (this.stopPos == null) {
                if (this.speed < this.maxSpeed) {
                    this.speed += this.acc * elapsed / 1000;
                }
                if (this.speed > this.maxSpeed) {
                    this.speed = this.maxSpeed;
                }
            }
            //else {
            //    this.speed += this.acc * elapsed / 1000;
            //    if (this.speed < 1) this.speed = 1;
            //}

            this.pos -= this.speed;
            if (this.stopPos != null) {
                if (this.pos < this.stopPos) {
                    this.pos = this.stopPos;
                    this.speed = 0;
                    this.running = false;
                    this.dispatchEvent({
                        type: 'complete'
                    });
                }
            }

            this.y = this.pos + 17.5;
            while (this.y < -525) {
                this.y += 800;
            }
        }
        

        var car = this.speed == this.maxSpeed ? this.imgs.cars_alt : this.imgs.cars;
        
        this.cxt.drawImage(car, 16, this.y);
        if (this.y > 0) {
            this.cxt.drawImage(car, 16, this.y - 800);
        }

        this.cxt.globalCompositeOperation = 'destination-in';
        this.cxt.drawImage(this.imgs.mask, 0, 0);

        this.cxt.globalCompositeOperation = 'destination-over';
        this.cxt.drawImage(this.imgs.bg, 0, 0);

        this.cxt.globalCompositeOperation = 'source-over';

        this.lastTime = new Date().valueOf();

        if (this.running) {
            reqeustAnimFrame(this.redraw.bind(this));
        }
    };

    this.start = function () {
        this.lastTime = new Date().valueOf();
        this.running = true;
        this.redraw();
    };

    this.reset = function () {
        this.pos = this.pos % 800;
        this.lastTime = 0;
        this.running = false;
        this.stopPos = null;
        this.redraw();
    };

    this.stop = function (id) {
        var stopPos = (id - 1) * -80 + (Math.ceil(this.pos / -800) + 5) * -800;

        this.stopPos = stopPos;
        //0 - 80
        //1 - 0
        //2 - -80
        //3 - -160
    };

    this.redraw();
};

function flashStar(img)
{
    $(img).show();
    setTimeout(function () {
        $(img).hide();
    }, 250);
    setTimeout(function () {
        $(img).show();
    }, 500);
    setTimeout(function () {
        $(img).hide();
    }, 750);
    setTimeout(function () {
        $(img).show();
    }, 1000);
}

var reqeustAnimFrame = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) { setTimeout(callback, 16); };
})();
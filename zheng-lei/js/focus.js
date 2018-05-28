var stage;
var scaleArrow;
var stopLine;
var metor;

$(function () {
    document.addEventListener('touchmove', function (evt) {
        if(p1Step != 25)
        {
            evt.preventDefault();
        }
    });

    stage = new SL.Stage(document.getElementById('stage'));
    stage.showPage('loading');

    SL.checkImage(document.getElementsByTagName('img'), function () {
        stage.showPage('p1');

        //scaleArrow = new ScaleArrow(document.getElementById('scale_arrow'), document.getElementById('img_scale_arrow'));

        stopLine = new StopLine(document.getElementById('stop_line'), document.getElementById('stopline1'), document.getElementById('stopline2'));

        metor = new Metor(document.getElementById('metor'),
            document.getElementById('img_metor'),
            document.getElementById('img_metor_mask')
            );
    });

    var p14 = $('#p1_4')[0];

    p14.touch = null;

    p14.addEventListener('touchstart', function (evt) {
        if (evt.touches.length > 1) {
            var dx = evt.touches[0].pageX - evt.touches[1].pageX;
            var dy = evt.touches[0].pageY - evt.touches[1].pageY;
            p14.touch = {
                len: Math.sqrt(dx * dx + dy * dy)
            };
        }
    });

    p14.addEventListener('touchmove', function (evt) {
        if (p1Step != 12 || p14.touch == null || evt.touches.length < 2) {
            return;
        }

        var dx = evt.touches[0].pageX - evt.touches[1].pageX;
        var dy = evt.touches[0].pageY - evt.touches[1].pageY;
        var len = Math.sqrt(dx * dx + dy * dy);

        if (len / p14.touch.len > 1.5) {
            p1Step = 13;
            $('.scalehand').hide();
            $('#p1_4').removeClass('top');
            $('.monitor_small').addClass('big');
            setTimeout(function () {
                $('#p1_5').css('opacity', 1);
            }, 600);
            setTimeout(function () {
                $('.text9').css('opacity', 1);
            }, 1600);
            setTimeout(function () {
                p1Step = 14;
                $('.up').show();
            }, 2600);
        }
    });

    p14.addEventListener('touchend', function (evt) {
        p14.touch = null;
    });

    var stopTouch = null;

    $('#p_8_2')[0].addEventListener('touchstart', function (evt) {
        if (p1Step != 20) return;
        stopTouch = {
            x: evt.touches[0].pageX,
            y: evt.touches[0].pageY,
            step1: false
        }
    });

    function carDoStop() {
        p1Step = 21;
        $('#stop_line').hide();
        $('.text15').css('opacity', 0);
        stopTouch = null;
        $('.car42').addClass('stop');
        setTimeout(function () {
            $('.text16').css('opacity', 1);
        }, 2000);
        setTimeout(function () {
            p1Step = 22;
            $('.up').show();
        }, 3000);
    }

    $('#p_8_2').click(function () {
        if (p1Step != 20) return;
        carDoStop();
    });

    $('#p_8_2')[0].addEventListener('touchmove', function (evt) {
        if (p1Step != 20) return;
        if (stopTouch == null) {
            return;
        }

        if (evt.touches[0].pageX < stopTouch.x - 20 && evt.touches[0].pageY < stopTouch.y - 20) {
            stopTouch.step1 = true;
        }

        if (stopTouch.step1) {
            if (evt.touches[0].pageX > stopTouch.x + 40) {
                carDoStop();
            }
        }
    });
});

function initBG(name, image, width, height) {
    width = height || 640;
    height = height || 1136;

    /// <var name="cxt" type="CanvasRenderingContext2D"></var>
    var cxt = document.getCSSCanvasContext('2d', name, width, height);

    cxt.drawImage(image, 0, 0);
}

var bgimages = [];

var _bg = new Image();
_bg.src = 'img/bg.jpg';
bgimages.push(_bg);

SL.checkImage(bgimages, function () {
    initBG('space', bgimages[0]);
});

var p1Actived = false;
var p1Step = 0;
function onP1Active()
{
    if (!p1Actived)
    {
        $('#bg1_1').css('opacity', 1);
        setTimeout(function () {
            $('#bg1_2').css('opacity', 1);
        }, 1000);

        setTimeout(function () {
            $('#text1_1, #text1_2').removeClass('step1');
        }, 2000);

        setTimeout(function () {
            $('.up').show();
            addSlideEventListener(stage.getPageById('p1').element, function (direction) {
                if(p1Step == 0)
                {
                    $('.up').hide();
                    $('#text1_1, #text1_2').addClass('step2');
                    p1Step = 1;
                    setTimeout(function () {
                        $('#text2_1, #text2_2').removeClass('step1');
                    }, 1000);
                    setTimeout(function () {
                        p1Step = 2;
                        $('.up').show();
                    }, 2000);
                }
                else if(p1Step == 2)
                {
                    $('.up').hide();
                    p1Step = 3;
                    $('#p1_2').css('opacity', 1);
                    metor.started = true;
                    metor.startTime = new Date().valueOf();
                    metor.redraw();
                    
                    
                    setTimeout(function () {
                        

                        
                    }, 1000);

                    setTimeout(function () {
                        //$('#bg1_3').css('opacity', 1);
                        
                    }, 2000);

                    setTimeout(function () {
                        $('.text3').css('opacity', 1);
                    }, 3000);
                    
                    setTimeout(function () {
                        $('.text4').css('opacity', 1);
                    }, 3700);

                    setTimeout(function () {
                        p1Step = 4;
                        $('.up').show();
                    }, 4700);
                }
                else if(p1Step == 4)
                {

                    $('.up').hide();
                    p1Step = 5;
                    $('.text3, .text4').css('opacity', 0);
                    setTimeout(function () {
                        $('.title').css('opacity', 1);
                    }, 1000);

                    setTimeout(function () {
                        $('.text5').css('opacity', 1);
                        $('.car9').removeClass('out');
                    }, 2000);

                    setTimeout(function () {
                        p1Step = 6;
                        
                        $('.up').show();
                    }, 3000);
                }
                else if(p1Step == 6)
                {
                    $('.up').hide();
                    p1Step = 7;
                    $('#p1_3').addClass('top').css('opacity', 1);
                    setTimeout(function () {
                        p1Step = 8;
                        metor.started = false;
                        $('.up').show();
                    }, 1000);
                }
                else if (p1Step == 8) {
                    $('.up').hide();
                    showEngine();
                }
                else if(p1Step == 10)
                {
                    $('.up').hide();
                    p1Step = 11;
                    $('#p1_3').removeClass('top');
                    
                    
                    $('#p1_4').addClass('top').css('opacity', 1);
                    setTimeout(function () {
                        p1Step = 12;
                        $('.scalehand').show();
                    }, 1000);
                }
                else if(p1Step == 14)
                {
                    $('.up').hide();
                    p1Step = 15;
                    $('#p1_7').addClass('top').css('opacity', 1);
                    setTimeout(function () {
                        $('.text10').css('opacity', 1);
                    }, 1000);
                    setTimeout(function () {
                        $('.btnstart').show();
                    }, 2000);
                }
                else if(p1Step == 16)
                {
                    $('.up').hide();
                    p1Step = 17;
                    //$('.radar').css({
                    //    animationName: 'initial',
                    //    webkitAnimationName: 'initial'
                    //});
                    $('#radar1').hide();

                    $('.text12_1').css('opacity', 0);
                    setTimeout(function () {
                        $('.car5').each(function (index, el) {
                            $(el).css('top', parseFloat($(el).css('top')) + 1050 + 'px');
                        });
                    }, 1000);

                    setTimeout(function () {
                        $('.text13').css('opacity', 1);
                    }, 2000);

                    setTimeout(function () {
                        $('.text13').css('opacity', 0);
                        $('.car6').css('top', '108px');
                    }, 5000);

                    setTimeout(function () {
                        radarRun($('#radar2')[0]);
                    }, 6500);

                    setTimeout(function () {
                        $('.text14').css('opacity', 1);
                        SL.animation($('.grid')[0]).iteration(function () {
                            SL.animation($('.grid')[0]).unbind('iteration', arguments.callee);
                            $('.grid').removeClass('grid_speed1').addClass('grid_speed2');
                        });
                        p1Step = 18;
                        $('.up').show();
                        $('.car6').addClass('out');
                    }, 7000);
                }
                else if(p1Step == 18)
                {
                    $('.up').hide();
                    $('#radar2').hide();
                    p1Step = 19;
                    $('.text14').css('opacity', 0);
                    
                    $('.car6').css('top', '');

                    setTimeout(function () {
                        $('.car4').css('left', '301px').css('top', '468px');
                    }, 1000);

                    setTimeout(function () {
                        SL.animation($('.grid')[0]).iteration(function () {
                            SL.animation($('.grid')[0]).unbind('iteration', arguments.callee);
                            $('.grid').removeClass('grid_speed2');

                            $('.car7_area').animate({
                                top: 0
                            }, {
                                duration: 7000,
                                easing: 'easeOutSine',
                                step: function (now, tween) {
                                    $('.grid').css('bottom', -40 - (now % 40) + 'px');
                                },
                                complete: function () {
                                    
                                    $('.car4').hide();
                                    $('.car42').show();
                                    $('.text15').css('opacity', 1);
                                    setTimeout(function () {
                                        $(stopLine.canvas).show();
                                        stopLine.started = true;
                                        stopLine.redraw();
                                        p1Step = 20;

                                    }, 1000);
                                    
                                }
                            });
                        });
                    }, 2000);
                }
                else if (p1Step == 22) {
                    $('.up').hide();
                    p1Step = 23;
                    $('#p1_8').removeClass('top');
                    $('#p1_9_2').addClass('top').css('opacity', 1);
                    setTimeout(function () {
                        $('#p1_9_2').prevAll().remove();
                        $('#attrs').addClass('run');
                    }, 1000);

                    setTimeout(function () {
                        $('#attrs2').addClass('in');
                    }, 16000);

                    setTimeout(function () {
                        p1Step = -24;
                        $('.up').show();
                    }, 17500);

                    //$('#p1_9').addClass('top').css('opacity', 1);
                    //setTimeout(function () {
                    //    $('.text17').css('opacity', 1);
                    //}, 1000);
                    //setTimeout(function () {
                    //    $('.car8').addClass('run');
                    //}, 2000);
                    //setTimeout(function () {
                    //    $('#bg1_9').css('opacity', 1);
                    //    p1Step = 24;
                    //}, 3000);
                }
                else if (p1Step == -24) {
                    p1Step = -25;
                    $('#p1_9_2').removeClass('top');
                    $('#p1_9').addClass('top').css('opacity', 1);
                    setTimeout(function () {
                        $('.text17').css('opacity', 1);
                    }, 1000);
                    setTimeout(function () {
                        $('.car8').addClass('run');
                    }, 2000);
                    setTimeout(function () {
                        $('#bg1_9').css('opacity', 1);
                        p1Step = 24;
                    }, 3000);

                }
            });
        }, 3000);
    }
}

function goTry()
{
    if (p1Step != 24) return;

    p1Step = 25;
    $('#p1_9').removeClass('top');
    $('#p1_10').addClass('top').css('opacity', 1).find('.sl-content').show();
    setTimeout(function () {
        $('#p1_10').prevAll().remove();
    }, 1000);
}

function backAttr() {
    $('#p1_9_2').addClass('top');
    $('#p1_9').css('opacity', 0);
    setTimeout(function () {
        $('#p1_9').removeClass('top');
        p1Step = -24;
        $('.up').show();
    }, 1000);
}

function showEngine() {
    if (p1Step == 8) {
        p1Step = 9;
        $('#engine1').css('opacity', 1);
        $('.text6').css('opacity', 0);
        $('.text7').css('opacity', 1);
        setTimeout(function () {
            p1Step = 10;
            $('.up').show();
        }, 1000);
    }
}

var carRunned = 0;
var carRunTimer = 0;

function carStart() {
    //$('.btnstart').hide();
    var carStop = function () {
        carRunned = 2;
        $('.btnstart').hide();

        var thecar = document.getElementsByClassName('car3')[0];

        var css = window.getComputedStyle(thecar);

        var x = css.left;
        var y = css.top;

        $(thecar).css({
            left: x,
            top: y
        });

        $('#p1_7').removeClass('top');
        $('#p1_8').addClass('top').css('opacity', 1);

        setTimeout(function () {
            $('.car4').css('top', '');
            $('.text12').css('opacity', 1);
        }, 1000);

        setTimeout(function () {
            $('#p1_8_1').addClass('zoomin');
        }, 2000);

        setTimeout(function () {
            $('.car4').css('top', '416px');
            $('.car5').eq(0).css('top', '108px');
            $('.car5').eq(1).css('top', '702px')
        }, 3500);

        setTimeout(function () {
            
            $('.text12').css('opacity', 0);
            $('.text12_1').css('opacity', 1);
        }, 5000);

        setTimeout(function () {
            radarRun($('.radar').show()[0]);

        }, 5500);

        setTimeout(function () {
            p1Step = 16;
            $('.up').show();
        }, 8500);
    };

    if (carRunned == 0) {
        carRunned = 1;
        $('.car3').last().addClass('go');
        $('.text10').css('opacity', 0);
        $('.text11').css('opacity', 1);

        carRunTimer = setTimeout(function () {
            carStop();
        }, 2000);
    }
    else if(carRunned == 1)
    {
        clearTimeout(carRunTimer);
        carStop();
    }
}

function addSlideEventListener(element, callback) {
    /// <field name="element" type="HTMLElement"></field>

    element.touch = null;

    element.touchcallback = callback;

    element.addEventListener('touchstart', function (evt) {
        evt.currentTarget.touch = {
            x: evt.touches[0].pageX,
            y: evt.touches[0].pageY
        };
    });

    element.addEventListener('touchmove', function (evt) {
        //evt.preventDefault();
        if (evt.currentTarget.touch == null) {
            return;
        }
        var limit = Math.min($(window).width() / 4, $(window).height() / 6);
        if (evt.touches[0].pageY - evt.currentTarget.touch.y < 0 - limit) {
            evt.target.touch = null;
            element.touchcallback('up');

        }
        else if (evt.touches[0].pageY - evt.currentTarget.touch.y > limit) {
            evt.currentTarget.touch = null;
            element.touchcallback('down');
        }
        else if (evt.touches[0].pageX - evt.currentTarget.touch.x < 0 - limit) {
            evt.currentTarget.touch = null;
            element.touchcallback('left');
        }
        else if (evt.touches[0].pageY - evt.currentTarget.touch.y > limit) {
            evt.currentTarget.touch = null;
            element.touchcallback('right');
        }
    });

    element.addEventListener('touchend', function (evt) {
        evt.currentTarget.touch = null;
    });
};

var ScaleArrow = function (canvas, img) {
    /// <field name="canvas" type="HTMLCanvasElement"></field>
    /// <field name="img" type="Image"></field>

    this.canvas = canvas;
    this.cxt = this.canvas.getContext('2d');

    this.img = img;

    this.startTime = 0;
    this.started = false;

    this.redraw = function () {
        var elapsed = this.started ? new Date().valueOf() - this.startTime : 0;
        elapsed = elapsed % 1500;
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.cxt.drawImage(this.img, 0, 0);

        this.cxt.save();
        this.cxt.globalCompositeOperation = 'source-atop';
        this.cxt.translate(246 * elapsed / 1500, 246 * elapsed / 1500);
        this.cxt.globalAlpha = 0.5;
        this.cxt.lineWidth = 20;
        this.cxt.strokeStyle = '#fff';
        this.cxt.beginPath();
        this.cxt.moveTo(123, -123);
        this.cxt.lineTo(-123, 123);
        this.cxt.closePath();
        this.cxt.stroke();

        this.cxt.restore();

        if (this.started) {
            SL.requestAnimationFrame(this.redraw.bind(this));
        }
    };

    this.redraw();
};

var Metor = function (canvas, metor, mask) {
    /// <field name="canvas" type="HTMLCanvasElement"></field>
    /// <field name="metor" type="Image"></field>
    /// <field name="mask" type="Image"></field>

    this.canvas = canvas;
    this.cxt = this.canvas.getContext('2d');

    this.metor = metor;
    this.mask = mask;

    this.startTime = 0;
    this.started = false;

    this.redraw = function () {
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var elapsed = this.started ? new Date().valueOf() - this.startTime : 0;

        elapsed = elapsed % 3000;

        

        this.cxt.save();
        

        var x = 0 + (-1358 - 0) * elapsed / 3000;
        //var y = -322 + (618 - -322) * elapsed / 2000;
        var y = 0 + (102 - 0) * elapsed / 3000;
        this.cxt.drawImage(this.metor, x, y);
        this.cxt.drawImage(this.metor, x + 1358, y - 102);
        this.cxt.globalCompositeOperation = 'destination-in';
        this.cxt.drawImage(this.mask, 0, 0);
        this.cxt.restore();

        if (this.started) {
            SL.requestAnimationFrame(this.redraw.bind(this));
        }
    };

    this.redraw();
};

var StopLine = function (canvas, img1, img2) {
    /// <field name="canvas" type="HTMLCanvasElement"></field>
    /// <field name="img1" type="Image"></field>
    /// <field name="img2" type="Image"></field>

    this.canvas = canvas;
    this.cxt = this.canvas.getContext('2d');

    this.img1 = img1;
    this.img2 = img2;

    this.startTime = 0;
    this.started = false;

    this.redraw = function () {
        var elapsed = this.started ? new Date().valueOf() - this.startTime : 0;
        elapsed = elapsed % 2000;
        this.cxt.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //console.log(elapsed);
        if (elapsed < 1000) {
            this.cxt.drawImage(this.img1, 0, 0);

            this.cxt.save();
            this.cxt.globalCompositeOperation = 'source-atop';
            var y = this.canvas.height * (1 - elapsed / 1000);
            this.cxt.globalAlpha = 0.5;
            this.cxt.lineWidth = 20;
            this.cxt.strokeStyle = '#fff';
            this.cxt.beginPath();
            this.cxt.moveTo(0, y);
            this.cxt.lineTo(this.canvas.width, y);
            this.cxt.closePath();
            this.cxt.stroke();
            this.cxt.restore();

            this.cxt.drawImage(this.img2, 0, 0);
        }
        else {
            elapsed = elapsed - 1000;
            this.cxt.drawImage(this.img2, 0, 0);

            this.cxt.save();
            this.cxt.globalCompositeOperation = 'source-atop';
            this.cxt.translate(this.canvas.width * (elapsed / 1000), 0);
            this.cxt.globalAlpha = 0.5;
            this.cxt.lineWidth = 20;
            this.cxt.strokeStyle = '#fff';
            this.cxt.beginPath();
            this.cxt.moveTo(0, 0);
            this.cxt.lineTo(0, this.canvas.height);
            this.cxt.closePath();
            this.cxt.stroke();
            this.cxt.restore();

            this.cxt.drawImage(this.img1, 0, 0);
        }

        if (this.started) {
            SL.requestAnimationFrame(this.redraw.bind(this));
        }
    };

    this.redraw();
};

var sending = false;
function submitTry() {
    if (sending) return;
    

    var data = {
        name: $.trim($('#p_name').val()),
        phone: $.trim($('#p_phone').val()),
        prov: $.trim($('#p_prov').val()),
        city: $.trim($('#p_city').val())
    };

    if (data.name == '') {
        alert('请输入姓名');
        return;
    }

    if (data.phone.length != 11 || !/1[0-9]{10}/.test(data.phone)) {
        alert('请输入有效手机号');
        return;
    }

    if (data.prov == '' || data.city == '') {
        alert('请选择省份和城市');
        return;
    }

    sending = true;

    $.ajax({
        url: 'SubmitInfo.ashx',
        type: 'post',
        data: data,
        success: function () {
            sending = false;
            alert('提交成功');
        }
    });
};

var radarTimer = 0;

function radarRun(container) {
    var _run = function (c) {
        $(c).find('img').hide();
        setTimeout(function () {
            $(c).find('img').eq(0).show();
        }, 200);
        setTimeout(function () {
            $(c).find('img').eq(1).show();
        }, 400);
        setTimeout(function () {
            $(c).find('img').eq(2).show();
        }, 600);
        setTimeout(function () {
            $(c).find('img').eq(3).show();
        }, 800);
    };

    clearInterval(radarTimer);
    _run(container);
    radarTimer = setInterval(function () {
        _run(container);
    }, 1000);
}
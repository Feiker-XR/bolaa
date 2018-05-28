function initBG(imgs) {
    var cxt = document.getCSSCanvasContext('2d', 'bg', 640, 1136);
    cxt.drawImage(imgs.bg, 0, 0);

    var cxt2 = document.getCSSCanvasContext('2d', 'run_bg', 640, 1136);
    cxt2.drawImage(imgs.run_bg, 0, 0);

    var cxt2 = document.getCSSCanvasContext('2d', 'run_bg2', 640, 1136);
    cxt2.drawImage(imgs.run_bg2, 0, 0);

    var cxt3 = document.getCSSCanvasContext('2d', 'trybg1', 640, 1136);
    cxt3.drawImage(imgs.trybg1, 0, 0);

    lightRun(imgs.light1, imgs.light2);
}

var VOICES = [
    { word: '天气', page: 'p2_1' },
    { word: '导航', page: 'p2_2' },
    { word: '地图', page: 'p2_2' },
    { word: '音乐', page: 'p2_3' },
    { word: '听听', page: 'p2_3' },
    { word: '预约', page: 'p5' },
    { word: '试驾', page: 'p5' },
    { word: '撒野', page: 'p3' }
];

var stage;

var width, height;

var weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var map = null;
var myPos = null;

var VOICE_ON = false;
var VOICE_TIMER = 0;

var allImgs;
var totalImgs;

var engineAudio;

function main() {

    width = $(window).width();
    height = $(window).height();

    var wdayZoom = Math.min(width / 640, height / 5 / 228);
    $('.weather .wday').css({
        transform: 'scale(' + wdayZoom + ',' + wdayZoom + ')',
        webkitTransform: 'scale(' + wdayZoom + ',' + wdayZoom + ')',
        left: (width / 4 - 160 * wdayZoom) / 2 + 'px',
        top: (height / 5 - 228 * wdayZoom) / 2 + 'px'
    });

    var ndayZoom = Math.min(width / 640, height * 0.8 / 907);
    $('.weather .nday').css({
        transform: 'scale(' + ndayZoom + ',' + ndayZoom + ')',
        webkitTransform: 'scale(' + ndayZoom + ',' + ndayZoom + ')',
        left: (width - 640 * ndayZoom) / 2 + 'px',
        top: (height * 0.8 - 907 * ndayZoom) / 2 + 'px'
    });

    var tryZoom = Math.min(width / 640, height * 0.64 / 720);
    $('.tryarea').css({
        transform: 'scale(' + tryZoom + ',' + tryZoom + ')',
        webkitTransform: 'scale(' + tryZoom + ',' + tryZoom + ')',
        left: (width - 640 * tryZoom) / 2 + 'px',
        top: (height * 0.64 - 720 * tryZoom) / 2 + 'px'
    });

    $('.title').css({
        height: width / 10 + 'px',
        lineHeight: width / 10 + 'px'
    });

    $('.title img').click(function () {
        $('#music')[0].pause();
        stage.navigate('p2', 'left');
    });

    $.ajax({
        url: 'GetWeather.ashx',
        type: 'get',
        dataType: 'json',
        success: function (result) {
            //console.log(result);

            if (result.error_code == 0) {
                var nday = $('.weather .nday');
                var date = new Date();

                drawWeatherIcon(nday.find('.icon')[0], 'img/weather/' + result.result.today.weather_id.fa + '.png');

                nday.find('.city').text(result.result.today.city);

                var temperature = result.result.today.temperature;

                var pat = /[0-9]+/g;

                var temp1 = parseInt(pat.exec(temperature));
                var temp2 = pat.exec(temperature);

                if (temp2 != null) {
                    temp1 = Math.round((temp1 + parseInt(temp2[0]) / 2));
                }

                nday.find('.date').text(weeks[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + (date.getDate() + 1));

                nday.find('.temp').html(temp1 + '<sup>o</sup>');

                for (var i = 0; i < 4; i++) {
                    var el = $('.weather .list .wday')[i];

                    var dstr = result.result.future[i].date;
                    var date = new Date(dstr.substr(0, 4) + '/' + dstr.substr(4, 2) + '/' + dstr.substr(6));

                    $(el).find('.date').text(weeks[date.getDay()]);

                    drawWeatherIcon($(el).find('.icon')[0], 'img/weather/' + result.result.future[i].weather_id.fa + '.png');

                    var temperature = result.result.future[i].temperature;

                    var pat = /[0-9]+/g;

                    var temp1 = parseInt(pat.exec(temperature));
                    var temp2 = pat.exec(temperature);

                    if (temp2 != null) {
                        temp1 = Math.round((temp1 + parseInt(temp2[0]) / 2));
                    }

                    $(el).find('.temp').html(temp1 + '<sup>o</sup>');
                }
            }
        }
    });

    engineAudio = new WebAudioPlayer('img/engine.mp3');

    $('.btn_run')[0].addEventListener('touchstart', function (evt) {
        evt.preventDefault();
        startRun();
    });

    $('.btn_run')[0].addEventListener('touchend', function (evt) {
        evt.preventDefault();
        endRun();
    });

    $('#music').on('playing', function () {
        $('.music').addClass('run');
    });

    $('#music').on('pause', function () {
        $('.music').removeClass('run');
    });

    $('#music').on('timeupdate', function (evt) {
        var music = document.getElementById('music');

        var p = music.currentTime / 44.434286;

        var stime = Math.floor(music.currentTime);
        var sec = stime % 60;
        var min = (stime - sec) / 60;
        var t = (min < 10 ? '0' + min : min.toString()) + ':' + (sec < 10 ? '0' + sec : sec.toString());

        $('.music .time1').text(t);

        $('.music .bar1').css({
            width: p * 100 + '%'
        });
    });

    $('.p2_voice_mask').each(function (index, el) {
        el.addEventListener('touchstart', function () {
            if (VOICE_ON) return;
            VOICE_ON = true;
            $(el.parentNode).addClass('on');
            wx.startRecord();
        });
    });
    document.addEventListener('touchend', function () {
        if (VOICE_ON) {
            VOICE_ON = false;
            $('.p2_voice').removeClass('on');
            wx.stopRecord({
                success: function (res) {
                    var localId = res.localId;

                    wx.translateVoice({
                        localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            if (res.translateResult == '' || res.translateResult == null || res.translateResult == undefined) {
                                return;
                            }
                            for (var i = 0; i < VOICES.length; i++) {
                                if (res.translateResult.indexOf(VOICES[i].word) != -1) {
                                    stage.navigate(VOICES[i].page, 'right');
                                    return;
                                }
                            }

                        }
                    });
                }
            });
        }
        
    });

    for (var i = 0; i < PROV.length; i++) {
        $('#p_prov').append($('<option></option>').text(PROV[i].name).attr('value', PROV[i].name));
    }
    onProvChange();

    stage = new SL.Stage(document.getElementsByClassName('sl-stage')[0]);
    stage.showPage('p1');
    $('.loading').hide();
}

function p1Active() {
    setTimeout(function () {
        $('#homebg2').css('visibility', 'visible');
        setTimeout(function () {
            $('.homeimgs').addClass('run');

            setTimeout(function () {
                stage.navigate('p2', 'right');
            }, 2500);

        }, 700);
    }, 1000);
}


var p2_actived = false;
function p2Active() {
    if (!p2_actived) {
        p2_actived = true;

        setTimeout(function () {
            $('.p2_tip img')[1].style.display = 'block';
        }, 800);
        setTimeout(function () {
            $('.p2_tip img')[2].style.display = 'block';
        }, 1600);
        setTimeout(function () {
            $('.p2_tip img')[3].style.display = 'block';
        }, 2400);

        setTimeout(function () {
            $('#p2').addClass('run0');

            setTimeout(function () {
                $('#p2').removeClass('run0').addClass('run');
                p2_txt_run();
            }, 1000);
        }, 4200);
    }
}

var p2_txt_cur = 0;
function p2_txt_run() {
    var tip = $('.p2_txt img')[p2_txt_cur];

    $(tip).animate({
        opacity: 1
    }, {
        duration: 600,
        easing: null,
        complete: (function () {
            setTimeout((function () {
                $(this).animate({
                    opacity: 0
                }, {
                    duration: 600,
                    easing: null,
                    complete: p2_txt_run
                });
            }).bind(this), 2400);
        }).bind(tip)
    });
    p2_txt_cur++;
    p2_txt_cur = p2_txt_cur % $('.p2_txt img').length;
}

var p2_1actived = false;
function p2_1Active() {
    if (!p2_1actived) {
        p2_1actived = true;
        setTimeout(function () {
            $('#p2_1').addClass('run');
        }, 1600);
    }
}

var p2_2actived = false;
function p2_2Active() {
    if (!p2_2actived) {
        p2_2actived = true;
        setTimeout(function () {
            $('#p2_2').addClass('run');
        }, 1600);

        if (map == null) {
            map = new BMap.Map('map');
            map.addControl(new BMap.NavigationControl());
            map.addControl(new BMap.ScaleControl());
            map.addControl(new BMap.OverviewMapControl());
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    console.log(position);

                    myPos = new BMap.Point(position.coords.longitude, position.coords.latitude);

                    map.centerAndZoom(myPos, 15);

                    var marker = new BMap.Marker(myPos);        // 创建标注    
                    map.addOverlay(marker);
                });
            }
        }
    }
}

function doMapSearch() {
    var target = $.trim($('.search input').val());
    if (target == '') return;
    var driving = new BMap.DrivingRoute(map, {
        renderOptions: {
            map: map,
            autoViewport: true
        },
        onSearchComplete: function (results) {
            //console.log(results);
        }
    });
    driving.search(myPos, target);
}

function clearMapSearch() {
    $('.search input').val('');
    map.clearOverlays();
    map.centerAndZoom(myPos, 15);
    var marker = new BMap.Marker(myPos);        // 创建标注    
    map.addOverlay(marker);
}

var p2_3actived = false;
function p2_3Active() {
    if (!p2_3actived) {
        p2_3actived = true;
        setTimeout(function () {
            $('#p2_3').addClass('run');
        }, 1600);
    }
}

function p3Active() {
    runned = false;
}

function p3Deactive() {
    setTimeout(function () {
        $('#p3').hide();
        setTimeout(function () {
            $('.meter_point').removeClass('run');
            $('.btn_run').show();
            $('.car').removeClass('run');
            $('.run_bg2').removeClass('run');
            setTimeout(function () {
                $('#p3').show();
            }, 0);
        }, 0);
        
    }, 600);
}

var runTimer = 0;
var runned = false;
function startRun() {
    if (runned) return;
    $('.meter_point').addClass('run');
    engineAudio.play();
    runTimer = setTimeout(function () {
        runned = true;
        $('.btn_run').hide();
        $('.car').addClass('run');
        $('.run_bg2').addClass('run');

        setTimeout(function () {
            engineAudio.pause();
            stage.navigate('p2', 'left');
        }, 1500);
    }, 1000);
}

function endRun() {
    if (runned) return;
    clearTimeout(runTimer);
    $('.meter_point').removeClass('run');
    engineAudio.pause();
}

function p5Deactive() {
    $('#p_name').val('');
    $('#p_phone').val('');
    $('#theform').show();
    $('#theresult').hide();
}

function onProvChange() {
    $('#s_prov span').text($('#p_prov').val());
    $('#p_city').empty();
    for (var i = 0; i < PROV.length; i++) {
        if (PROV[i].name == $('#p_prov').val()) {
            for (var j = 0; j < PROV[i].cities.length; j++) {
                $('#p_city').append($('<option></option>').text(PROV[i].cities[j]).attr('value', PROV[i].cities[j]));
            }
        }
    }
    onCityChange();
}

function onCityChange() {
    $('#s_city span').text($('#p_city').val());
}

function onSexChange(el) {
    $('.radio').removeClass('on');
    $(el).addClass('on');
}

function trySubmit() {
    var name = $.trim($('#p_name').val());
    var sex = $('#radio_1').hasClass('on') ? '男' : '女';
    var phone = $.trim($('#p_phone').val());
    var prov = $('#p_prov').val();
    var city = $('#p_city').val();

    if (name == '') {
        alert('请输入姓名');
        return;
    }

    var pat = /1[0-9]{10}/;
    if (phone.length != 11 || !pat.test(phone)) {
        alert('请输入有效手机号');
        return;
    }

    $.ajax({
        url: 'SendInfo.ashx',
        type: 'post',
        data: {
            name: name,
            sex: sex,
            phone: phone,
            prov: prov,
            city: city
        },
        success: function () {
            $('#theresult').show();
            $('#theform').hide();
        }
    });
}


var lightTime = 0;
function lightRun(light1, light2) {
    if (lightTime == 0) lightTime = new Date().valueOf();

    var elapsed = new Date().valueOf() - lightTime;

    var canvas = document.getElementById('p2_icons');
    var context = canvas.getContext('2d');

    var pertime = 1500;

    context.clearRect(0, 0, canvas.width, canvas.height);

    var time = elapsed % (pertime * 2);

    if (time < pertime) {
        var sy1 = -370;
        var ey1 = 500;
        var y1 = sy1 + (ey1 - sy1) * (time / pertime);
        context.save();
        context.beginPath();
        context.rect(0, 43, 89, 555);
        context.closePath();
        context.clip();
        context.drawImage(light1, 0, y1);
        context.restore();

        var sx2 = -324;
        var ex2 = 546;
        var x2 = sx2 + (ex2 - sx2) * (time / pertime);
        context.save();
        context.beginPath();
        context.rect(43, 0, 553, 192);
        context.closePath();
        context.clip();
        context.drawImage(light2, x2, 0);
        context.restore();
    }
    else {
        time -= pertime;

        var sy1 = -370;
        var ey1 = 500;
        var y1 = sy1 + (ey1 - sy1) * (time / pertime);
        context.save();
        context.beginPath();
        context.rect(547, 43, 89, 555);
        context.closePath();
        context.clip();
        context.drawImage(light1, 547, y1);
        context.restore();

        var sx2 = -324;
        var ex2 = 546;
        var x2 = sx2 + (ex2 - sx2) * (time / pertime);
        context.save();
        context.beginPath();
        context.rect(43, 551, 553, 192);
        context.closePath();
        context.clip();
        context.drawImage(light2, x2, 551);
        context.restore();
    }

    SL.requestAnimationFrame(function () {
        lightRun(light1, light2);
    });
}

function drawWeatherIcon(canvas, imgUrl) {
    var data = {
        canvas: canvas,
        context: canvas.getContext('2d'),
        img: new Image()
    };

    data.img.addEventListener('load', (function () {
        this.context.drawImage(this.img, 0, 0);
        this.context.beginPath();
        this.context.rect(0, 0, this.canvas.width, this.canvas.height);
        this.context.closePath();
        this.context.fillStyle = '#fff';
        this.context.save();
        this.context.globalCompositeOperation = 'source-in';
        this.context.fill();
        this.context.restore();
    }).bind(data));

    data.img.src = imgUrl;
}
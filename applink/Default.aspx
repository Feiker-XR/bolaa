<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
    <meta charset="utf-8" />
    <title>新嘉年华-尽享驾驭新体验</title>
    <link href="main.css" rel="stylesheet" />
    <script type="text/javascript">
        var VOICES = [
            {
                words: ['预约试驾'],
                callback: 'voiceVerifyComplete2()'
            },
            {
                words: ['天气情况'],
                callback: 'voiceVerifyComplete()'
            },
            {
                words: ['导航到家'],
                callback: 'voiceVerifyComplete()'
            },
            {
                words: ['随便听听'],
                callback: 'voiceVerifyComplete()'
            }
        ];
        var VOICE_STEP = 0;
    </script>
    <script src="js/wx.js"></script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=U3ByUy4wwBGHvW76of5oYZpo"></script>
    <script src="js/city.js"></script>
</head>
<body>
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/SL.min.js"></script>
    <script src="js/WebAudioPlayer.js"></script>
    <script type="text/javascript">
        var zoom, width, height;
        var weeks = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var map = null;

        var cx = 0;
        var cy = 0;
        var cur = '1';

        var VOICE_ON = false;
        var VOICE_TIMER = 0;

        var allImgs;
        var totalImgs;

        var engineAudio = new WebAudioPlayer('img/engine.mp3');

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

        function init() {
            width = $(window).width();
            height = $(window).height();

            $('.stage, .pages, .page').css({
                width: width + 'px',
                height: height + 'px'
            });

            var homeZoom = Math.min(width / 640, height / 1000);
            $('.home').css({
                transform: 'scale(' + homeZoom + ',' + homeZoom + ')',
                webkitTransform: 'scale(' + homeZoom + ',' + homeZoom + ')',
                left: (width - 640 * homeZoom) / 2 + 'px'
            });

            var zoom = Math.min(width / 640, height / 1136);
            $('.inner').css({
                transform: 'scale(' + zoom + ',' + zoom + ')',
                webkitTransform: 'scale(' + zoom + ',' + zoom + ')',
                left: (width - 640 * zoom) / 2 + 'px'
            });

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
                if (steps.length > 0) {
                    switchPage('2', 'left');
                }
                else {
                    if (runned) {
                        switchPage('4', 'left');
                    }
                    else {
                        switchPage('3', 'left');
                    }
                }
            });

            $('.stage').show();

            document.getElementById('music').addEventListener('playing', function () {
                $('.music .control').addClass('on');
                $('.music .cover').addClass('run');
            });
            document.getElementById('music').addEventListener('pause', function () {
                $('.music .control').removeClass('on');
                $('.music .cover').removeClass('run');
            });

            document.getElementById('music').addEventListener('timeupdate', function () {
                var music = document.getElementById('music');

                var p = music.currentTime / music.duration;

                var stime = Math.floor(music.currentTime);
                var sec = stime % 60;
                var min = (stime - sec) / 60;
                var t = (min < 10 ? '0' + min : min.toString()) + ':' + (sec < 10 ? '0' + sec : sec.toString());

                $($('.music .time span')[0]).text(t);

                $('.bar2').css('left', p * 100 - 100 + '%');
            });

            $('.btn_run')[0].addEventListener('touchstart', function (evt) {
                evt.preventDefault();
                startRun();
            });

            $('.btn_run')[0].addEventListener('touchend', function (evt) {
                evt.preventDefault();
                endRun();
            });

            $('.music .control img').click(function (evt) {
                var music = document.getElementById('music');
                if (music.paused) {
                    music.play();
                }
                else {
                    music.pause();
                }
            });

            $('.p2_voice_mask').each(function (index, el) {
                el.addEventListener('touchstart', function () {
                    if (VOICE_ON) return;
                    VOICE_TIMER = setTimeout(function () {
                        VOICE_ON = true;
                        $(el.parentNode).addClass('on');
                        wx.startRecord();
                    }, 500);
                });
            });
            document.addEventListener('touchend', function () {
                clearTimeout(VOICE_TIMER);
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
                                        onVoiceFail();
                                        return;
                                    }

                                    //alert(res.translateResult);

                                    var v = VOICES[VOICE_STEP];
                                    for (var i = 0; i < v.words.length; i++) {
                                        if (res.translateResult.indexOf(v.words[i]) != -1) {
                                            eval(v.callback);
                                            return;
                                        }
                                    }

                                },
                                fail: function () {
                                    onVoiceFail();
                                }
                            });
                        }
                    });
                }
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
        }

        var LOADING_IMGS = {};

        $(function () {
            SL.loadImage([
                { name: 'loading_bg', url: 'img/loading_bg.png' },
                { name: 'loading_light', url: 'img/loading_light.png' }
            ], function (imgs) {
                
                LOADING_IMGS = imgs;

                setLoadingProgress(0);

                allImgs = $('img').toArray();

                totalImgs = allImgs.length + 6;

                SL.checkImage(allImgs, function () {
                    setLoadingProgress(allImgs.length / totalImgs);
                    SL.loadImage([
                        { name: 'bg', url: 'img/bg.jpg' },
                        { name: 'run_bg', url: 'img/run_bg.jpg' },
                        { name: 'run_bg2', url: 'img/run_bg2.jpg' },
                        { name: 'trybg1', url: 'img/trybg1.jpg' },
                        { name: 'light1', url: 'img/light1.png' },
                        { name: 'light2', url: 'img/light2.png' }
                        ], function (bg_imgs) {
                            initBG(bg_imgs);

                            $('.loading').hide();
                            init();

                            setTimeout(function () {
                                $('#homebg2').css('visibility', 'visible');
                                setTimeout(function () {
                                    $('.homeimgs').addClass('run');
                                }, 700);
                            }, 1000);
                        }, function (p) {
                            setLoadingProgress((p / 100 * 6 + allImgs.length) / totalImgs);
                        });
                }, function (p) {
                    setLoadingProgress(p / 100 * allImgs.length / totalImgs);
                });
                    
            });

                
        });

        function setLoadingProgress(p) {
            var canvas = document.getElementById('loading');
            var cxt = canvas.getContext('2d');

            var startAngle = 0 - Math.PI / 2;
            var endAngle = startAngle + Math.PI * 2 * p;

            cxt.clearRect(0, 0, canvas.width, canvas.height);
            if (p == 0) {
                cxt.drawImage(LOADING_IMGS.loading_bg, 0, 0);
            }
            else if (p == 1) {
                cxt.drawImage(LOADING_IMGS.loading_light, 0, 0);
            }
            else {
                cxt.save();
                cxt.beginPath();
                cxt.moveTo(50, 50);
                cxt.arc(50, 50, 200, startAngle, endAngle, true);
                cxt.lineTo(50, 50);
                cxt.closePath();
                cxt.clip();
                cxt.drawImage(LOADING_IMGS.loading_bg, 0, 0);
                cxt.restore();

                cxt.save();
                cxt.beginPath();
                cxt.moveTo(50, 50);
                cxt.arc(50, 50, 200, startAngle, endAngle);
                cxt.lineTo(50, 50);
                cxt.closePath();
                cxt.clip();
                cxt.drawImage(LOADING_IMGS.loading_light, 0, 0);
                cxt.restore();
            }

            cxt.fillStyle = '#fff';
            cxt.font = '20px sans-serif';
            cxt.textAlign = 'center';
            cxt.textBaseline = 'middle';
            cxt.fillText(Math.floor(p * 100) + '%', 50, 50);
        }



        function switchPage(id, direction) {
            $('.pages>.page').each(function (index, el) {
                if (el != $('#p' + cur)[0]) {
                    $(el).css({
                        left: (0 - cx + 100) + '%',
                        top: (0 - cy + 100) + '%'
                    });
                }
            });

            var cx1 = cx, cy1 = cy;

            switch (direction) {
                case 'right':
                    cx1 = cx - 100;
                    break;
                case 'left':
                    cx1 = cx + 100;
                    break;
                case 'top':
                    cy1 = cy + 100;
                    break;
                case 'bottom':
                    cy1 = cy - 100;
                    break;
            }

            $('#p' + id).css({
                left: (0 - cx1) + '%',
                top: (0 - cy1) + '%'
            });

            $('.pages').css({
                transform: 'translate(' + cx1 + '%,' + cy1 + '%)',
                webkitTransform: 'translate(' + cx1 + '%,' + cy1 + '%)'
            });

            cur = id;
            cx = cx1;
            cy = cy1;
            setTimeout(function () {
                $('.pages>.page').each(function (index, el) {
                    if (el != $('#p' + cur)[0]) {
                        $(el).css({
                            left: (0 - cx + 100) + '%',
                            top: (0 - cy + 100) + '%'
                        });
                    }
                });
                onSwitchPage(cur);
            }, 600);
        }

        function onSwitchPage(id) {
            if (id == '2') {
                $('#p2 .p2_txt img').hide();
                $('#txt2_' + steps[0]).show();
                VOICE_STEP = parseInt(steps[0]);
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
                    $('#p2').addClass('run');
                }, 3900);
            }
            else if (id == '4') {
                VOICE_STEP = 0;
            }
            else if (id == '2_1' || id == '2_2' || id == '2_3') {
                setTimeout(function () {
                    $('#p' + id).addClass('run');
                }, 1600);
                if (id == '2_2') {
                    if (map == null) {
                        map = new BMap.Map('map');
                        map.addControl(new BMap.NavigationControl());
                        map.addControl(new BMap.ScaleControl());
                        map.addControl(new BMap.OverviewMapControl());
                        if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(function (position) {
                                console.log(position);
                                map.centerAndZoom(new BMap.Point(position.coords.longitude, position.coords.latitude), 15);

                                var marker = new BMap.Marker(new BMap.Point(position.coords.longitude, position.coords.latitude));        // 创建标注    
                                map.addOverlay(marker);
                            });
                        }
                    }
                }
            }
        }

        function voiceVerifyComplete() {
            var id = steps.shift();
            //location.hash = '#2_' + id;
            switchPage('2_' + id, 'right');
        }

        function voiceVerifyComplete2() {
            switchPage('5', 'right');
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

        var runTimer = 0;

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
                    if (steps.length == 0) {
                        switchPage('4', 'left');
                    }
                    else {
                        switchPage('2', 'left');
                    }
                }, 1500);
            }, 1000);
        }

        function endRun() {
            if (runned) return;
            clearTimeout(runTimer);
            $('.meter_point').removeClass('run');
            engineAudio.pause();
        }

        function onProvChange() {
            $('#s_prov span').text($('#p_prov').val());
            $('#p_city').empty();
            for (var i = 0; i < PROV.length; i++) {
                if(PROV[i].name == $('#p_prov').val())
                {
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

        for (var i = 0; i < PROV.length; i++) {
            $('#p_prov').append($('<option></option>').text(PROV[i].name).attr('value', PROV[i].name));
        }
        onProvChange();
    </script>
    <div class="loading">
        <table>
            <tr>
                <td>
                    <canvas width="100" height="100" id="loading"></canvas>
                </td>
            </tr>
        </table>
    </div>
    <div class="stage">
        <div class="pages" style="transform: translate(0%, 0%); -webkit-transform: translate(0%, 0%);">
            <div class="page" id="p1" style="left: 0%; top: 0%;">
                <div class="homebg">
                    <img src="img/bg1.jpg" />
                    <img src="img/bg2.jpg" id="homebg2" style="visibility: hidden;" />
                </div>
                <div class="home">
                    <div class="homeimgs">
                        <img src="img/home_2.png" onclick="switchPage('2', 'right');" />
                        <img src="img/home_1.png" onclick="switchPage('3', 'right');" />
                    </div>
                </div>
            </div>

            <div class="page bg" id="p2">
                <div class="inner">
                    <div class="p2_tip">
                        <img src="img/p2_tip.png" />
                        <img src="img/p2_tip_1.png" style="display: none;" />
                        <img src="img/p2_tip_2.png" style="display: none;" />
                        <img src="img/p2_tip_3.png" style="display: none;" />
                    </div>
                </div>
                <div class="page mask" id="p2_mask">
                    <div class="inner">
                        <div class="p2_icons">
                            <img src="img/p2_icons.png" />
                            <canvas width="637" height="641" id="p2_icons"></canvas>
                        </div>
                        

                        <div class="p2_txt">
                            <img src="img/txt_weather.png" id="txt2_1" style="display: none;" />
                            <img src="img/txt_map.png" id="txt2_2" style="display: none;" />
                            <img src="img/txt_music.png" id="txt2_3" style="display: none;" />
                        </div>

                        <div class="p2_voice">
                            <img src="img/btn_voice.png" />
                            <img src="img/btn_voice_on.png" />
                            <div class="p2_voice_mask"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page" id="p2_1">
                <div class="page splash">
                    <div class="inner">
                        <img src="img/splash_weather.png" />
                    </div>
                </div>
                <div class="page main">
                    <div class="weather">
                        <div class="now">
                            <div class="nday">
                                <canvas width="120" height="120" class="icon"></canvas>
                                <span class="city"></span>
                                <span class="date"></span>
                                <span class="temp"></span>
                            </div>
                        </div>
                        <div class="list">
                            <div class="day">
                                <div class="wday">
                                    <span class="date">Tuesday</span>
                                    <canvas width="120" height="120" class="icon"></canvas>
                                    <span class="temp">23<sup>°</sup></span>
                                </div>
                            </div>
                            <div class="day">
                                <div class="wday">
                                    <span class="date">Tuesday</span>
                                    <canvas width="120" height="120" class="icon"></canvas>
                                    <span class="temp">23<sup>°</sup></span>
                                </div>
                            </div>
                            <div class="day">
                                <div class="wday">
                                    <span class="date">Tuesday</span>
                                    <canvas width="120" height="120" class="icon"></canvas>
                                    <span class="temp">23<sup>°</sup></span>
                                </div>
                            </div>
                            <div class="day">
                                <div class="wday">
                                    <span class="date">Tuesday</span>
                                    <canvas width="120" height="120" class="icon"></canvas>
                                    <span class="temp">23<sup>°</sup></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="title">
                        <img src="img/back.png" />
                        天气通
                    </div>
                </div>
            </div>

            <div class="page" id="p2_2">
                <div class="page splash">
                    <div class="inner">
                        <img src="img/splash_map.png" />
                    </div>
                </div>
                <div class="page main">
                    <div id="map"></div>
                    <div class="title">
                        <img src="img/back.png" />
                        百度地图
                    </div>
                </div>
            </div>

            <div class="page" id="p2_3">
                <div class="page splash">
                    <div class="inner">
                        <img src="img/splash_music.png" />
                    </div>
                </div>
                <div class="page main">
                    <div class="music">
                        <div class="title">
                            <img src="img/back.png" />
                        </div>
                        <div class="inner">
                            <div class="songtitle">十年</div>
                            <div class="author"><span>陈奕迅</span></div>
                            <div class="cover">
                                <div class="cover_inner">
                                    <img src="img/cover.jpg" />
                                </div>
                            </div>
                        </div>
                        <div class="bot">
                            <div class="bar">
                                <div class="bar2" style="left: -100%;">
                                    <div class="ball"></div>
                                </div>
                            </div>
                            <div class="time">
                                <span>00:00</span>
                                <span>00:44</span>
                            </div>
                            <div class="control">
                                <img src="img/btn_play.png" />
                                <img src="img/btn_pause.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="page" id="p3">
                <div class="page run_bg"></div>
                <div class="page run_bg2"></div>
                <div class="inner">
                    <img src="img/car.png" class="car" />
                    <img src="img/meter.png" class="meter" />
                    <img src="img/meter_point.png" class="meter_point" />
                    <img src="img/btn_run.png" class="btn_run" />
                </div>
            </div>

            <div class="page trybg1" id="p4">
                <div class="inner">
                    <div class="p2_txt">
                        <img src="img/txt_p4.png" />
                    </div>

                    <div class="p2_voice">
                        <img src="img/btn_voice.png" />
                        <img src="img/btn_voice_on.png" />
                        <div class="p2_voice_mask"></div>
                    </div>
                </div>
            </div>

            <div class="page" id="p5">
                <div class="trytop">
                    <img src="img/logo.png" />
                </div>
                <div class="tryform">
                    <img src="img/tryform_head.png" />
                    <div class="tryarea">
                        <div id="theform">
                            <img src="img/tryformtxt.png" style="position: absolute;" />
                            <input type="text" class="box" id="p_name" maxlength="20" />
                            <div class="radio on" id="radio_1" onclick="onSexChange(this);">
                                <img src="img/radio.png" />
                                <img src="img/radio_on.png" />
                            </div>
                            <div class="radio" id="radio_2" onclick="onSexChange(this);">
                                <img src="img/radio.png" />
                                <img src="img/radio_on.png" />
                            </div>
                            <input type="tel" class="box" id="p_phone" maxlength="11" />
                            <label class="box" id="s_prov">
                                <select id="p_prov" onchange="onProvChange();"></select>
                                <span></span>
                            </label>
                            <label class="box" id="s_city">
                                <select id="p_city" onchange="onCityChange();"></select>
                                <span></span>
                            </label>
                        
                            <img src="img/btn_trysubmit.png" class="trysubmit" onclick="trySubmit();" />
                        </div>
                        <div id="theresult" style="display: none;">
                            您的预约试驾信息已提交<br />
                            感谢您的支持
                        </div>
                        <img src="img/tryform_footer.png" class="tryformfooter" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style="display: none;">
        <audio src="img/music.mp3" preload="auto" id="music">
            <source src="img/music.mp3" type="audio/mpeg" />
        </audio>
    </div>
    
</body>
</html>

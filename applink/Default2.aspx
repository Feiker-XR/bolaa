<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default2.aspx.cs" Inherits="Web.Default2" %>

<!DOCTYPE html>

<html lang="zh-cn">
<head runat="server">
    <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
    <meta charset="utf-8" />
    <title>新嘉年华-尽享驾驭新体验</title>
    <link href="SceneLib/SceneLib.css" rel="stylesheet" />
    <link href="main.css?1" rel="stylesheet" />
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="SceneLib/SceneLib.js"></script>
    <script type="text/javascript" src="SceneLib/EventDispatcher.js"></script>
    <script type="text/javascript" src="SceneLib/TransitionManager.js" ></script>
   	<script type="text/javascript" src="SceneLib/AnimationManager.js" ></script>
   	<script type="text/javascript" src="SceneLib/Stage.js" ></script>
   	<script type="text/javascript" src="SceneLib/Page.js" ></script>
   	<script type="text/javascript" src="SceneLib/Content.js" ></script>
   	<script type="text/javascript" src="SceneLib/Navigator.js" ></script>
   	<script type="text/javascript" src="SceneLib/CustomNavigator.js" ></script>
   	<script type="text/javascript" src="SceneLib/SlideNavigator.js" ></script>
    <script type="text/javascript">
        var LOADING_IMGS = {};

        $(function () {
            SL.loadImage([
                { name: 'loading_bg', url: 'img/loading_bg.png' },
                { name: 'loading_light', url: 'img/loading_light.png' }
            ], function (imgs) {
                LOADING_IMGS = imgs;
                setLoadingProgress(0);

                SL.resourceReady([
                    { name: 'bg', url: 'img/bg.jpg' },
                    { name: 'run_bg', url: 'img/run_bg.jpg' },
                    { name: 'run_bg2', url: 'img/run_bg2.jpg' },
                    { name: 'trybg1', url: 'img/trybg1.jpg' },
                    { name: 'light1', url: 'img/light1.png' },
                    { name: 'light2', url: 'img/light2.png' },
                    { type: 'script', url: 'js/wx.js' },
                    { type: 'script', url: 'js/city.js' },
                    { type: 'script', url: 'js/WebAudioPlayer.js' },
                    { type: 'script', url: 'js/applink.js' }
                ], function (imgs) {
                    initBG(imgs);

                    main();
                }, function (p) {
                    setLoadingProgress(p);
                });
            });
        });

        var loadingWriting = false;
        function setLoadingProgress(p) {
            if (loadingWriting) return;
            loadingWriting = true;
            var canvas = document.getElementById('loading');
            var cxt = canvas.getContext('2d');

            var startAngle = 0 - Math.PI / 2;
            var endAngle = startAngle + Math.PI * 2 * p / 100;

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
            cxt.fillText(Math.floor(p) + '%', 50, 50);
            loadingWriting = false;
        }
    </script>
    <script src="http://api.map.baidu.com/api?v=2.0&ak=U3ByUy4wwBGHvW76of5oYZpo"></script>
    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?c0c159f57d8879a4ad2b6447a568bf4a";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
</head>
<body>
    <div class="sl-stage">
        <div class="sl-container">
            <div class="sl-page" id="p1" sl-onactive="p1Active();">
                <div class="homebg">
                    <img src="img/bg1.jpg" />
                    <img src="img/bg2.jpg" id="homebg2" style="visibility: hidden;" />
                </div>
                <div class="sl-content" sl-zoom-height="1000" sl-zoom-align="top">
                    <div class="homeimgs">
                        <img src="img/home_2.png" />
                        <img src="img/home_1.png" />
                    </div>
                </div>
            </div>

            <div class="sl-page bg" id="p2" sl-onactive="p2Active();">
                <div class="sl-content">
                    <div class="p2_tip">
                        <img src="img/p2_tip.png" />
                        <img src="img/p2_tip_1.png" style="display: none;" />
                        <img src="img/p2_tip_2.png" style="display: none;" />
                        <img src="img/p2_tip_3.png" style="display: none;" />
                    </div>
                </div>
                <div class="sl-page mask" id="p2_mask0" onclick="$('#p2').removeClass('run0').addClass('run');">
                    <div class="sl-content">
                        <img src="img/p2_icons_full.png" />
                    </div>
                </div>
                <div class="sl-page mask" id="p2_mask">
                    <div class="sl-content">
                        <img src="img/p2_icons.png" />
                        <div class="p2_icons">
                            <canvas width="637" height="641" id="p2_icons"></canvas>
                        </div>

                        <img src="img/app1.png" id="app1" onclick="stage.navigate('p2_1', 'right');" />
                        <img src="img/app2.png" id="app2" onclick="stage.navigate('p2_2', 'right');" />
                        <img src="img/app3.png" id="app3" onclick="stage.navigate('p2_3', 'right');" />
                        <img src="img/app4.png" id="app4" onclick="stage.navigate('p5', 'right');" />
                        <img src="img/app5.png" id="app5" onclick="stage.navigate('p3', 'right');" />
                        

                        <div class="p2_txt">
                            <img src="img/txt_app1.png" />
                            <img src="img/txt_app2.png" />
                            <img src="img/txt_app3.png" />
                            <img src="img/txt_app4.png" />
                            <img src="img/txt_app5.png" />
                        </div>

                        <div class="p2_voice">
                            <img src="img/btn_voice.png" />
                            <img src="img/btn_voice_on.png" />
                            <div class="p2_voice_mask"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sl-page" id="p2_1" sl-onactive="p2_1Active();">
                <div class="sl-page splash">
                    <div class="sl-content">
                        <img src="img/splash_weather.png" />
                    </div>
                </div>
                <div class="sl-page main">
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

            <div class="sl-page" id="p2_2" sl-onactive="p2_2Active();">
                <div class="sl-page splash">
                    <div class="sl-content">
                        <img src="img/splash_map.png" />
                    </div>
                </div>
                <div class="sl-page main">
                    <div id="map"></div>
                    <div class="title">
                        <img src="img/back.png" />
                        百度地图
                        <div class="search">
                            <input type="text" id="mapsearch" placeholder="输入要导航的位置" />
                            <a class="btn_search" onclick="clearMapSearch();">清除</a>
                            <a class="btn_search" onclick="doMapSearch();">导航</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sl-page" id="p2_3" sl-onactive="p2_3Active();">
                <div class="sl-page splash">
                    <div class="sl-content">
                        <img src="img/splash_music.png" />
                    </div>
                </div>
                <div class="sl-page main musicbg">
                    <div class="sl-content music">
                        <img src="img/musicbg.png" class="bgimg" />

                        <img src="img/cover.png" class="cover" />

                        <span class="time1">00:00</span>
                        <span class="time2">00:44</span>

                        <div class="bar">
                            <div class="bar1" style="width: 0%;"><div class="ball"></div></div>
                        </div>

                        <img src="img/btn_play.png" class="play" onclick="$('#music')[0].play();" />
                        <img src="img/btn_pause.png" class="pause" onclick="$('#music')[0].pause();" />
                    </div>
                    <div class="title">
                        <img src="img/back.png" />
                    </div>
                </div>
            </div>

            <div class="sl-page" id="p3" sl-onactive="p3Active();" sl-ondeactive="p3Deactive();">
                <div class="sl-page run_bg"></div>
                <div class="sl-page run_bg2"></div>
                <div class="sl-content">
                    <img src="img/car.png" class="car" />
                    <img src="img/meter.png" class="meter" />
                    <img src="img/meter_point.png" class="meter_point" />
                    <img src="img/btn_run.png" class="btn_run" />
                </div>
            </div>

            <div class="sl-page" id="p5" sl-ondeactive="p5Deactive();">
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
                <div class="title">
                    <img src="img/back.png" />
                </div>
            </div>
        </div>
    </div>
    <div class="loading">
        <table>
            <tr>
                <td>
                    <canvas width="100" height="100" id="loading"></canvas>
                </td>
            </tr>
        </table>
    </div>

    <div style="display: none;">
        <audio src="img/music.mp3" preload="auto" id="music">
            <source src="img/music.mp3" type="audio/mpeg" />
        </audio>

        
    </div>
</body>
</html>

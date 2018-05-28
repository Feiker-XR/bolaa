<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.Default" %>

<!DOCTYPE html>

<html lang="zh-cn">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1"/>
    <title>长安福特幸运号</title>
    <link href="main.css" rel="stylesheet" />
    <link href="http://wx.app.bolaa.net/scenelib/scenelib.css" rel="stylesheet" />
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/jsfix.js"></script>
    <script src="js/wx.js"></script>
    <script src="http://wx.app.bolaa.net/scenelib/scenelib.js"></script>
    <script src="js/game.js"></script>
    <script type="text/javascript">
        more = <%=more ? "true" : "false" %>;
        needinfo = <%=needinfo ? "true" : "false" %>;
    </script>
</head>
<body>
    <div style="display: none;">
        <img src="img/cars.png" id="img_cars" />
        <img src="img/cars_alt.png" id="img_cars_alt" />
        <img src="img/gamebg1.png" id="img_gamebg1" />
        <img src="img/gamebg2.png" id="img_gamebg2" />
        <img src="img/gamebg3.png" id="img_gamebg3" />
        <img src="img/item_bg.png" id="img_item_bg" />
        <img src="img/item_mask.png" id="img_item_mask" />
    </div>
    <div class="wrap" style="display: none;">
        <div class="area">
            <img src="img/header.jpg" class="auto" />
            <canvas width="593" height="139" class="space"></canvas>
        </div>
        <div class="area stars">
            <img src="img/starbg.png" class="auto" />
            <img src="img/star_1.png" class="auto star" style="display: none;" />
            <img src="img/star_2.png" class="auto star" style="display: none;" />
            <img src="img/star_3.png" class="auto star" style="display: none;" />
            <img src="img/star_4.png" class="auto star" style="display: none;" />
            <img src="img/star_5.png" class="auto star" style="display: none;" />
            <canvas width="593" height="83" class="space"></canvas>
        </div>
        <div id="p1" class="page show">
            <div class="area main bg1">
                <div class="auto rule">
                    <div class="auto ruleimg"></div>
                </div>
            </div>
            <div class="area">
                <img src="img/bottombg1.png" class="auto" />
                <div class="auto">
                    <img src="img/btn_start.png" class="btn_start" onclick="gameStart();" />
                </div>
                <canvas width="593" height="215" class="space"></canvas>
            </div>
        </div>

        <div id="p2" class="page">
            <div class="area main">
                <div class="area game">
                    <canvas id="gamebg" width="593"></canvas>
                    <div id="gamearea">
                        <div id="game">
                            <canvas id="item1" width="152" height="275"></canvas>
                            <canvas id="item2" width="152" height="275"></canvas>
                            <canvas id="item3" width="152" height="275"></canvas>
                        </div>
                    </div>
                    
                </div>
                <div class="area question">
                    <div id="question">
                        <div id="ques">
                            <img src="img/que0.png" /><img src="img/que1.png" /><img src="img/que2.png" /><img src="img/que3.png" /><img src="img/que4.png" /><img src="img/que5.png" /><img src="img/que6.png" /><img src="img/que7.png" /><img src="img/que8.png" /><img src="img/que9.png" />
                            <img src="img/right.png" class="result" /><img src="img/wrong.png" class="result" />
                        </div>

                        <div id="car0" class="car">
                            <img src="img/car0.png" /><img src="img/car1.png" /><img src="img/car2.png" /><img src="img/car3.png" /><img src="img/car4.png" /><img src="img/car5.png" /><img src="img/car6.png" /><img src="img/car7.png" /><img src="img/car8.png" /><img src="img/car9.png" />
                            <img src="img/right.png" class="result" /><img src="img/wrong.png" class="result" />
                        </div>

                        <div id="car1" class="car">
                            <img src="img/car0.png" /><img src="img/car1.png" /><img src="img/car2.png" /><img src="img/car3.png" /><img src="img/car4.png" /><img src="img/car5.png" /><img src="img/car6.png" /><img src="img/car7.png" /><img src="img/car8.png" /><img src="img/car9.png" />
                            <img src="img/right.png" class="result" /><img src="img/wrong.png" class="result" />
                        </div>

                        <div id="car2" class="car">
                            <img src="img/car0.png" /><img src="img/car1.png" /><img src="img/car2.png" /><img src="img/car3.png" /><img src="img/car4.png" /><img src="img/car5.png" /><img src="img/car6.png" /><img src="img/car7.png" /><img src="img/car8.png" /><img src="img/car9.png" />
                            <img src="img/right.png" class="result" /><img src="img/wrong.png" class="result" />
                        </div>
                    </div>
                    <canvas width="593" height="140" class="space"></canvas>
                </div>
            </div>
            <div class="area">
                <img src="img/bottombg2.png" class="auto" />
                <div class="auto" id="playbtns">
                    <img src="img/btn_play_gray.png" class="btn_start" id="btn_play_gray" />
                    <img src="img/btn_play.png" class="btn_start" id="btn_play" style="display: none;" onclick="runStart();" />
                    <img src="img/btn_stop.png" class="btn_start" id="btn_stop" style="display: none;" onclick="runStop();" />
                </div>
                <canvas width="593" height="215" class="space"></canvas>
            </div>
        </div>

        <div id="p3" class="page">
            <div class="area main bg1">
                <div class="auto rule">
                    <div class="auto ruleimg" style="background-image: url(img/nogift.png);"></div>
                </div>
            </div>
            <div class="area">
                <img src="img/bottombg1.png" class="auto" />
                <div class="auto twobtns">
                    <img src="img/btn_again.png" class="btn_again" onclick="checkReset();" />
                    <img src="img/btn_share.png" class="btn_again" onclick="$('.sharetip').show();" />
                </div>
                <canvas width="593" height="215" class="space"></canvas>
            </div>
        </div>

        <div id="p4" class="page">
            <div class="area main bg1">
                <div class="auto rule" style="overflow: hidden;">
                    <div class="form">
                        <input type="text" class="box" id="p_name" maxlength="20" />
                        <input type="tel" class="box" id="p_phone" maxlength="11" />
                        <span id="s_cartype" class="box"></span>
                        <select id="p_cartype" class="box">
                            <option value="">请选择</option>
                            <option>翼虎</option>
                            <option>翼搏</option>
                            <option>新蒙迪欧</option>
                            <option>锐界</option>
                            <option>福睿斯</option>
                            <option>新福克斯</option>
                            <option>经典福克斯</option>
                            <option>新嘉年华</option>
                            <option>致胜</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="area">
                <img src="img/bottombg1.png" class="auto" />
                <div class="auto">
                    <img src="img/btn_submit.png" class="btn_start" onclick="submitInfo();" />
                </div>
                <canvas width="593" height="215" class="space"></canvas>
            </div>
        </div>

        <div id="p5" class="page">
            <div class="area main bg1">
                <div class="giftimg">
                    <span>
                        
                    </span>
                </div>
                <div class="area hasgift">
                    <img src="img/hasgift.png" class="auto" />
                    <canvas width="593" height="100" class="space"></canvas>
                </div>
            </div>
            <div class="area">
                <img src="img/bottombg1.png" class="auto" />
                <div class="auto twobtns">
                    <img src="img/btn_again.png" class="btn_again" onclick="checkReset();" />
                    <img src="img/btn_share.png" class="btn_again" onclick="$('.sharetip').show();" />
                </div>
                <canvas width="593" height="215" class="space"></canvas>
            </div>
        </div>

        <div class="area"><canvas width="593" height="215" class="space"></canvas></div>
    </div>

    <div class="sharetip" style="display: none;" onclick="$('.sharetip').hide();">
        <img src="img/sharetip.png" />
    </div>
</body>
</html>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.EscortGame.Default" %>

<html lang="zh-cn">
<head>
    <title>警车大收藏家</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1"/>
    <script src="js/wx.js"></script>
    <script type="text/javascript">

    </script>
    <script src="js/jquery-2.1.1.min.js"></script>
    <script type="text/javascript" src="js/createjs.js"></script>
    <script type="text/javascript">
        var i = new Date().getTime() % 5;

        var isDesktop = navigator['userAgent'].match(/(ipad|iphone|ipod|android|windows phone)/i) ? false : true;
        var fontunit = isDesktop ? 20 : ((window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth) / 320) * 10;
        document.write('<style type="text/css">' +
    		'' +
    		(isDesktop ? '#welcome,#GameTimeLayer,#GameLayerBG,#GameScoreLayer.SHADE{position: absolute;}' :
    		'#welcome,#GameTimeLayer,#GameLayerBG,#GameScoreLayer.SHADE{position:fixed;}@media screen and (orientation:landscape) {#landscape {display: box; display: -webkit-box; display: -moz-box; display: -ms-flexbox;}}') +
    		'</style>');
    </script>
    <link href="main2.css" rel="stylesheet" />
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
            background-image: url(img/bg.jpg);
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center center;
        }

        .loading {
            background-image: url("data:image/gif;base64,R0lGODlhJQAlAJECAL3L2AYrTv///wAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgACACwAAAAAJQAlAAACi5SPqcvtDyGYIFpF690i8xUw3qJBwUlSadmcLqYmGQu6KDIeM13beGzYWWy3DlB4IYaMk+Dso2RWkFCfLPcRvFbZxFLUDTt21BW56TyjRep1e20+i+eYMR145W2eefj+6VFmgTQi+ECVY8iGxcg35phGo/iDFwlTyXWphwlm1imGRdcnuqhHeop6UAAAIfkEBQoAAgAsEAACAAQACwAAAgWMj6nLXAAh+QQFCgACACwVAAUACgALAAACFZQvgRi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwXABEADAADAAACBYyPqcsFACH5BAUKAAIALBUAFQAKAAsAAAITlGKZwWoMHYxqtmplxlNT7ixGAQAh+QQFCgACACwQABgABAALAAACBYyPqctcACH5BAUKAAIALAUAFQAKAAsAAAIVlC+BGL3Z3IlxUmUuhtR2LzHhsiEFACH5BAUKAAIALAEAEQAMAAMAAAIFjI+pywUAIfkEBQoAAgAsBQAFAAoACwAAAhOUYJnAagwdjGq2amXGU1PuLEYBACH5BAUKAAIALBAAAgAEAAsAAAIFhI+py1wAIfkEBQoAAgAsFQAFAAoACwAAAhWUL4AIvdnciXFSZS6G1HYvMeGyIQUAIfkEBQoAAgAsFwARAAwAAwAAAgWEj6nLBQAh+QQFCgACACwVABUACgALAAACE5RgmcBqDB2MarZqZcZTU+4sRgEAIfkEBQoAAgAsEAAYAAQACwAAAgWEj6nLXAAh+QQFCgACACwFABUACgALAAACFZQvgAi92dyJcVJlLobUdi8x4bIhBQAh+QQFCgACACwBABEADAADAAACBYSPqcsFADs=");
            background-repeat: no-repeat;
            background-position: center center;
            background-size: auto 60%;
        }

        .SHADE {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            bottom: 0;
            z-index: 11;
        }

        .BOX-V {
            box-orient: vertical;
            -webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            -ms-flex-direction: column;
        }

        .BOX-D {
            box-align: end;
            box-pack: center -webkit-box-align: end;
            -webkit-box-pack: center;
            -ms-flex-align: end;
            -ms-flex-pack: center;
        }

        .BOX-M {
            box-align: center;
            box-pack: center;
            -webkit-box-align: center;
            -webkit-box-pack: center;
            -ms-flex-align: center;
            -ms-flex-pack: center;
        }

        .BOX-S {
            display: block;
            box-flex: 1;
            -webkit-box-flex: 1;
            -moz-box-flex: 1;
            -ms-flex: 1;
        }

        .BOX, .BOX-V, .BOX-D, .BOX-M, .FOOTER {
            display: box;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-flexbox;
        }

        .BBOX, .BOX, .APP-STAGE, .INSET-STAGE, .STAGE, .PAGE-STAGE, .PAGE, .PAGE-BOX, .INSET-PAGE, .FOOTER {
            box-sizing: border-box;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
        }

        .welcome-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-size: 100% 100%;
            opacity: .4;
            overflow: hidden;
        }

        #GameTimeLayer {
            top: 1em;
            left: 0;
            width: 30%;
            left: 60%;
            box-sizing: border-box;
            border: 1px solid #555;
            border-radius: 8px;
            background-color: rgba(139,87,93,0.4);
            text-align: center;
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            overflow: hidden;
        }

        #GameLayerBG {
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
        }

        .GameLayer {
            position: absolute;
            bottom: 0;
            left: 0;
        }

        .block {
            position: absolute;
            border-top: 1px solid rgba(255,255,255,0.5);
            background-repeat: no-repeat;
            background-position: center;
        }

        .t1, .t2, .t3, .t4, .t5, .t6 {
            background-size: auto 100%;
        }

        .t1 { background-image: url(img/car0.png); }

        .t2 { background-image: url(img/car1.png); }

        .t3 { background-image: url(img/car2.png); }

        .t4 { background-image: url(img/car3.png); }

        .t5 { background-image: url(img/car4.png); }

        .t6 { background-image: url(img/car5.png); }

        .tt1, .tt2, .tt3, .tt4, .tt5, .tt6 {
            background-size: auto 86%;
        }

        .bl {
            border-left: 1px solid rgba(255,255,255,0.5);
        }

        @-ms-keyframes flash {
            0% {
                opacity: 1;
            }

            50% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        @-webkit-keyframes flash {
            0% {
                opacity: 1;
            }

            50% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }

        .flash {
            -webkit-animation: flash .2s 3;
            animation: flash .2s 3;
        }

        .bad {
            background-color: #f00 !important;
            -webkit-animation: flash .2s 3;
            animation: flash .2s 3;
        }

        * {
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            -ms-tap-highlight-color: rgba(0,0,0,0);
            tap-highlight-color: rgba(0,0,0,0);
            -ms-user-select: none;
        }

        .bgc1 {
            background-color: #23378B;
        }

        .bgc2 {
            background-color: #009FE3;
        }

        .bgc3 {
            background-color: #E42313;
        }

        .bgc4 {
            background-color: #FCBD1B;
        }

        .bgc5 {
            background-color: #34002A;
        }

        .share-icon {
            width: 1.7em;
            background-repeat: no-repeat;
            background-size: auto 100%;
        }

        .btn:active {
            opacity: 0.2;
        }

        #landscape {
            display: none;
        }


        #gameBody {
            position: relative;
            width: 640px;
            margin: 0 auto;
            height: 100%;
        }

        #share-wx {
            background: rgba(0,0,0,0.8);
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: none;
        }

        .bg0
        {
            background-color: rgba(255,255,255,0.4);
        }

        .bg1
        {
            background-color: rgba(139,87,93,0.4);
        }
    </style>
    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?737de4c9b6c039d260980492d59e2c1e";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
</script>

</head>
<body onload="init()">

    

    <div class="sharetip" style="display: none;" onclick="$('.sharetip').hide();">
        <img src="img/sharetip.png" />
    </div>
    <div class="result" id="result" style="display: none;">
        <div class="wrap">
            <div class="form">
                <h1>恭喜您！</h1>
                <h3>共收集了<span id="count"></span>辆长安福特全系警车<br />再接再厉</h3>
                <div class="btns">
                    <a class="again" onclick="$('#result').hide(); gameRestart(); doStart();">再来一次</a>
                    <a class="share" onclick="$('.sharetip').show();">分享到朋友圈</a>
                </div>
                <div class="text">
                    快来关注长安福特FLEET（批售）官方微信<br />
更多精彩内容等着您！
                </div>
                <a class="join" href="http://mp.weixin.qq.com/s?__biz=MzAxMjI5ODc0Mg==&mid=203887555&idx=1&sn=6890e3eeeb490254633e70a9e5126af6#rd" target="_blank">立即关注</a>
            </div>
            
        </div>
    </div>

    <div class="result" style="display: none;"  id="rule" onclick="$('#rule').hide();">
        <div class="rule">
            <div class="rule_area">
                <img src="img/rule_btn.png" class="rule_btn" />
                <img src="img/rule.png" />
                
            </div>
        </div>
    </div>

    <div class="result" id="home" style="display: none;">
        <div class="home">
            <img src="img/logo.png" />
            <img src="img/go.png" style="margin-top: 10px;" onclick="$('#home').hide(); doStart();document.getElementById('bgm').play();" />
        </div>
    </div>

    <audio id="bgm" src="img/song.mp3" loop="loop" style="display: none;">
        <source src="img/song.mp3" type="audio/mp3" />
    </audio>

    

    <script type="text/javascript">

        var body, blockSize, GameLayer = [], GameLayerBG, touchArea = [], GameTimeLayer;
        var transform, transitionDuration;

        function init(argument) {
            document.getElementById('rule').style.display = 'table';
            showWelcomeLayer();
            body = document.getElementById('gameBody') || document.body;
            body.style.height = window.innerHeight + 'px';
            transform = typeof (body.style.webkitTransform) != 'undefined' ? 'webkitTransform' : (typeof (body.style.msTransform) != 'undefined' ? 'msTransform' : 'transform');
            transitionDuration = transform.replace(/ransform/g, 'ransitionDuration');

            GameTimeLayer = document.getElementById('GameTimeLayer');
            GameLayer.push(document.getElementById('GameLayer1'));
            GameLayer[0].children = GameLayer[0].querySelectorAll('div');
            GameLayer.push(document.getElementById('GameLayer2'));
            GameLayer[1].children = GameLayer[1].querySelectorAll('div');
            GameLayerBG = document.getElementById('GameLayerBG');
            if (GameLayerBG.ontouchstart === null) {
                GameLayerBG.ontouchstart = gameTapEvent;
            } else {
                GameLayerBG.onmousedown = gameTapEvent;
            }
            gameInit();
            window.addEventListener('resize', refreshSize, false);
        }

        var refreshSizeTime;
        function refreshSize() {
            clearTimeout(refreshSizeTime);
            refreshSizeTime = setTimeout(_refreshSize, 200);
        }
        function _refreshSize() {
            countBlockSize();
            for (var i = 0; i < GameLayer.length; i++) {
                var box = GameLayer[i];
                for (var j = 0; j < box.children.length; j++) {
                    var r = box.children[j],
                        rstyle = r.style;
                    rstyle.left = (j % 4) * blockSize + 'px';
                    rstyle.bottom = Math.floor(j / 4) * blockSize + 'px';
                    rstyle.width = blockSize + 'px';
                    rstyle.height = blockSize + 'px';
                }
            }
            var f, a;
            if (GameLayer[0].y > GameLayer[1].y) {
                f = GameLayer[0];
                a = GameLayer[1];
            } else {
                f = GameLayer[1];
                a = GameLayer[0];
            }
            var y = ((_gameBBListIndex) % 10) * blockSize;
            f.y = y;
            f.style[transform] = 'translate3D(0,' + f.y + 'px,0)';

            a.y = -blockSize * Math.floor(f.children.length / 4) + y;
            a.style[transform] = 'translate3D(0,' + a.y + 'px,0)';

        }
        function countBlockSize() {
            blockSize = body.offsetWidth / 4;
            body.style.height = window.innerHeight + 'px';
            GameLayerBG.style.height = window.innerHeight + 'px';
            touchArea[0] = window.innerHeight - blockSize * 0;
            touchArea[1] = window.innerHeight - blockSize * 3;
        }
        var _gameBBList = [], _gameBBListIndex = 0, _gameOver = false, _gameStart = false, _gameTime, _gameTimeNum, _gameScore;
        function gameInit() {
            gameRestart();
        }
        function gameRestart() {
            _gameBBList = [];
            _gameBBListIndex = 0;
            _gameScore = 0;
            _gameOver = false;
            _gameStart = false;
            _gameTimeNum = 3000;
            GameTimeLayer.innerHTML = creatTimeText(_gameTimeNum);
            countBlockSize();
            refreshGameLayer(GameLayer[0]);
            refreshGameLayer(GameLayer[1], 1);
        }
        function gameStart() {
            _gameStart = true;
            _gameTime = setInterval(gameTime, 10);
            
        }
        function gameOver() {
            _gameOver = true;
            clearInterval(_gameTime);
            setTimeout(function () {
                GameLayerBG.className = '';
                showGameScoreLayer();
            }, 1500);
        }
        function gameTime() {
            _gameTimeNum--;
            if (_gameTimeNum <= 0) {
                GameTimeLayer.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;时间到！';
                gameOver();
                GameLayerBG.className += ' flash';
            } else {
                GameTimeLayer.innerHTML = creatTimeText(_gameTimeNum);
            }
        }
        function creatTimeText(n) {
            var text = (100000 + n + '').substr(-4, 4);
            text = '&nbsp;&nbsp;' + text.substr(0, 2) + "'" + text.substr(2) + "''"
            return text;
        }
        var _ttreg = / t{1,2}(\d+)/, _clearttClsReg = / t{1,2}\d+| bad/;
        function refreshGameLayer(box, loop, offset) {
            var i = Math.floor(Math.random() * 1000) % 4 + (loop ? 0 : 4);
            for (var j = 0; j < box.children.length; j++) {
                var r = box.children[j],
                    rstyle = r.style;
                rstyle.left = (j % 4) * blockSize + 'px';
                rstyle.bottom = Math.floor(j / 4) * blockSize + 'px';
                rstyle.width = blockSize + 'px';
                rstyle.height = blockSize + 'px';
                r.className = r.className.replace(_clearttClsReg, '');
                r.className = r.className.replace('bg0', '').replace('bg1', '');
                var bgid = ((Math.floor(j / 4) % 2) + 1) - (j % 2);
                r.className += (" bg" + bgid);
                if (i == j) {
                    _gameBBList.push({ cell: i % 4, id: r.id });
                    r.className += ' t' + (Math.floor(Math.random() * 1000) % 6 + 1);
                    r.notEmpty = true;
                    i = (Math.floor(j / 4) + 1) * 4 + Math.floor(Math.random() * 1000) % 4;
                } else {
                    r.notEmpty = false;
                    
                }
            }
            if (loop) {
                box.style.webkitTransitionDuration = '0ms';
                box.style.display = 'none';
                box.y = -blockSize * (Math.floor(box.children.length / 4) + (offset || 0)) * loop;
                setTimeout(function () {
                    box.style[transform] = 'translate3D(0,' + box.y + 'px,0)';
                    setTimeout(function () {
                        box.style.display = 'block';
                    }, 100);
                }, 200);
            } else {
                box.y = 0;
                box.style[transform] = 'translate3D(0,' + box.y + 'px,0)';
            }
            box.style[transitionDuration] = '150ms';
        }

        function gameLayerMoveNextRow() {
            for (var i = 0; i < GameLayer.length; i++) {
                var g = GameLayer[i];
                g.y += blockSize;
                if (g.y > blockSize * (Math.floor(g.children.length / 4))) {
                    refreshGameLayer(g, 1, -1);
                } else {
                    g.style[transform] = 'translate3D(0,' + g.y + 'px,0)';
                }
            }
        }

        function gameTapEvent(e) {
            if (_gameOver) {
                return false;
            }
            var tar = e.target;
            var y = e.clientY || e.targetTouches[0].clientY,
                x = (e.clientX || e.targetTouches[0].clientX) - body.offsetLeft,
                p = _gameBBList[_gameBBListIndex];
            if (y > touchArea[0] || y < touchArea[1]) {
                return false;
            }
            if ((p.id == tar.id && tar.notEmpty) || (p.cell == 0 && x < blockSize) || (p.cell == 1 && x > blockSize && x < 2 * blockSize) || (p.cell == 2 && x > 2 * blockSize && x < 3 * blockSize) || (p.cell == 3 && x > 3 * blockSize)) {
                if (!_gameStart) {
                    gameStart();
                }
                tar = document.getElementById(p.id);
                tar.className = tar.className.replace(_ttreg, ' tt$1');
                _gameBBListIndex++;
                _gameScore++;
                gameLayerMoveNextRow();
            } else if (_gameStart && !tar.notEmpty) {
                gameOver();
                tar.className += ' bad';
            }
            return false;
        }
        function createGameLayer() {
            var html = '<div id="GameLayerBG" style="display: none;">';
            for (var i = 1; i <= 2; i++) {
                var id = 'GameLayer' + i;
                html += '<div id="' + id + '" class="GameLayer">';
                for (var j = 0; j < 10; j++) {
                    for (var k = 0; k < 4; k++) {
                        html += '<div id="' + id + '-' + (k + j * 4) + '" num="' + (k + j * 4) + '" class="block' + (k ? ' bl' : '') + '"></div>';
                    }
                }
                html += '</div>';
            }
            html += '</div>';

            html += '<div id="GameTimeLayer" style="display: none;"></div>';

            return html;
        }

        function closeWelcomeLayer() {
            var l = document.getElementById('home');
            l.style.display = 'none';
        }
        function showWelcomeLayer() {
            var l = document.getElementById('home');
            l.style.display = '';
        }
        function showGameScoreLayer() {
            $('#GameLayerBG, #GameTimeLayer').hide();
            $('#count').text(_gameScore);
            $('#result').show();
            WXENV.shareData.desc = '我是警车大收藏家，我在30秒的时间内收藏了' + _gameScore + '辆福特系警车，你是吗？';
            WXENV.updateShareData();
            wx.showAllNonBaseMenuItem();
        }
        function hideGameScoreLayer() {
            var l = document.getElementById('GameScoreLayer');
            l.style.display = 'none';
        }
        function replayBtn() {
            gameRestart();
            hideGameScoreLayer();
        }
        function backBtn() {
            gameRestart();
            hideGameScoreLayer();
            showWelcomeLayer();
        }
        function shareText(score) {
            var coins = Math.ceil(score / 5);
            if (score <= 49)
                return '呵呵！我吃掉了' + score + '个小苹果！<br/>亲，还得加油哦!';
            if (score <= 99)
                return '酷！我吃掉了' + score + '个小苹果！<br/>亲，不错哦！';
            if (score <= 149)
                return '帅呆了！我吃掉了' + score + '个小苹果！<br/>亲，爱死你了！';
            if (score <= 199)
                return '太牛了！我吃掉了' + score + '个小苹果！<br/>亲，奥巴马和金正恩都惊呆了！';

            return '膜拜ing！我吃掉了' + score + '个小苹果！<br/>亲，你确定你是地球人？你是宇宙第一强人，再也没人能超越你了！';
        }

        function toStr(obj) {
            if (typeof obj == 'object') {
                return JSON.stringify(obj);
            } else {
                return obj;
            }
            return '';
        }
        function cookie(name, value, time) {
            if (name) {
                if (value) {
                    if (time) {
                        var date = new Date();
                        date.setTime(date.getTime() + 864e5 * time), time = date.toGMTString();
                    }
                    return document.cookie = name + "=" + escape(toStr(value)) + (time ? "; expires=" + time + (arguments[3] ? "; domain=" + arguments[3] + (arguments[4] ? "; path=" + arguments[4] + (arguments[5] ? "; secure" : "") : "") : "") : ""), !0;
                }
                return value = document.cookie.match("(?:^|;)\\s*" + name.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1") + "=([^;]*)"), value = value && "string" == typeof value[1] ? unescape(value[1]) : !1, (/^(\{|\[).+\}|\]$/.test(value) || /^[0-9]+$/g.test(value)) && eval("value=" + value), value;
            }
            var data = {};
            value = document.cookie.replace(/\s/g, "").split(";");
            for (var i = 0; value.length > i; i++) name = value[i].split("="), name[1] && (data[name[0]] = unescape(name[1]));
            return data;
        }

        function doStart() {
            $('#GameLayerBG, #GameTimeLayer').show();
        };

        document.write(createGameLayer());
    </script>
</body>
</html>

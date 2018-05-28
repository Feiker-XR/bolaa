<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Show.aspx.cs" Inherits="Web.Show" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1" />
    <meta charset="utf-8" />
    <title>新蒙迪欧•福运中国年</title>
    <link href="SceneLib/scenelib.css" rel="stylesheet" />
    <link href="main.css" rel="stylesheet" />
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="SceneLib/SceneLib.js"></script>
    <script src="js/wxshare.js"></script>
    <script type="text/javascript">
        var shareWords = [
    '情侣二得很招摇，搂搂抱抱傻傻的笑',
    '之后你就会升职加薪，当上总经理，出任CEO，迎娶白富美，走上人生巅峰',
    '好好赚钱才能天天任性',
    '范冰冰的脸，莫文蔚的腿，李嘉欣的气质，舒淇的嘴',
    '学霸苦读百日虐试卷，学渣奋战整晚求及格',
    '新的一年，祝你瘦成闪电，闪瞎所有人的狗眼',
    '身体才是任性的本钱，没身体一切免谈'
        ];

        var shareTitles = [
            '早日脱光',
            '薪水狂涨',
            '买车接房',
            '颜值爆表',
            '逢考必过',
            '瘦成闪电',
            '身体倍棒'
        ];

        wxShare.link = 'http://mondeocard.ser2.ford001.com/show.aspx?id=<%=card.id %>';
        wxShare.title = '新的一年祝你' + shareTitles[<%=card.word %>];
        wxShare.desc = shareWords[<%=card.word %>];
    </script>
    <script type="text/javascript">
        $(function () {
            SL.loadImage([
                { name: 'bg', url: 'img/bg.jpg' },
                { name: 'logo', url: 'img/logo.png' },
                { name: 'footer', url: 'img/footer.png' },
                { name: 'border1', url: 'img/border1.png' },
                { name: 'border2', url: 'img/border2.png' }
            ], function (images) {
                initBG(images);
            });
            var zoom = Math.min(window.innerWidth / 640, window.innerHeight / 1136);
            $('.p').css({
                transform: 'scale(' + zoom + ',' + zoom + ')',
                webkitTransform: 'scale(' + zoom + ',' + zoom + ')',
                transformOrigin: '0% 0%',
                webkitTransformOrigin: '0%, 0%',
                left: (window.innerWidth - zoom * 640) / 2 + 'px',
                top: (window.innerHeight - zoom * 1136) / 2 + 'px',
                display: 'block'
            });

            SL.loadImage([
                { name: 'photo_mask', url: 'img/photo_mask.png' },
                { name: 'photo', url: '<%=card.photo %>' }
            ], function (images) {
                var canvas = document.getElementById('photo_show');
                var cxt = canvas.getContext('2d');
                cxt.clearRect(0, 0, canvas.width, canvas.height);
                cxt.drawImage(images.photo, 0, 0);
                cxt.globalCompositeOperation = 'destination-in';
                cxt.drawImage(images.photo_mask, 0, 0);
                cxt.globalCompositeOperation = 'source-over';
            });
        });

        function initBG(images) {
            var cxt = document.getCSSCanvasContext('2d', 'pagebg', 640, 1136);

            var cxt1 = document.getCSSCanvasContext('2d', 'pagebg1', 640, 1136);

            var bgzoom = $(window).width() / 640;

            var bottom = Math.ceil($(window).height() / bgzoom);

            cxt.drawImage(images.bg, 0, 0);

            cxt.drawImage(images.border2, 0, images.border1.height);
            cxt.drawImage(images.border2, 0, images.border1.height + images.border2.height);
            cxt.save();
            cxt.translate(640, 0);
            cxt.scale(-1, 1);
            cxt.drawImage(images.border2, 0, images.border1.height);
            cxt.drawImage(images.border2, 0, images.border1.height + images.border2.height);
            cxt.restore();

            cxt.drawImage(images.border1, 0, 0);
            cxt.save();
            cxt.translate(0, bottom);
            cxt.scale(1, -1);
            cxt.drawImage(images.border1, 0, 0);
            cxt.restore();
            cxt.drawImage(images.logo, 0, 0);
            cxt.drawImage(images.footer, 0, bottom - images.footer.height);



            cxt1.drawImage(images.bg, 0, 0);

            cxt1.drawImage(images.border2, 0, images.border1.height);
            cxt1.drawImage(images.border2, 0, images.border1.height + images.border2.height);
            cxt1.save();
            cxt1.translate(640, 0);
            cxt1.scale(-1, 1);
            cxt1.drawImage(images.border2, 0, images.border1.height);
            cxt1.drawImage(images.border2, 0, images.border1.height + images.border2.height);
            cxt1.restore();

            cxt1.drawImage(images.border1, 0, 0);
            cxt1.save();
            cxt1.translate(0, bottom);
            cxt1.scale(1, -1);
            cxt1.drawImage(images.border1, 0, 0);
            cxt1.restore();
            
        }

        function playVoice() {
            var music = document.getElementById('bgm');
            music.addEventListener('playing', function (evt) {
                evt.target.removeEventListener('playing', arguments.callee);
                $('.voice_item .mark').addClass('play');
            });
            music.addEventListener('pause', function (evt) {
                evt.target.removeEventListener('pause', arguments.callee);
                $('.voice_item .mark').removeClass('play');
            });
            if (music.paused) {
                music.play();
            }
            else {
                music.pause();
            }
        }


    </script>
    <script>
        var _hmt = _hmt || [];
        (function() {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?3d80c311a912a7edf0dd2ca75eb08f3d";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
        })();
</script>

</head>
<body>
    <div class="page page2 bg1">
        <div id="p5" class="p" style="display: none;">
            <img src="img/p5_bg.png" class="bg" />

            <div class="photo_show">
                <canvas id="photo_show" width="393" height="243"></canvas>
                <img src="img/photo_bg.png" />
            </div>

            <div class="word_finish"><img src="img/preview_<%=card.font %>_<%=card.word %>.png" /></div>

            <div class="voice_item">
                <img class="playbtn" src="img/voice_play2.png" onclick="playVoice();" />
                <img class="bar" src="img/voice_bar2.png" />
                <div class="mark"></div>
            </div>

            <img src="img/btn_start2.png" class="btn_preview" onclick="window.location.href = 'default.aspx';" />
        </div>
    </div>
    <audio id="bgm" preload="auto" src="<%=card.voice %>" controls="controls" style="display: none;">
        <source src="<%=card.voice %>" type="audio/mpeg" />
    </audio>
</body>
</html>

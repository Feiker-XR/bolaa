<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1" />
    <meta charset="utf-8" />
    <title>长安福特销售部批售团队·春节祝福</title>
    <link href="main.css" rel="stylesheet" />
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/wxshare.js"></script>
    <script src="js/SL.min.js"></script>
    <script type="text/javascript">
        var width, height, zoom;
        $(function () {
            width = $(window).width();
            height = $(window).height();

            $('.music').css('top', 70 * width / 640 + 'px')[0].addEventListener('click', function (evt) {
                if (evt.currentTarget == $('.music')[0]) {
                    if ($('#bgm')[0].paused) {
                        $('#bgm')[0].play();
                    }
                    else {
                        $('#bgm')[0].pause();
                    }
                }
            });

            $('.arr').css('bottom', 28 * width / 640 + 'px')

            $('#bgm')[0].addEventListener('playing', function () {
                $('.music .off').hide();
                $('.music .on').show();
            });

            $('#bgm')[0].addEventListener('pause', function () {
                $('.music .on').hide();
                $('.music .off').show();
            });

            SL.loadImage([
                { name: 'b1', url: 'img/b1.png' },
                { name: 'b2', url: 'img/b2.png' },
                { name: 'b3', url: 'img/b3.png' }
            ], function (images) {

                var bgzoom = width / 640;
                
                var bottom = Math.ceil(height / bgzoom);

                var cxt = document.getCSSCanvasContext('2d', 'bg1', 640, bottom);

                cxt.drawImage(images.b3, 42, 54);
                cxt.drawImage(images.b1, 0, 0);
                cxt.drawImage(images.b2, 0, images.b1.height, 640, bottom - images.b1.height * 2);
                
                cxt.save();
                cxt.translate(640, bottom);
                cxt.scale(-1, -1);
                cxt.drawImage(images.b1, 0, 0);
                cxt.restore();

                SL.checkImage($('#area1 img').toArray(), showPage1);
            });

            zoom = Math.min(width / 640, height / 1136);
            $('.main').css({
                transform: 'scale(' + zoom + ',' + zoom + ')',
                webkitTransform: 'scale(' + zoom + ',' + zoom + ')',
                left: (width - 640 * zoom) / 2 + 'px',
                top: (height - 1136 * zoom) / 2 + 'px',
                display: 'block'
            });

            var endZoom = width / 640;
            $('#area6').css({
                transform: 'scale(' + endZoom / zoom + ',' + endZoom / zoom + ')',
                webkitTransform: 'scale(' + endZoom / zoom + ',' + endZoom / zoom + ')'
            });

            var p1_running = false;
            SL.checkImage($('#img_main, #img_flash').toArray(), function () {
                if (p1_running) return;
                p1_running = true;

                var canvas = document.getElementById('splash');
                var cxt = canvas.getContext('2d');

                
                var redraw = function () {
                    var elapsed = new Date() - p1_start;

                    elapsed = elapsed % 3000;

                    if (elapsed < 2000)
                    {
                        var x = -327 + elapsed / 2000 * (495 + 327);
                        cxt.clearRect(0, 0, 495, 268);
                        cxt.drawImage(document.getElementById('img_main'), 0, 0);
                        cxt.save();
                        cxt.globalCompositeOperation = 'source-in';
                        cxt.drawImage(document.getElementById('img_flash'), x, 0);
                        cxt.globalCompositeOperation = 'destination-over';
                        cxt.drawImage(document.getElementById('img_main'), 0, 0);
                        cxt.restore();
                    }
                    
                    setTimeout(redraw, 1000 / 50);
                };
                var p1_start = new Date();
                setTimeout(redraw, 1000 / 50);
            });
        });

        var inited = false;
        function showPage1() {
            if (inited) {
                return;
            }
            inited = true;

            $('.splash').addClass('run');
            canSwitch = true;
        }

        var currentPage = 1;

        var canSwitch = false;

        var touchData = null;
        document.addEventListener('touchstart', function (evt) {
            if (!canSwitch) return;
            touchData = evt.touches[0].pageY;
        });
        document.addEventListener('touchmove', function (evt) {
            evt.preventDefault();
            if (!canSwitch) return;
            if (touchData == null) return;
            var delta = evt.touches[0].pageY - touchData;
            if (delta < 0 - height / 6) {
                switchPage(currentPage + 1);
            }
            else if(delta > height / 6) {
                switchPage(currentPage - 1);
            }
        });
        document.addEventListener('touchend', function (evt) {
            touchData = null;
        });

        var firstSwitch = true;
        function switchPage(id) {
            if (id < 1) return;
            if (id > 6) return;
            if (id == currentPage) return;
            canSwitch = false;
            if (firstSwitch) {
                firstSwitch = false;
                if ($('#bgm')[0].paused) {
                    $('#bgm')[0].play();
                }
            }
            $('#area' + currentPage).css('opacity', 0);
            setTimeout(function () {
                $('#area' + currentPage).css('display', 'none');
                switch (currentPage) {
                    case 1:
                        $('.splash').removeClass('run');
                        break;
                    case 2:
                        $('.word_1, .word_2').removeClass('run');
                        break;
                    case 3:
                        $('.word_3').removeClass('run');
                        $('.wing1').removeClass('run');
                        $('.wing2').removeClass('run');
                        break;
                    case 4:
                        $('.word_4').removeClass('run');
                        $('.cloud').removeClass('run');
                        break;
                    case 5:
                        $('.word_5_1, .word_5_2, .word_5_3, .word_5_4').removeClass('run');
                        break;
                    case 6:
                        $('.word_6, .word_6 img').removeClass('run');
                        $('.cars').removeClass('run');
                        break;
                }
                if (id == 6) {
                    $('.arr').hide();
                }
                else {
                    $('.arr').show();
                }

                $('#area' + currentPage).css('display', 'block');
                currentPage = id;
                $('#area' + id).css('opacity', 1);
                setTimeout(function () {
                    canSwitch = true;
                }, 1500);
                setTimeout(function () {
                    switch (currentPage) {
                        case 1:
                            $('.splash').addClass('run');
                            break;
                        case 2:
                            $('.word_1').addClass('run');
                            setTimeout(function () {
                                $('.word_2').addClass('run');
                            }, 1000);
                            break;
                        case 3:
                            $('.word_3').addClass('run');
                            setTimeout(function () {
                                $('.wing1').addClass('run');
                                $('.wing2').addClass('run');
                            }, 1500);
                            break;
                        case 4:
                            //$('.word_4').addClass('run');
                            $('.cloud').addClass('run');
                            setTimeout(function () {
                                $('.word_4').addClass('run');
                            }, 1000);
                            break;
                        case 5:
                            $('.word_5_1').addClass('run');
                            setTimeout(function () { $('.word_5_2').addClass('run'); }, 400);
                            setTimeout(function () { $('.word_5_3').addClass('run'); }, 800);
                            setTimeout(function () { $('.word_5_4').addClass('run'); }, 1200);

                            break;
                        case 6:
                            $('.cars').addClass('run');
                            setTimeout(function () {
                                $('.word_6').addClass('run');
                                setTimeout(function () {
                                    $('.word_6').find('img')[1].className = 'run';
                                }, 1000);
                            }, 1500);
                            break;
                    }
                    
                }, 500);
            }, 500);
        }
    </script>
    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?aae469efc4ef1589d6f4992bd9d883ff";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
</script>

</head>
<body>
    <div class="wrap">
        <div class="page">
            <div class="main">
                <img src="img/bottom.png" class="bottom" />

                <div class="area" id="area1" style="opacity: 1;">
                    <div class="splash">
                        <img src="img/main_1.png" />
                        <canvas width="495" height="268" id="splash"></canvas>
                    </div>
                    <img src="img/main.png" id="img_main" style="display: none;" />
                    <img src="img/flashlight.png" id="img_flash" style="display: none;" />
                </div>

                <div class="area" id="area2">
                    <img src="img/word_1.png" class="word_1" />
                    <img src="img/word_2.png" class="word_2" />
                    <img src="img/car1.png" class="car1" />
                    <div class="wheel1 wheel_1_1">
                        <img src="img/wheel.png" class="wheel" />
                    </div>
                    <div class="wheel1 wheel_1_2">
                        <img src="img/wheel.png" class="wheel" />
                    </div>
                </div>

                <div class="area" id="area3">
                    <div class="word_3">
                        <img src="img/word_3.png" />
                        <img src="img/wing.png" class="wing wing1" />
                        <img src="img/wing.png" class="wing wing2" />
                    </div>
                    <img src="img/car2.png" class="car2" />
                    <img src="img/wheel2.png" class="wheel wheel_2_1" />
                    <img src="img/wheel2.png" class="wheel wheel_2_2" />
                </div>

                <div class="area" id="area4">
                    <div class="word_4">
                        <img src="img/word_4.png" />
                    </div>
                    <img src="img/cloud.png" class="cloud" />
                    <img src="img/car3.png" class="car3" />
                    <img src="img/wheel4.png" class="wheel wheel_3_1" />
                    <img src="img/wheel4.png" class="wheel wheel_3_2" />
                </div>

                <div class="area" id="area5">
                    <img src="img/word_5_1.png" class="word_5 word_5_1" />
                    <img src="img/word_5_2.png" class="word_5 word_5_2" />
                    <img src="img/word_5_3.png" class="word_5 word_5_3" />
                    <img src="img/word_5_4.png" class="word_5 word_5_4" />

                    <img src="img/car4.png" class="car4" />
                    <img src="img/wheel3.png" class="wheel wheel_4_1" />
                    <img src="img/wheel3.png" class="wheel wheel_4_2" />
                </div>

                <div class="area" id="area6">
                    <div class="word_6">
                        <img src="img/word_6.png" />
                        <img src="img/word_6.png" />
                    </div>
                    <img src="img/cars.png" class="cars" />
                </div>
            </div>

            
        </div>
    </div>
    <div class="music">
        <img src="img/music-off.png" class="off" />
        <img src="img/music-on.png" class="on" style="display: none;" />
    </div>

    <img src="img/arr.png" class="arr" style="display: none;" onload="$('.arr').show();" />
    <audio src="img/bgm.mp3" preload="auto" loop="loop" autoplay="autoplay" controls="controls" id="bgm">
        <source src="img/bgm.mp3" type="audio/mpeg" />
    </audio>
</body>
</html>

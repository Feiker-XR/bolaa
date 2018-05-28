<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Web.Default" %>

<!DOCTYPE html>

<html lang="zh-cn">
<head runat="server">
    <meta name="viewport" content="width=device-width, user-scalable=no,initial-scale=1" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <meta name="format-detection" content="telephone=no" />
    <meta charset="utf-8" />
    <title>福特安全节能驾驶训练营</title>
    <link href="SceneLib/SceneLib.css" rel="stylesheet" />
    <link href="main.css" rel="stylesheet" />
    <script src="js/jquery-2.1.1.min.js"></script>
    <script type="text/javascript">
        var shareVote = false;

        $.ajax({
            url: 'Check.ashx',
            type: 'post',
            dataType: 'json',
            success: function (result) {
                if (result == null) {
                    window.location.reload();
                }
            }
        });

        function doSubmit() {
            var name = $.trim($('#p_name').val());
            var phone = $.trim($('#p_phone').val());

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
                    phone: phone
                },
                dataType: 'json',
                success: function (result) {
                    if (result == null) {
                        window.location.reload();
                        return;
                    }
                    $('.result').hide();
                    if (!result.shared) {
                        shareVote = true;
                        $('.btn_share2').show();
                    }
                    else {
                        $('.btn_share2').hide();
                    }

                    if (result.result == 0) {
                        $('.nogift').show();
                    }
                    else {
                        $('.hasgift').show();
                    }
                    $('#form').hide();
                    $('#result').show();
                }
            });
        }
    </script>
    <script src="js/wx.js"></script>
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
    <script src="js/game.js"></script>
    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?e7edba38884380a621310bbc9d6db10a";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
</script>

</head>
<body>
    <div class="sl-stage">
        <div class="sl-container">
            <div class="sl-page">
                <div class="sl-content" id="home">
                    <img src="img/home_bg.png" style="position: absolute;" />
                    <img src="img/home_circle.png" class="home_circle" />
                    <img src="img/home_logo.png" class="home_logo" />
                    <div class="home_car">
                        <img src="img/home_car.png" />
                        <img src="img/home_car.png" />
                        <img src="img/home_car.png" />
                        <img src="img/home_car.png" />
                    </div>
                    <img src="img/home_title.png" class="home_title" />
                    <img src="img/home_play.png" class="home_play" onclick="stage.showPage('game');" />
                </div>
            </div>

            <div class="sl-page gamebg" id="game">
                <canvas id="gamecanvas"></canvas>

                <div class="sl-page mask" id="popup" sl-zoom-type="width">
                    <div class="sl-content" id="rule">
                        <img src="img/rule.png" class="rule" onclick="$('#popup').hide(); game.reset(); game.start();" />
                    </div>

                    <div class="sl-content" id="form" style="display: none;">
                        <div class="rule">
                            <img src="img/form_bg.png" />
                            <span class="oilCount"></span>
                            <input type="text" class="box" id="p_name" maxlength="20" />
                            <input type="tel" class="box" id="p_phone" maxlength="11" />
                            
                            <img src="img/btn_submit.png" class="btn_submit" onclick="doSubmit();" />
                            <img src="img/btn_again.png" class="btn_again" onclick="wx.hideAllNonBaseMenuItem(); shareVote = false; $('#form').hide(); $('#rule').show();" />
                            
                            <img src="img/btn_share.png" class="btn_share" onclick="$('.sharetip').show();" />
                        </div>
                    </div>

                    <div class="sl-content" id="result" style="display: none;">
                        <div class="rule">
                            <img src="img/result_box.png" />
                            
                            <img src="img/nogift.png" class="result nogift" />
                            <img src="img/nogift2.png" class="result nogift2" />
                            <img src="img/played.png" class="result played" />
                            <img src="img/hasgift.png" class="result hasgift" />

                            <img src="img/btn_share2.png" class="btn_share2" onclick="$('.sharetip').show();" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="sharetip" style="display: none;" onclick="$('.sharetip').hide();">
        <img src="img/sharetip.png" />
    </div>
</body>
</html>

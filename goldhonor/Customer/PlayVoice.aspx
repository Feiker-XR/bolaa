<%@ Page Title="" Language="C#" MasterPageFile="~/Customer/Customer.Master" AutoEventWireup="true" CodeBehind="PlayVoice.aspx.cs" Inherits="Web.Customer.PlayVoice" %>
<asp:Content ID="Content1" ContentPlaceHolderID="HeadArea" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="MainArea" runat="server">
    <div class="wrap bg1">
        <img src="img/top.jpg" class="img-responsive" />
        <img src="img/top.png" class="img-responsive" />
        <div class="container voice">
            <div class="row">
                <div class="col-xs-8 col-xs-offset-2" style="margin-top: 10px;">
                    <div class="carphoto thumbnail"><img src="../<%=photofile %>" /></div>
                </div>
            </div>
            
            <div class="intro text-center">我为金欧诺代言录制的语音，点击可以播放</div>
            <div class="thevoice clearfix center-block" style="visibility: visible;">
                <div class="arr">
                    <img src="img/voice_arr.png" />
                </div>
                <div class="block">
                    <span class="play">
                        <img src="img/play_0.png" />
                        <img src="img/play_1.png" />
                        <img src="img/play_2.png" />
                    </span>
                    <%=duration %>"
                </div>
            </div>
            
            <div class="row" style="margin-top: 20px;">
                <a class="col-xs-6 col-xs-offset-3" href="MakeVoice.aspx">
                    <img src="img/btn_record2.png" class="img-responsive" />
                </a>
            </div>

            <div class="text-center" style="margin-top: 20px; font-size: 12px;">
                活动期间购长安金欧诺，有机会赢千足金#荣耀金牌#<br />
                <br />
                <a href="http://mp.weixin.qq.com/s?__biz=MzA3ODA3MjEyNQ==&mid=208711245&idx=1&sn=8f7ccbb8ad7b14eff813e12cf970ccfc" target="_blank" style="text-decoration: underline;">一键关注“长安欧诺”</a>
            </div>
        </div>
    </div>

    <audio src="../<%=voicefile %>" preload="auto" id="music" style="display: none;">
        <source src="../<%=voicefile %>" type="audio/mp3" />
    </audio>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="ScriptArea" runat="server">
    <script type="text/javascript">
        var played = false;

        var voice = document.getElementById('music');

        voice.addEventListener('playing', function () {
            if (!played) {
                played = true;

                $.ajax({
                    url: '../Async.ashx?method=AddVoiceUp',
                    type: 'post',
                    data: {
                        id: <%=id %>
                    }
                });

                startPlay();
            }
        });

        voice.addEventListener('pause', function () {
            stopPlay();
        });

        $('.thevoice').click(function () {
            if (voice.paused) {
                voice.play();
            }
            else {
                voice.pause();
            }
        });

        var t1 = 0;
        var t2 = 0;
        var t3 = 0;
        var t4;
        function startPlay() {
            $('.play img').hide();
            t1 = setTimeout(function(){
                $('.play img').eq(0).show();
            }, 600);
            t2 = setTimeout(function(){
                $('.play img').eq(1).show();
            }, 1200);
            t2 = setTimeout(function(){
                $('.play img').eq(2).show();
            }, 1800);
            t3 = setTimeout(function(){
                $('.play img').hide();
            }, 2400);
            t4 = setTimeout(startPlay, 3000);
        }

        function stopPlay() {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
            $('.play img').show();
        }
    </script>
</asp:Content>

<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="FordQuiz.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
    <title></title>
    <script src="js/jquery-2.1.3.js"></script>
    <script src="js/PxLoader.js"></script>
    <script src="js/PxLoaderImage.js"></script>
    <script src="js/wxshare.js?v1"></script>
    <style type="text/css">
        *{margin:0px;padding:0px;}
        .container{width:100%;height:100%;overflow:hidden;position:relative;}
        .container img{width:100%;}
        .scroll_show{overflow:hidden;}
        .scroll_container{position:relative;transition:transform 1s;-webkit-transition:-webkit-transform 1s;}
        .page{position:relative;float:left;}
        .page1_guang{position:absolute;top:0px;left:0px;z-index:100;width:100%;opacity:0;}
        .page1_title{position:absolute;top:40%;left:26%;z-index:200;width:48%;transform:translate(0,-400%);-webkit-transform:translate(0,-400%);opacity:0;}
        .page2_title1{position:absolute;top:40%;left:15%;z-index:200;width:70%;transform:translate(-200%,0);-webkit-transform:translate(-200%,0);}
        .page2_title2{position:absolute;left:15%;z-index:200;width:70%;transform:translate(200%,0);-webkit-transform:translate(200%,0);}

        .page3_title_bg{width:100%;position:absolute;top:46.8%;left:0px;z-index:300;}
        .page3_title1{position:absolute;width:68%;left:16%;top:0px;z-index:400;transform:translate(-200%,0);-webkit-transform:translate(-200%,0)}
        .page3_title2{position:absolute;width:69%;left:15.5%;z-index:400;transform:translate(200%,0);-webkit-transform:translate(200%,0)}
        .page3_xuehua{position:absolute;width:100%;left:0px;top:4%;z-index:300;}

        .page4_title1{position:absolute;width:100%;left:0px;top:34%;z-index:100;transform:translate(-200%,0);-webkit-transform:translate(-200%,0)}
        .page4_title2{position:absolute;width:100%;left:0px;z-index:100;transform:translate(200%,0);-webkit-transform:translate(200%,0)}

        .page5_title1{position:absolute;width:90%;left:5%;top:34%;z-index:100;transform:translate(-200%,0);-webkit-transform:translate(-200%,0)}
        .page5_title2{position:absolute;width:90%;left:5%;z-index:100;transform:translate(200%,0);-webkit-transform:translate(200%,0)}
        .page5_title3{position:absolute;width:90%;left:5%;z-index:100;transform:translate(-200%,0);-webkit-transform:translate(-200%,0)}

        .page6_top{position:absolute;width:38%;left:31%;top:20%;z-index:100;}
        .page6_mid{position:absolute;width:90%;left:5%;top:36%;z-index:100;}
        .page6_partin_btn{position:absolute;width:34%;left:33%;top:56%;z-index:100;}
        .page6_rule_btn{position:absolute;width:14%;left:43%;top:62%;z-index:100;}
        .page6_bottom{position:absolute;width:69%;left:15.5%;top:70%;z-index:100;}

        .rule_cover{position:fixed;top:0px;left0px; width:100%;height:100%;background-color:rgba(0,0,0,0.8);z-index:1000;}
        .rule{width:72%;position:absolute;left:14%;}
        .rule_read_btn{width:24%;position:absolute;top:89%;left:38%;}

        .quiz{position:absolute;width:100%;height:100%;left:0px;top:0px;}
        .question_bg{position:absolute;width:94%;left:3%;}
        .question,.question_result,.question_sub_userinfo,.focus_share{width:62%;position:absolute;left:19%;top:25%;}
        .question_title{width:100%;color:#225300;font-family:'Microsoft YaHei';font-size:14px;font-weight:bold;}
        .answer{margin-top:4%;float:left;background-image:url("./images/answer_no_sel.png");background-repeat:no-repeat;background-size:100% 100%;color:#245900;font-family:'Microsoft YaHei';font-size:12px;}
        .next_question_btn{width:70%;}

        .qr_title{color:#245900;font-family:'Microsoft YaHei';font-size:20px;font-weight:bold;text-align:center;width:100%;}
        .question_result span {font-size:20px;font-weight:bold;}
        .qr_content{color:#245900;font-family:'Microsoft YaHei';font-size:16px;text-align:center;width:100%;margin-top:2%;}
        .next_step_btn{width:70%;margin-left:20%;margin-top:5%;}
        .requestion{width:70%;margin-left:20%;margin-top:-5%;}
        .question_sub_userinfo{color:#245900;font-family:'Microsoft YaHei';font-size:22px;text-align:center;}
        .question_sub_userinfo input{background-color:#f7ffa8;border:none;font-size:16px;}
        .phone{margin-top:5%;}
        .username{margin-top:5%;}
        .userinfo_sub_btn{width:70%;margin-left:20%;margin-top:10%;}
        .focus_content{color:#245900;font-family:'Microsoft YaHei';font-size:16px;text-align:center;line-height:26px;font-weight:bold;}
        .focus_content a{color:#0045a3;text-decoration:underline;}

        .music_btn{position: fixed;  width: 7%; top: 1%; left: 2%; z-index: 1000;}


        @keyframes page1TitleAni {
            0%  {transform:translate(0,-400%);opacity:0;}
            1%  {transform:translate(0,-400%);opacity:1;}
            100%  {transform:translate(0,0);opacity:1;}
        }
        @-webkit-keyframes page1TitleAni {
            0%  {-webkit-transform:translate(0,-400%);opacity:0;}
            1%  {-webkit-transform:translate(0,-400%);opacity:1;}
            100%  {-webkit-transform:translate(0,0);opacity:1;}
        }

        /*@keyframes page1GuangAni {
            0%  {transform:rotate(0deg)}
            100%  {transform:rotate(360deg)}
        }
        @-webkit-keyframes page1GuangAni {
            0%  {-webkit-transform:rotate(0deg)}
            100%  {-webkit-transform:rotate(360deg)}
        }*/

        @keyframes showAni {
            0%   {opacity:0.5; }
            100% {opacity:1;}
        }
        @-webkit-keyframes showAni {
            0%   {opacity:0.5;}
            100% {opacity:1;}
        }

        @keyframes page2Title1Ani {
            0%    {transform:translate(-200%,0);}
            100%  {transform:translate(0,0);}
        }
        @-webkit-keyframes page2Title1Ani {
            0%    {-webkit-transform:translate(-200%,0);}
            100%  {-webkit-transform:translate(0,0);}
        }

        @keyframes page2Title2Ani {
            0%    {transform:translate(200%,0);}
            100%  {transform:translate(0,0);}
        }
        @-webkit-keyframes page2Title2Ani {
            0%    {-webkit-transform:translate(200%,0);}
            100%  {-webkit-transform:translate(0,0);}
        }

        /*加载进度*/
        .loading_fir{width:100%;height:100%;background-color:rgba(0,0,0,0.7);position:absolute;padding-top:80%;z-index: 1001;color:#fff;font-size:1.5em;text-align:center;/* filter:alpha(opacity=50);-moz-opacity: 0.5;opacity: 0.5*/}
    </style>
    <script>
        var vWidth, vHeight, pageIndex = 0, questionIndex = 0;
        var isSubmitUserinfo = "false";//是否提交了用户信息
        var questionAnswerData = ['N', 'N', 'N', 'N', 'N'];
        var pageAniIndex = 0;
        $(function () {
            vWidth = $(window).width();
            vHeight = $(window).height();
            positionInit();
            loadImage();
        })

        function loadImage() {
            $.get("js/images.txt", null, function (data, status) {
                var pArr = eval('(' + data + ')');
                var loader = new PxLoader();
                var data = new Date();
                var img = new Image();
                var imgsrc;

                for (var i = 0; i < pArr.length; i++) {
                    loader.addImage(pArr[i].url);
                }
                loader.addProgressListener(function (e) {
                    var loadnum = parseInt((e.completedCount / e.totalCount) * 100);
                    $('.unmbers_fir').text(loadnum + '%');
                });

                loader.addCompletionListener(function (e) {
                    //显示主内容
                    $('.loading_fir').animate({ height: 'toggle' }, null, null, function () {
                        touchFun();
                        queClickInit();
                    });
                });
                loader.start();
            });
        }


        function positionInit() {
            var pageLength = $(".page").length;
            var page2Title1Top = vHeight * 0.4;
            var page2Title2Top = vHeight * 0.4 + 85 / 445 * (vWidth * 0.7);
            var page3Title2Top = 69 / 435 * (vWidth * 0.68);
            var page4Title2Top = vHeight * 0.34 + 126 / 640 * (vWidth * 1);
            var page5Title2Top = vHeight * 0.34 + 107 / 573 * (vWidth * 0.9);
            var page5Title3Top = page5Title2Top + 61 / 573 * (vWidth * 0.9);
            
            var ruleTop = (vHeight - 736 / 462 * (vWidth * 0.72)) / 2;
            var questionBgHegith = 842 / 600 * (vWidth * 0.94);
            var questionBgTop = (vHeight - questionBgHegith) / 2;
            
            var questionHeight = 425 / 842 * questionBgHegith;
            var questionWidth = vWidth * 0.94 * 0.62;
            var answerHeight = 46 / 363 * questionWidth;
            var queTitleHeight = 95 / 363 * questionWidth;

            $(".container").css({ "width": vWidth, "height": vHeight });
            $(".scroll_show").css({ "width": vWidth, "height": vHeight });
            $(".page").css({ "width": vWidth, "height": vHeight });
            $(".bgimg").css({ "width": vWidth, "height": vHeight });
            $(".scroll_container").css({ "width": vWidth, "height": vHeight * pageLength });
            $(".page2_title1").css({ "top": page2Title1Top });
            $(".page2_title2").css({ "top": page2Title2Top });
            $(".page3_title2").css({ "top": page3Title2Top });
            $(".page4_title2").css({ "top": page4Title2Top });
            $(".page5_title2").css({ "top": page5Title2Top });
            $(".page5_title3").css({ "top": page5Title3Top });
            $(".rule").css({ "top": ruleTop });
            $(".question_bg").css({ "top": questionBgTop });
            
            $(".question").css({ "height": questionHeight });
            $(".answer").css({ "height": answerHeight, "width": questionWidth, "line-height": answerHeight +"px"});
            $(".question_title").css({ "height": queTitleHeight });
            
        }
        function pageNav() {
            console.log("pageIndex:" + pageIndex + "pageAniIndex:" + pageAniIndex);
            aniReset();
            $(".scroll_container").css({ "transform": "translate(0px,-" + pageIndex * vHeight + "px)", "-webkit-transform": "-webkit-translate(0px,-" + pageIndex * vHeight + "px)" });
            if (pageIndex == 1 && pageAniIndex ==1)
            {
                page1Ani1();
            }
            else if (pageIndex == 1 && pageAniIndex == 2)
            {
                page1Ani2();
             
            }//第一页动画结束
            else if (pageIndex == 2 && pageAniIndex == 1)
            {
                page2Ani();
     
            }//第二页动画结束
            else if (pageIndex == 3 && pageAniIndex == 1)
            {
                page3Ani1();
              
            }
            else if (pageIndex == 3 && pageAniIndex == 2) {
                page3Ani2();
              
            }//第三页动画结束
        }
       

        function touchFun() {
            var touchData = null;
            var pageCount = $(".page").length;
            $(".scroll_container").bind("touchstart", function (evt) {
                touchData = {
                    Y: evt.originalEvent.targetTouches[0].pageY
                };
            })
            $(".scroll_container").bind("touchmove", function (evt) {
                evt.preventDefault();
                if (!touchData) { return; }
                var currentY = evt.originalEvent.targetTouches[0].pageY;
                var vHeight = $(window).height();
                var setOffY = currentY - touchData.Y;

                if (Math.abs(setOffY) > vHeight / 50) {
                    touchData = null;
                    if (setOffY > 0 && pageIndex > 0) {
                        if (pageIndex == 1 && pageAniIndex == 2) {
                            pageIndex=1;
                            pageAniIndex = 1;
                        } else if (pageIndex == 1 && pageAniIndex == 1)
                        {
                            pageIndex = 0;
                            pageAniIndex = 0;
                        }
                        else if (pageIndex == 1 && pageAniIndex == 2) {
                            pageIndex = 1;
                            pageAniIndex = 1;
                        }
                        else if (pageIndex == 2 && pageAniIndex == 1) {
                            pageIndex =1;
                            pageAniIndex = 1;
                        }
                        else if (pageIndex == 3 && pageAniIndex == 1) {
                            pageIndex = 2;
                            pageAniIndex = 1;
                        }
                        else if (pageIndex == 3 && pageAniIndex == 2) {
                            pageIndex = 3;
                            pageAniIndex = 1;
                        }
                        else if (pageIndex == 4 && pageAniIndex == 1) {
                            pageIndex = 3;
                            pageAniIndex = 1;
                        }
                    }
                    else if (setOffY < 0 && pageIndex < pageCount - 1) {
                        if (pageIndex == 0 && pageAniIndex == 0) {
                            pageIndex++;
                            pageAniIndex++;
                        }
                        else if (pageIndex == 1 && pageAniIndex == 1) {
                            pageAniIndex++;
                        }
                        else if (pageIndex == 1 && pageAniIndex == 2) {
                            pageIndex = 2;
                            pageAniIndex = 1;
                        }
                        else if (pageIndex == 2 && pageAniIndex == 1) {
                            pageIndex = 3;
                            pageAniIndex = 1;
                        }
                        else if (pageIndex == 3 && pageAniIndex == 1) {
                            pageIndex = 3;
                            pageAniIndex = 2;
                        }
                        else if (pageIndex == 3 && pageAniIndex == 2) {
                            pageIndex = 4;
                            pageAniIndex = 1;
                        }
                    }
                    pageNav();
                }
            })
            $(".scroll_container").bind("touchend", function (evt) {
                touchData = null;
            })
        }
        //参与竞猜
        function beginQuiz() {
            hidePages();
            showRule();
            showQuiz();
            showQuestion();
        }

        function queClickInit() {
            $(".answer").click(function () {
                $(".answer").each(function (index, ele) {
                    $(ele).css("background-image", "url('./images/answer_no_sel.png')");
                })
                questionAnswerData[questionIndex] = $(this).attr("attr-answer");//选择的答案；
                //console.log(questionAnswerData[questionIndex]);
                $(this).css("background-image","url('./images/answer_selected.png')");
            })
        }

        function nextQuestion() {
            if (questionAnswerData[questionIndex] == 'N') {
                alert("请选择答案！");
                return;
            }
            questionIndex = questionIndex + 1;
            if (questionIndex == 5) {
                return;
            }
            $(".question").hide();
            $(".question:eq(" + questionIndex + ")").show();
            //console.log(questionIndex);
        }

        function submitQes() {
            if (questionAnswerData[questionIndex] == 'N') {
                alert("请选择答案！");
                return;
            }
            $.ajax({
                url: "handler/AnswerSubmit.ashx",
                type: "POST",
                data: { "q1": questionAnswerData[0], "q2": questionAnswerData[1], "q3": questionAnswerData[2], "q4": questionAnswerData[3], "q5": questionAnswerData[4] },
                success: function (data) {
                    var rel = data.split('-');
                    $("#rithtCount").text(rel[0]);
                    $("#caoPartin").text(rel[1]+"%");
                    isSubmitUserinfo = rel[2];
                    hideQuestion();
                    showResult();
                }
            })
        }
        //提交用户信息
        function userinfoSub() {
            var phone = $("#phone").val();
            var username = $("#username").val();
            if (phone == "") { alert("手机号码不能为空"); return; }
            if (username == "") { alert("姓名不能为空"); return; }
            $.ajax({
                url: "handler/submitUserinfo.ashx",
                type: "POST",
                data: { "phone": phone, "username": username },
                success: function (data) {
                    if (data == "ok") {
                        hideSubUserinfo();
                        showFocus();
                    }
                }
            })
        }
        function nextStep() {
            //获取用户信息
            $.get("handler/getUserinfo.ashx", null, function (data) {
                if (data) {
                    var rel = data.split('-');
                    var username = rel[0];
                    var tel = rel[1];
                    $("#username").val(username);
                    $("#phone").val(tel);
                }
                hideResult();
                showSubUserinfo();
            });
        }
        function showQuiz() {
            $(".quiz").show();
        }
        //隐藏介绍
        function hidePages() {
            $(".scroll_show").hide();
        }
        //显示规则
        function showRule() {
            $(".rule_cover").show();
        }
        //隐藏规则
        function hideRule() {
            $(".rule_cover").hide();
        }
        //显示问题
        function showQuestion() {
            $(".question").hide();
            $(".question:eq(0)").show();
        }
        //隐藏问题
        function hideQuestion() {
            $(".question").hide();
        }
        //显示结果
        function showResult() {
            $(".question_result").show();
        }
        //隐藏结果
        function hideResult() {
            $(".question_result").hide();
        }
        //显示提交信息
        function showSubUserinfo() {
            $(".question_sub_userinfo").show();
        }
        //隐藏提交信息
        function hideSubUserinfo() {
            $(".question_sub_userinfo").hide();
        }
        //显示关注
        function showFocus() {
            $(".focus_share").show();
        }
        //隐藏关注
        function hideFocus() {
            $(".focus_share").hide();
        }
        //重新答题
        function requestionFun() {
            hideResult();
            hideSubUserinfo();
            hidePages();
            hideFocus();
            showQuiz();
            showQuestion();
            questionAnswerData = ['N', 'N', 'N', 'N', 'N'];//重置答案
            questionIndex = 0;
        }

        //动画重置
        function aniReset() {
            $(".page1_title").css({ "animation": "null", "-webkit-animation": "null" });
            $(".page1_title").show();
            $(".page2_title1").css({ "animation": "null", "-webkit-animation": "null" });
            $(".page2_title2").css({ "animation": "null", "-webkit-animation": "null" });
            $(".page3_title1").css({ "animation": "null", "-webkit-animation": "null" });
            $(".page3_title2").css({ "animation": "null", "-webkit-animation": "null" });
            $(".page4_title1").css({ "animation": "null", "-webkit-animation": "null" });
            $(".page4_title2").css({ "animation": "null", "-webkit-animation": "null" });
            $(".page4_title1").show();
            $(".page4_title2").show();
            $(".page3_title_bg").show();
            $(".page5_title1").css({ "animation": "null", "-webkit-animation": "null" });
            $(".page5_title2").css({ "animation": "null", "-webkit-animation": "null" });
            $(".page5_title3").css({ "animation": "null", "-webkit-animation": "null" });
        }

        function page1Ani1() {
            $(".page1_title").css({ "animation": "page1TitleAni 1s ease-out forwards", "-webkit-animation": "page1TitleAni 1s ease-out 1s forwards" });
         
            $(".page1_guang").css({ "animation": "showAni 1s ease-out 1s infinite alternate", "-webkit-animation": "showAni 1s ease-out 1s infinite alternate", });
        }
        function page1Ani2() {
            $(".page1_title").hide();
            $(".page2_title1").css({ "animation": "page2Title1Ani 1s ease-out forwards", "-webkit-animation": "page2Title1Ani ease-out 1s forwards" });
            $(".page2_title2").css({ "animation": "page2Title2Ani 1s ease-out forwards", "-webkit-animation": "page2Title2Ani 1s ease-out forwards" });
        }
        function page2Ani() {
            $(".page3_title1").css({ "animation": "page2Title1Ani 1s ease-out 1s forwards", "-webkit-animation": "page2Title1Ani 1s ease-out 1s forwards" });
            $(".page3_title2").css({ "animation": "page2Title2Ani 1s ease-out 1s forwards", "-webkit-animation": "page2Title2Ani 1s ease-out 1s forwards" });
        }
        function page3Ani1() {
            $(".page4_title1").css({ "animation": "page2Title1Ani 1s ease-out 1s forwards", "-webkit-animation": "page2Title1Ani 1s ease-out 1s forwards" });
            $(".page4_title2").css({ "animation": "page2Title2Ani 1s ease-out 1s forwards", "-webkit-animation": "page2Title2Ani 1s ease-out 1s forwards" });
        }
        function page3Ani2() {
            $(".page4_title1").hide();
            $(".page4_title2").hide();
            $(".page3_title_bg").hide();
            $(".page5_title1").css({ "animation": "page2Title1Ani 1s ease-out forwards", "-webkit-animation": "page2Title1Ani 1s ease-out forwards" });
            $(".page5_title2").css({ "animation": "page2Title2Ani 1s ease-out forwards", "-webkit-animation": "page2Title2Ani 1s ease-out forwards" });
            $(".page5_title3").css({ "animation": "page2Title1Ani 1s ease-out forwards", "-webkit-animation": "page2Title1Ani 1s ease-out forwards" });
        }
        var isplay = true;
        function musicClose() {
            var audio = document.getElementById("audio_music");
            audio.play();
            if (isplay) {
                audio.pause();
                isplay = false;
                $(".music_btn img").attr("src", "images/music_btn.png");
            }
            else {
                audio.play();
                isplay = true;
                $(".music_btn img").attr("src", "images/music_open_btn.png");
            }
        }
    </script>
</head>
<body>
    <div class="container">
        <div id="loading" class="loading_fir">
	        <span id="unmbers" class="unmbers_fir">0%</span><br/>
	        LOADING
        </div>
        <div class="music_btn">
            <a href="javascript:void(0)" onclick="musicClose()">
                <img src="images/music_open_btn.png" />
            </a>
        </div>
        <div style="display:none">
            <audio id="audio_music" loop="loop" autoplay="autoplay" controls="controls">
                <source src="images/music.mp3" type="audio/mpeg" />
            </audio>
        </div>
        <div class="rule_cover" style="display:none;">
            <div class="rule">
                <img src="images/rule.png" />
                <div class="rule_read_btn">
                    <a href="javascript:void(0)" onclick="hideRule()"><img src="images/rule_read_btn.png" /></a>
                </div>
            </div>
        </div>
        <div class="scroll_show" style="display:block;">
            <div class="scroll_container">
                <div class="page">
                    <img class="bgimg" src="images/page0_bg.jpg" />
                </div>
               
                <div class="page">
                    <img class="bgimg" src="images/page1_bg.jpg" />
                    <div class="page1_guang">
                        <img src="images/page1_guang.png" />
                    </div>
                    <div class="page1_title">
                        <img src="images/page1_title.png" />
                    </div>

                    <div class="page2_title1">
                        <img src="images/page2_title1.png" />
                    </div>
                    <div class="page2_title2">
                        <img src="images/page2_title2.png" />
                    </div>
                </div>
               
                <div class="page">
                    <img  class="bgimg" src="images/page3_bg.jpg" />
                    <div class="page1_guang">
                        <img src="images/page1_guang.png" />
                    </div>
                    <div class="page3_xuehua">
                        <img src="images/page3_xuehua.png" />
                    </div>
                    <div class="page3_title_bg">
                        <img src="images/page3_title_bg.png" />
                        <div class="page3_title1">
                            <img src="images/page3_title1.png" />
                        </div>
                        <div class="page3_title2">
                            <img src="images/page3_title2.png" />
                        </div>
                    </div>
                </div>
                
                 <div class="page">
                    <img  class="bgimg" src="images/page4_bg.jpg" />
                    <div class="page4_title1">
                        <img src="images/page4_title1.png" />
                    </div>
                    <div class="page4_title2">
                        <img src="images/page4_title2.png" />
                    </div>

                    <div class="page5_title1">
                        <img src="images/page5_title1.png" />
                    </div>
                    <div class="page5_title2">
                        <img src="images/page5_title2.png" />
                    </div>
                    <div class="page5_title3">
                        <img src="images/page5_title3.png" />
                    </div>
                </div>  
             
                <div class="page">
                    <img class="bgimg" src="images/page6_bg.jpg" />
                    <div class="page6_top">
                        <img src="images/page6_top.png" />
                    </div>
                    <div class="page6_mid">
                        <img src="images/page6_mid.png" />
                    </div>
                    <div class="page6_partin_btn">
                         <a href="javascript:void(0)" onclick="beginQuiz()">
                             <img src="images/page6_partin_btn.png" /></a>
                    </div>
                    <div class="page6_rule_btn">
                         <a href="javascript:void(0)" onclick="showRule()">
                             <img src="images/page6_rule_btn.png" /></a>
                    </div>
                    <div class="page6_bottom">
                         <img src="images/page6_bottom.png" />
                    </div>
                </div>
            </div>
        </div>
        <div class="quiz" style="display:none;">
            <img class="bgimg" src="images/quiz_bg.jpg" />
            <div class="question_bg">
                <img src="images/quiz_qus_bg.png" />
                <div class="question" style="display:none;">
                    <div class="question_title">
                        长安福特2015年超级杯参赛队伍分别是哪两支
                    </div>
                 
                    <div class="answer" attr-answer="A">
                        &nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;恒大vs力帆
                    </div>
                    <div class="answer" attr-answer="B">
                        &nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;鲁能vs申花
                    </div>
                    <div class="answer" attr-answer="C">
                        &nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;恒大vs鲁能
                    </div>
                    <div class="answer" attr-answer="D">
                        &nbsp;&nbsp;&nbsp;D&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;国安vs绿城
                    </div>
                    <div class="next_question_btn">
                        <a href="javascript:void(0)" onclick="nextQuestion()"><img src="images/next_question_btn.png" /></a>
                    </div>
                </div>
                <div class="question" style="display:none;">
                    <div class="question_title">
                        长安福特2015年超级杯的比赛时间是
                    </div>
                 
                    <div class="answer" attr-answer="A">
                        &nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2月14日
                    </div>
                    <div class="answer" attr-answer="B">
                        &nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2月16日
                    </div>
                    <div class="answer" attr-answer="C">
                        &nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2月19日
                    </div>
                    <div class="answer" attr-answer="D">
                        &nbsp;&nbsp;&nbsp;D&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2月24日
                    </div>
                    <div class="next_question_btn">
                        <a href="javascript:void(0)" onclick="nextQuestion()"><img src="images/next_question_btn.png" /></a>
                    </div>
                </div>
                <div class="question" style="display:none;">
                    <div class="question_title">
                        长安福特2015年超级杯举办地是
                    </div>
                 
                    <div class="answer" attr-answer="A">
                        &nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;上海
                    </div>
                    <div class="answer" attr-answer="B">
                        &nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;广州
                    </div>
                    <div class="answer" attr-answer="C">
                        &nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;南京
                    </div>
                    <div class="answer" attr-answer="D">
                        &nbsp;&nbsp;&nbsp;D&nbsp;&nbsp;&nbsp;&nbsp;杭州
                    </div>
                    <div class="next_question_btn">
                        <a href="javascript:void(0)" onclick="nextQuestion()"><img src="images/next_question_btn.png" /></a>
                    </div>
                </div>
                <div class="question" style="display:none;">
                    <div class="question_title">
                        长安福特“新典范家轿”福睿斯的售价是：
                    </div>
                 
                    <div class="answer" attr-answer="A">
                        &nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;9.68万起
                    </div>
                    <div class="answer" attr-answer="B">
                        &nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;9.78万起
                    </div>
                    <div class="answer" attr-answer="C">
                        &nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;9.86万起
                    </div>
                    <div class="answer" attr-answer="D">
                        &nbsp;&nbsp;&nbsp;D&nbsp;&nbsp;&nbsp;&nbsp;9.88万起
                    </div>
                    <div class="next_question_btn">
                        <a href="javascript:void(0)" onclick="nextQuestion()"><img src="images/next_question_btn.png" /></a>
                    </div>
                </div>
                <div class="question" style="display:none;">
                    <div class="question_title">
                        现任山东鲁能泰山队主力门将为：
                    </div>
                 
                    <div class="answer" attr-answer="A">
                        &nbsp;&nbsp;&nbsp;A&nbsp;&nbsp;&nbsp;&nbsp;李毅
                    </div>
                    <div class="answer" attr-answer="B">
                        &nbsp;&nbsp;&nbsp;B&nbsp;&nbsp;&nbsp;&nbsp;杨智
                    </div>
                    <div class="answer" attr-answer="C">
                        &nbsp;&nbsp;&nbsp;C&nbsp;&nbsp;&nbsp;&nbsp;王大雷
                    </div>
                    <div class="answer" attr-answer="D">
                        &nbsp;&nbsp;&nbsp;D&nbsp;&nbsp;&nbsp;&nbsp;李雷雷
                    </div>
                    <div class="next_question_btn">
                        <a href="javascript:void(0)" onclick="submitQes()"><img src="images/next_question_btn.png" /></a>
                    </div>
                </div>

                <div class="question_result" style="display:none;">
                    <div class="qr_title">
                        恭喜
                    </div>
                    <div class="qr_content">
                        回答正确<span id="rithtCount">3</span>道题<br />
                        你超越了<span id="caoPartin">80%</span>的参与者
                    </div>
                    <div class="next_step_btn">
                        <a href="javascript:void(0)" onclick="nextStep()">
                            <img src="images/next_step_btn.png" />
                        </a>
                    </div>
                    <div class="requestion">
                        <a href="javascript:void(0)" onclick="requestionFun()">
                            <img src="images/requestion_btn.png" />
                        </a>
                    </div>
                </div>

                <div class="question_sub_userinfo" style="display:none;">
                    <div class="phone">
                        姓名:<input type="text" id="username"/>
                    </div>
                    <div class="username">
                        手机:<input type="tel" id="phone" maxlength="11"/>
                    </div>
                    <div class="userinfo_sub_btn">
                        <a href="javascript:void(0)" onclick="userinfoSub()"><img src="images/userinfo_sub_btn.png" /></a>
                    </div>
                </div>

                <div class="focus_share" style="display:none;">
                    <div class="focus_content">
                        感谢您参与<br />
                        长安福特2015超级杯<br />
                        有奖竞猜活动<br />
                        中奖信息发布敬请关注<br />
                        官方微信公众号<br />
                        <a href="http://mp.weixin.qq.com/s?__biz=MzAwODA1ODIzNg==&mid=204618317&idx=1&sn=13c3146f30aa141815f199c4538da54a#rd">"长安福特进无止境"</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?090842c5612494617fe46db1e8b15ad8";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
</script>
</body>
</html>

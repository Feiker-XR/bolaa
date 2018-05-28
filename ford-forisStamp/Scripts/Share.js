var shareTitle = '福睿斯新年福票';
var shareTitle1 = '福睿斯新年福票';
var shareDesc = "福睿斯新年福票";
var shareLink = 'http://forisstamp.ser2.ford001.com/';
var shareLinkDefault = 'http://forisstamp.ser2.ford001.com/';
var imgUrl = 'http://forisstamp.ser2.ford001.com/Content/images/share.jpg';

function wxConfig() {
   //alert(location.href.split('#')[0]);
    $.ajax({
        url: "/Home/GetAuthorize",
        type: "POST",
        async: false,
        success: function (msg) {
            SetCookie("NonceStr", msg.Data.noncestr);
            SetCookie("TimesTamp", msg.Data.timespan);
            SetCookie("SignaTure", msg.Data.signature);
            SetCookie("AppID", msg.Data.appid);
            SetCookie("Token", msg.Data.access_token);
        }
    });
}
function sharecontent() {
    wx.onMenuShareTimeline({
        title: shareTitle1, // 分享标题
        link: shareLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

    wx.onMenuShareAppMessage({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接
        imgUrl: imgUrl, // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}

var localId;
var serverId;
wx.ready(function () {
   
    sharecontent();
    var timer;
    //开始录音
    document.querySelector('.startbtn').onclick = function () {
        $(".start").hide();
        $(".stop").show();

        var time = 59;
        timer = window.setInterval(function () {
            time--;

            $("#showtime").text("… " + time + " …");
            if (time <= 0) {
                window.clearInterval(timer);
                $("#showtime").text("");
            }
        }, 1000);

        wx.startRecord({
            cancel: function () {
              //  alert('用户拒绝录音');
                $(".stop").hide();
                window.clearInterval(timer);
            }
        });
    };



    //停止录音
    document.querySelector('.stop').onclick = function () {
        window.clearInterval(timer);
        $("#showtime").text("");
        wx.stopRecord({
            success: function (res) {
                stoprec(res);
             },
            fail: function (res) {
                //alert(JSON.stringify(res));
                alert('抱歉，网络异常！');
            }
        });
    };

    //监听录音自动停止
    wx.onVoiceRecordEnd({
        // 录音时间超过一分钟没有停止的时候会执行 complete 回调
        complete: function (res) {
            stoprec(res);
        }
    });


    
    //播放音频
    document.querySelector('.play').onclick = function () {
     
        if (localId == '') {
            alert('请先录制音频');
            return;
        }
   
        if (play2state == 0) {
            play2state = 1;

            wx.playVoice({
                localId: localId
            });

            playsound(".play");
                    
        } else {
            play2state = 0;
            wx.pauseVoice({
                localId: localId 
            });
            $(".play").attr("src", "/Content/images/sound.png");
            window.clearInterval(playsoundTimer);
        }

    };


    function saveInfo() {
        //alert("localId:" + localId);
        //alert("stampid:" + stampid);

        var token = getCookie("Token");

        $.ajax({
            url: "/Home/SaveInfo", data: { m: serverId, s: stampid, t: token }, type: "post", success: function (response) {
                if (response.Message == "") {
                   
                    shareLink = "http://forisstamp.ser2.ford001.com/?cid=" + response.Data;
                    sharecontent();
           
                }
            }
        });
    }

    function stoprec(res) {
       
        wx.uploadVoice({
            localId: res.localId,
            success: function (rese) {
                //alert('上传语音成功，serverId 为' + rese.serverId);
                localId = res.localId;
                serverId = rese.serverId;
                $("#complete").show();
                $(".stop").hide();
                $(".play").show();
                saveInfo();
            }
        });
    }
});

function startconfig() {
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: getCookie("AppID"), // 必填，公众号的唯一标识
        timestamp: parseInt(getCookie("TimesTamp")), // 必填，生成签名的时间戳
        nonceStr: getCookie("NonceStr"), // 必填，生成签名的随机串
        signature: getCookie("SignaTure"), // 必填，签名，见附录1
        jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'getLatestAddress',
        'editAddress',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard']

    });
}

wx.error(function (res) {
    //alert(res.errMsg);
    //alert('抱歉，网络异常！');
});



var wxShare = {
    title: '新嘉年华-尽享驾驭新体验',  // 分享标题
    desc: '新嘉年华-够听话，又敢撒野，让你尽享驾驭新体验',   // 分享描述
    link: 'http://applink.ser2.ford001.com/',   // 分享链接
    imgUrl: 'http://applink.ser2.ford001.com/img/wxlogo.jpg',  // 分享图标
    type: '',   // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function (res) {
        // 用户确认分享后执行的回调函数
    },
    cancel: function (res) {
        // 用户取消分享后执行的回调函数
    }
};

var wxIsReady = false;

function setShareData() {
    if (!wxIsReady) return;
    wx.onMenuShareTimeline({
        title: wxShare.desc,
        link: wxShare.link,
        imgUrl: wxShare.imgUrl,
        success: wxShare.success,
        cancel: wxShare.cancel
    });

    wx.onMenuShareAppMessage({
        title: wxShare.title,
        desc: wxShare.desc,
        link: wxShare.link,
        imgUrl: wxShare.imgUrl,
        type: wxShare.type,
        dataUrl: wxShare.dataUrl,
        success: wxShare.success,
        cancel: wxShare.cancel
    });

    wx.onMenuShareQQ({
        title: wxShare.title,
        desc: wxShare.desc,
        link: wxShare.link,
        imgUrl: wxShare.imgUrl,
        success: wxShare.success,
        cancel: wxShare.cancel
    });

    wx.onMenuShareWeibo({
        title: wxShare.title,
        desc: wxShare.desc,
        link: wxShare.link,
        imgUrl: wxShare.imgUrl,
        success: wxShare.success,
        cancel: wxShare.cancel
    });
}

var jsapiTicketUrl = 'http://wxauth.app.bolaa.net/jsticket.ashx?serv_name=mondeocard&url=' + encodeURIComponent(window.location.href);

(function () {
    var wxjs = document.createElement('script');
    wxjs.addEventListener('load', function () {
        wx.ready(onWXReady);
        configWX();
    });
    wxjs.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
    var js = document.getElementsByTagName('script')[0];
    js.parentNode.insertBefore(wxjs, js.nextSibling);

    var configWX = function () {
        var callback = 'jsonp_' + new Date().valueOf();

        window[callback] = function (config) {
            config.debug = false;
            config.jsApiList =
            [
                //'chooseWXPay',
                //'openProductSpecificView',
                //'addCard',
                //'chooseCard',
                //'openCard',
                //以上接口为支付、小店、卡券类接口，有权限的公众号才能开启
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'startRecord',
                'stopRecord',
                'onVoiceRecordEnd',
                'playVoice',
                'pauseVoice',
                'stopVoice',
                'onVoicePlayEnd',
                'uploadVoice',
                'downloadVoice',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'translateVoice',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'closeWindow',
                'scanQRCode'
            ];
            wx.config(config);
        };

        var js = document.createElement('script');
        js.src = jsapiTicketUrl + "&_=" + new Date().valueOf() + '&callback=' + callback;
        var pjs = document.getElementsByTagName('script')[0];
        pjs.parentNode.insertBefore(js, pjs);
    };

    var onWXReady = function () {

        wxIsReady = true;

        setShareData();

        wx.showOptionMenu();

        wx.onVoiceRecordEnd({
            complete: function (res) {
                var localId = res.localId;
                VOICE_ON = false;
                $('.p2_voice').removeClass('on');
                wx.translateVoice({
                    localId: localId, // 需要识别的音频的本地Id，由录音相关接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        if (res.translateResult == '' || res.translateResult == null || res.translateResult == undefined) {
                            return;
                        }
                        for (var i = 0; i < VOICES.length; i++) {
                            if (res.translateResult.indexOf(VOICES[i].word) != -1) {
                                stage.navigate(VOICES[i].page, 'right');
                                return;
                            }
                        }
                    }
                });
            }
        });

        setTimeout(function () {
            wx.startRecord();

            setTimeout(function () {
                wx.stopRecord({
                    success: function () {

                    }
                });
            }, 1000);
        }, 0);
    }
})();
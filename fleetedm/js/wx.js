var wxShare = {
    title: '快来参加DSFL安全节能驾驶先锋节油大比拼吧',  // 分享标题
    desc: '',   // 分享描述
    link: 'http://dsflgame.ser2.ford001.com/',   // 分享链接
    imgUrl: 'http://dsflgame.ser2.ford001.com/img/wxlogo.jpg',  // 分享图标
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

var jsapiTicketUrl = 'http://wxauth.app.bolaa.net/jsticket.ashx?serv_name=dsflgame&url=' + encodeURIComponent(window.location.href);

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

        //setShareData();

        wx.hideAllNonBaseMenuItem();
        //wx.showOptionMenu();
    }
})();
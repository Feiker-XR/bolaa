var wxShare = {
    title: '长安福特销售部批售团队给您拜年啦！',  // 分享标题
    desc: '恭祝各位大客户朋友羊年吉祥，感谢你们的一路相伴！',   // 分享描述
    link: 'http://fleet.ser2.ford001.com/',   // 分享链接
    imgUrl: 'http://fleet.ser2.ford001.com/img/wxlogo.jpg',  // 分享图标
    type: '',   // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function (res) {
        // 用户确认分享后执行的回调函数
        $('.sharetip').hide();
    },
    cancel: function (res) {
        // 用户取消分享后执行的回调函数
    }
};

var onWXReady = function () {
    setShareData();

    wx.showOptionMenu();

    //wx.startRecord();

    //setTimeout(function () {
    //    wx.stopRecord({
    //        success: function () {
                
    //        }
    //    });

        
    //}, 1000);
};

function setShareData() {
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

var jsapiTicketUrl = 'http://wxauth.app.bolaa.net/jsticket.ashx?serv_name=mondeocard';

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
        var ticketUrl = jsapiTicketUrl + '&url=' + encodeURIComponent(location.href);


        var callback_hash = new Date().valueOf();
        var callback = 'jsonp_' + callback_hash;
        var ticketPars = 'callback=' + callback + '&_=' + callback_hash;
        if (ticketUrl.indexOf('?') == -1) {
            ticketUrl += '?' + ticketPars;
        }
        else {
            ticketUrl += '&' + ticketPars;
        }
        window[callback] = function (config) {
            delete window[callback];
            s.parentNode.removeChild(s);

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
        var s = document.createElement('script');
        s.src = ticketUrl;
        var s1 = document.getElementsByTagName('script')[0];
        s1.parentNode.appendChild(s);
    };
})();


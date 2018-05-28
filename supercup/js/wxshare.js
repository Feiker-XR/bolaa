var wxShare = {
    title: '见证巅峰战，答题赢豪礼！【长安福特2015超级杯】',  // 分享标题
    desc: '长安福特2015超级杯，点燃激情，见证王中王诞生。即刻参与竞猜，赢取豪礼，够胆你就来！',   // 分享描述
    link: 'http://supercup.ser2.ford001.com',   // 分享链接
    imgUrl: 'http://supercup.ser2.ford001.com/images/shareimg.jpg',  // 分享图标
    type: '',   // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function (res) {
        //alert(JSON.stringify(wxShare));
    },
    cancel: function (res) {
        // 用户取消分享后执行的回调函数
    },
};

var jsapiTicketUrl = 'http://wxauth.app.bolaa.net/jsticket.ashx?serv_name=escort';

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
        var ticketUrl = jsapiTicketUrl;

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
    window.flsWxInit = function () {
        wxShare.title = "家乐福福禄寿约到家";
        wxShare.desc = "过年不吃饺子就任性，猜猜我把年货都藏哪里了？";
        wxShare.link = "http://carrefourchatter.gz3.e2capp.com/index2.aspx";
        wxShare.imgUrl = "http://carrefourchatter.gz3.e2capp.com/images2/flsShareImg.jpg";
    }
    window.onWXReady = function () {
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

        wx.showOptionMenu();
    }
})();



window.WXParameter = {
    title: "冲刺Focus 1",
    desc: "暴露你年龄的童年游戏，敢玩吗？70后80后们，和新福克斯一起冲刺Focus1，找回儿时简单的乐趣！",
    defdesc: "暴露你年龄的童年游戏，敢玩吗？70后80后们，和新福克斯一起冲刺Focus1，找回儿时简单的乐趣！",
    link: "http://ford-focus1.ser2.ford001.com/",
    imgurl: "http://ford-focus1.ser2.ford001.com/Content/images/share.jpg"
};

function wxConfig() {
    //alert(location.href.split('#')[0]);
    $.ajax({
        url: "/Home/GetJSAuthorize",
        data: { url: location.href.split('#')[0] },
        type: "POST",
        async: false,
        success: function (msg) {            
            initWxconfig(msg.Data);
        }
    });
}

function initWxconfig(config) {

    wx.config({
        debug: false,
        appId: config.appid,
        timestamp: config.timespan,
        nonceStr: config.noncestr,
        signature: config.signature,
        jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo'
        ]
    });
}


wx.ready(function () {
    WXParameter.desc = WXParameter.defdesc;
    share();
});


function share() {
    //分享到朋友圈
    wx.onMenuShareTimeline({
        title: WXParameter.desc,
        link: WXParameter.link,
        imgUrl: WXParameter.imgurl,
        success: function () { },
        cancel: function () { }
    });

    //分享给朋友
    wx.onMenuShareAppMessage({
        title: WXParameter.title,
        desc: WXParameter.desc,
        link: WXParameter.link,
        imgUrl: WXParameter.imgurl,
        type: '',
        dataUrl: '',
        success: function () { },
        cancel: function () { }
    });

    //分享到QQ
    wx.onMenuShareQQ({
        title: WXParameter.title,
        desc: WXParameter.desc,
        link: WXParameter.link,
        imgUrl: WXParameter.imgurl,
        success: function () { },
        cancel: function () { }
    });

    //分享到腾讯微博
    wx.onMenuShareWeibo({
        title: WXParameter.title,
        desc: WXParameter.desc,
        link: WXParameter.link,
        imgUrl: WXParameter.imgurl,
        success: function () { },
        cancel: function () { }
    });
}





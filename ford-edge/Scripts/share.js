var timestamp;
var nonceStr;
var signature;
var imgUrl = "http://" + window.location.host + '/Content/images/share.jpg';
var shareTitle = '锐意前行 界由我定';
var shareDesc = '在生活中，每个人都扮演着多样的角色。而真正的掌控者，则总能掌控全局，掌控精彩生活。';
var shareLink = window.location.href;

///分享到朋友圈
function shareTimeline() {
    wx.onMenuShareTimeline({
        title: shareTitle,   // 分享标题
        link: shareLink,     // 分享链接
        imgUrl: imgUrl,      // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}
///分享给朋友
function shareAppMessage() {
    wx.onMenuShareAppMessage({
        title: shareTitle,     // 分享标题
        desc: shareDesc,       // 分享描述
        link: shareLink,       // 分享链接
        imgUrl: imgUrl,        // 分享图标
        type: '',              // 分享类型,music、video或link，不填默认为link
        dataUrl: '',           // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });
}
///分享到QQ
function shareQQ() {
    wx.onMenuShareQQ({
        title: shareTitle, // 分享标题
        desc: shareDesc,   // 分享描述
        link: shareLink,   // 分享链接
        imgUrl: imgUrl,    // 分享图标
        success: function () {
            // 用户确认分享后执行的回调函数
        },
        cancel: function () {
            // 用户取消分享后执行的回调函数
        }
    });

}
///分享到腾讯微博
function shareWeibo() {
    wx.onMenuShareWeibo({
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
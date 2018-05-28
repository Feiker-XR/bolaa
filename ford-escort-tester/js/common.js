// JavaScript Document
function showMap(element, name, lat, lng)
{
	var map = new BMap.Map(element);
	var point = new BMap.Point(lng, lat);
	var marker = new BMap.Marker(point);
	map.centerAndZoom(point, 17);
	//map.addOverlay(marker);
	
	var opts = {      
		width : 100,     // 信息窗口宽度      
		height: 50,     // 信息窗口高度      
		title : ''  // 信息窗口标题     
	}      
	var infoWindow = new BMap.InfoWindow(name, opts);  // 创建信息窗口对象      
	map.openInfoWindow(infoWindow, point);
}

var dataForWeixin = {
    appId: "",
    img: new URI('brands/' + wxInfo.code + '.jpg').toString(),
    url: window.location.href,
    title: document.title,
    desc: "",
    fakeid: "",
    width: 120,
    height: 120
};

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "appid": dataForWeixin.appId,
            "img_url": dataForWeixin.img,
            "img_width": dataForWeixin.width,
            "img_height": dataForWeixin.height,
            "link": dataForWeixin.url,
            "desc": dataForWeixin.desc,
            "title": dataForWeixin.title
        }, function (res) { });
    });
    // 分享到朋友圈;
    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": dataForWeixin.img,
            "img_width": dataForWeixin.width,
            "img_height": dataForWeixin.height,
            "link": dataForWeixin.url,
            "desc": dataForWeixin.desc,
            "title": dataForWeixin.title
        }, function (res) { });
    });
    // 分享到微博;
    WeixinJSBridge.on('menu:share:weibo', function (argv) {
        WeixinJSBridge.invoke('shareWeibo', {
            "content": dataForWeixin.title + ' ' + dataForWeixin.url,
            "url": dataForWeixin.url,
            "img": dataForWeixin.img
        }, function (res) { });
    });
    // 分享到Facebook
    WeixinJSBridge.on('menu:share:facebook', function (argv) {
        WeixinJSBridge.invoke('shareFB', {
            "img_url": dataForWeixin.img,
            "img_width": dataForWeixin.width,
            "img_height": dataForWeixin.height,
            "link": dataForWeixin.url,
            "desc": dataForWeixin.desc,
            "title": dataForWeixin.title
        }, function (res) { });
    });
    WeixinJSBridge.call('showOptionMenu');
});
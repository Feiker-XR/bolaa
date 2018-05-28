//保存cookie
function SetCookie(name, value) {
    var Days = 30; //此 cookie 将被保存 30 天
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//获取cookie
function getCookie(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null)
        return unescape(arr[2]);
    return null;
}

function R(url, data, callfun) {
    $.ajax({ url: url, data: data, type: "post", success: callfun });
}


var ImageLoader = {
    results: {},
    load: function (imgs, callback) {
        if ($.type(imgs) != 'array') {
            imgs = [imgs];
        }

        var obj = {
            images: [],
            callback: callback
        };

        for (var i = 0; i < imgs.length; i++) {
            var img = imgs[i];

            var imgEl = new Image();
            imgEl.onload = (function (evt) {
                this.images.splice(this.images.indexOf(evt.target), 1);
                if (this.images.length == 0) {
                    if (this.callback) {
                        this.callback();
                    }
                }

            }).bind(obj);

            ImageLoader.results[img.name] = imgEl;

            obj.images.push(imgEl);
        }

        for (var i = 0; i < imgs.length; i++) {
  console.log(i + ":" + imgs[i].url);
            obj.images[i].src = imgs[i].url;
        }
    }
};
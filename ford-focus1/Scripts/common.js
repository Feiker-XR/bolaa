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
            //  console.log(i + ":" + imgs[i].url);
            obj.images[i].src = imgs[i].url;
        }
    }
};
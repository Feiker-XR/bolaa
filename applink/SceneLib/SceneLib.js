if (Function.prototype.bind == undefined) {
    Function.prototype.bind = function () {
        var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
        return function () {
            return fn.apply(object,
                args.concat(Array.prototype.slice.call(arguments)));
        };
    };
}

if(Array.prototype.indexOf == undefined) {
	Array.prototype.indexOf = function(item) {
		for(var i = 0; i < this.length; i++) {
			if(this[i] == item) {
				return i;
			}
		}
		return -1;
	}
}

var SL = {};

/**
 * 合并多个对象
 * @method merge
 * @param obj1 {Object} 要合并到的对象
 * @param [...objects] {Object} 提供属性的其他对象
 */
SL.merge = function (obj1) {
    if (obj1 == undefined || obj1 == null) {
        obj1 = {};
    }

    for (var i = 1; i < arguments.length; i++) {
        var o = arguments[i];
        if (o == undefined || o == null) continue;
        for (var n in o) {
            var v = o[n];
            if (v == undefined) continue;
            obj1[n] = o[n];
        }
    }

    return obj1;
};

/**
 * 定义绘制下一帧的方法
 * @method requestAnimationFrame
 * @param {Function} func 要在绘制下一帧的方法
 * @static
 */
SL.requestAnimationFrame = function (func) {
    var f = (window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (handler) {
            setTimeout(handler, 1000 / 60)
        }).bind(window);
    f(func);
};

/**
 * 加载图片
 * @method loadImage
 * @param {Array} list 要加载的图片列表
 * 列表元素格式为：{name: '名称', url: '图片地址'}
 * @param {Function} onComplete 当加载完成时调用的回调方法。会向方法传递一个参数，参数对象中包含所有已加载的图片
 * @param {Function} onProgress 当加载进度变更时调用的回调方法。会向方法传递一个参数，参数为当前加载完成的百分比
 * @static
 */
SL.loadImage = function (list, onComplete, onProgress) {
    var loader = {
        onComplete: onComplete,
        onProgress: onProgress,
        isComplete: false,
        images: []
    };

    for (var i = 0; i < list.length; i++) {
        var img = new Image();
        img.name = list[i].name;
        $(img).on('error', function (evt) {
            var src = evt.target.src;
            pat = /[&]?_loadmark=[0-9]+/i;
            src = src.replace(pat, '');
            if (src.indexOf('?') != -1) {
                src += '?';
            }
            else {
                src += '&';
            }
            src += '_loadmark=' + new Date().valueOf();
            evt.target.src = src;
        });
        img.src = list[i].url;
        loader.images.push(img);
    }

    SL.checkImage(loader.images, (function () {
        if (this.onProgress) {
            this.onProgress(100);
        }

        var imgs = {};

        for (var i = 0; i < this.images.length; i++) {
            imgs[this.images[i].name] = this.images[i];
        }

        if (!this.isComplete) {
            this.isComplete = true;
            if (this.onComplete) {
                this.onComplete(imgs);
            }
        }
    }).bind(loader), (function (p) {
        if (this.onProgress) {
            this.onProgress(p);
        }
    }).bind(loader));
};

SL.loadScript = function (list, onComplete, onProgress) {
    var loader = {
        onComplete: onComplete,
        onProgress: onProgress,
        isComplete: false,
        list: []
    };

    var check = function (items) {
        var p = 0;
        for (var i = 0; i < items.length; i++) {
            if (items[i].complete === true) {
                p++;
            }
        }
        return p / items.length;
    };

    for (var i = 0; i < list.length; i++) {
        var script = document.createElement('script');
        script.addEventListener('load', (function (evt) {
            evt.target.complete = true;
            
            var p = check(this.list);

            if (this.onProgress) {
                this.onProgress(p * 100);
            }

            if (p == 1) {
                if (!this.isComplete) {
                    this.isComplete = true;
                    if(this.onComplete)
                    {
                        this.onComplete();
                    }
                }
            }

        }).bind(loader));
        script.src = list[i];
        loader.list.push(script);
    }

    var sibling = document.getElementsByTagName('script')[0];
    for (var i = 0; i < loader.list.length; i++) {
        sibling.parentNode.insertBefore(loader.list[i], sibling);
    }
};

/**
 * 检查图片是否已加载完成
 * @method checkImage
 * @param {Array} list 要检查的图片元素数组
 * @param {Function} onComplete 当加载完成时调用的回调方法
 * @param {Function} onProgress 当加载进度变更时调用的回调方法。会向方法传递一个参数，参数为当前加载完成的百分比
 * @static
*/
SL.checkImage = function (list, onComplete, onProgress) {
    var loader = {
        onComplete: onComplete,
        onProgress: onProgress,
        isComplete: false,
        list: list
    };

    var check = function (images) {
        var p = 0;
        for (var i = 0; i < images.length; i++) {
            if (images[i].complete) {
                p++;
            }
        }
        return p / images.length;
    };

    if (check(list) == 1) {
        this.isComplete = true;
        if (onComplete) {
            onComplete();
        }
    }
    else {
        for (var i = 0; i < list.length; i++) {
            $(list[i]).on('load', (function () {
                var p = check(this.list);
                if (p == 1 && !this.isComplete) {
                    if (!this.isComplete) {
                        this.isComplete = true;
                        if (this.onComplete) {
                            this.onComplete();
                        }
                    }

                }
                else {
                    if (this.onProgress) {
                        this.onProgress(p * 100);
                    }
                }
            }).bind(loader));
        }
    }
};

SL.resourceReady = function (list, onComplete, onProgress) {
    var loader = {
        onComplete: onComplete,
        onProgress: onProgress,
        domImageComplete: 0,
        imageComplete: 0,
        scriptComplete: 0,
        isComplete: false,
        images: {},
        check: function () {
            if (this.domImageComplete + this.imageComplete + this.scriptComplete == 300) {
                if (!this.isComplete) {
                    this.isComplete = true;
                    if (this.onComplete) {
                        this.onComplete(this.images);
                    }
                }
            }
        }
    };

    var images = [];
    var scripts = [];
    var domImages = document.getElementsByTagName('img');

    for (var i = 0; i < list.length; i++) {
        if (list[i].type == 'script') {
            scripts.push(list[i].url);
        }
        else {
            images.push(list[i]);
        }
    }
    if (images.length == 0) {
        loader.imageComplete = 100;
    }
    if (scripts.length == 0) {
        loader.scriptComplete = 100;
    }
    if (domImages.length == 0) {
        loader.domImageComplete = 100;
    }



    SL.loadImage(images, (function (imgs) {
        this.images = imgs;
        this.imageComplete = 100;
        this.check();
    }).bind(loader), (function (p) {
        this.imageComplete = p;
        if (this.onProgress) {
            this.onProgress((this.domImageComplete + this.imageComplete + this.scriptComplete) / 3);
        }
    }).bind(loader));

    SL.loadScript(scripts, (function (imgs) {
        this.scriptComplete = 100;
        this.check();
    }).bind(loader), (function (p) {
        this.scriptComplete = p;
        if (this.onProgress) {
            this.onProgress((this.domImageComplete + this.imageComplete + this.scriptComplete) / 3);
        }
    }).bind(loader));

    SL.checkImage(domImages, (function (imgs) {
        this.domImageComplete = 100;
        this.check();
    }).bind(loader), (function (p) {
        this.domImageComplete = p;
        if (this.onProgress) {
            this.onProgress((this.domImageComplete + this.imageComplete + this.scriptComplete) / 3);
        }
    }).bind(loader));
};

SL.config = {
	zoomType: 'contain',
	zoomWidth: 640,
	zoomHeight: 1136,
	zoomAlign: 'center'
};

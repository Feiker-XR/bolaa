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

if (Object.create == undefined) {
    Object.create = function (obj) {
        var result = {};
        for (var n in obj) {
            result[n] = obj;
        }
        return result;
    };
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

/**
 * 用于管理已绑定的TransitionEnd事件的对象
 * @class TransitionManager
 */
SL.TransitionManager = new (function(){
	
	this.events = [];
	
	this.addEventListener = function(element, propertyName, listener) {
		if(!(element instanceof Element)) {
			return;
		}
		
		if(typeof(listener) != 'function') {
			return;
		}
		
		this.removeEventListener(element, propertyName, listener);

		this.events.push({
			element: element,
			listener: listener,
			propertyName: propertyName
		});
	};
	
	this.removeEventListener = function(element, propertyName, listener) {
		for(var i = 0; i < this.events.length; i++) {
			if(this.events[i].element == element && this.events[i].listener == listener && this.events[i].propertyName == propertyName) {
				this.events.splice(i, 1);
				return;
			}
		}
	};
	
	$(window).on('transitionend', (function (evt) {
	    evt = evt.originalEvent;
		for(var i = 0; i < this.events.length; i++) {
		    if (this.events[i].element == evt.target && (this.events[i].propertyName == evt.propertyName || this.events[i].propertyName == '')) {
				this.events[i].listener(evt);
			}
		}
	}).bind(this));

	$(window).on('webkitTransitionEnd', (function (evt) {
	    evt = evt.originalEvent;
	    for (var i = 0; i < this.events.length; i++) {
	        if (this.events[i].element == evt.target && (this.events[i].propertyName == evt.propertyName || this.events[i].propertyName == '')) {
	            this.events[i].listener(evt);
	        }
	    }
	}).bind(this));
})();

SL.animation = function (element) {
	return new (function(element){
		
		this.element = element;
		
		this.events = {};
		
		this.on = function(type, listener) {
			this.unbind(type, listener);
			this.element.addEventListener(this.getEventName(type), listener);
			return this;
		};
		
		this.unbind = function(type, listener) {
			this.element.removeEventListener(this.getEventName(type), listener);
			return this;	
		};
		
		this.start = function(listener) {
			return this.on('start', listener);
		};
		
		this.end = function(listener) {
			return this.on('end', listener);
		};
		
		this.iteration = function(listener) {
			return this.on('iteration', listener);
		};
		
		this.getEventName = function(type) {
			if(typeof(window.WebKitAnimationEvent) != 'undefined') {
				switch(type) {
					case 'start':
						return 'webkitAnimationStart';
						break;
					case 'end':
						return 'webkitAnimationEnd';
						break;
					case 'iteration':
						return 'webkitAnimationIteration';
						break;
				}
			}
			else {
				switch(type) {
					case 'start':
						return 'animationstart';
						break;
					case 'end':
						return 'animationend';
						break;
					case 'iteration':
						return 'animationiiteration';
						break;
				}
			}
			return '';
		};
		
	})(element);
};

/**
 * 拥有事件触发能力的对象基类
 * @class EventDispatcher
 */
SL.EventDispatcher = function () {
    this.events = {};

    /**
     * 添加一个事件处理方法
     * @method addEventListener
     * @param type {String} 事件类型
     * @param listener {Function} 事件处理方法
     */
    this.addEventListener = function (type, listener) {
        if (this.events[type] == undefined) {
            this.events[type] = [];
        }
        this.removeEventListener(type, listener);
        this.events[type].push(listener);
    };

    /**
     * 移除一个事件处理方法
     * @method removeEventListener
     * @param type {String}事件类型
     * @param listener {Function} 事件处理方法
     */
    this.removeEventListener = function (type, listener) {
        if (this.events[type] == undefined) {
            return;
        }
        var index = -1;
        if ((index = this.events[type].indexOf(listener)) != -1) {
            this.events[type].splice(index, 1);
        }
    };

    /**
     * 触发一个事件
     * @method dispatchEvent
     * @param event {Object} 事件参数
     */
    this.dispatchEvent = function (event) {
        if (this.events[event.type] == undefined) {
            return;
        }
        for (var i = 0; i < this.events[event.type].length; i++) {
            this.events[event.type][i].call(this, event);
        }
    };
    
    this.bindEventByAttr = function(element) {
    	for(var i = 0 ; i < element.attributes.length; i++) {
    		var name = element.attributes[i].name;
    		var value = $.trim(element.attributes[i].value);
    		
    		if(name.substr(0, 5) == 'sl-on' && value != '') {
    			this.addEventListener(name.substr(5), (function(code){
    				return (function(){
    					eval(code);
    				}).bind(this);
    			}).call(this, value));
    		}
    	}
    };
};

SL.Navigator = function () {
	SL.EventDispatcher.call(this);
};

SL.Navigator.prototype.navigate = function(stage, page, lastPage, options) {
	var opt = {
		stage: stage,
		page: page,
		lastPage: lastPage,
		navigator: this,
		options: options
	};
	
	this.onNavigate(opt);
};

SL.Navigator.prototype.onNavigate = function(opt) {
	
};

SL.Navigator.prototype.onNavigateComplete = function(opt) {
	this.dispatchEvent({
		type: 'complete',
		stage: opt.stage,
		page: opt.page,
		lastPage: opt.lastPage,
		navigator: opt.navigator,
		options: opt.options
	});
};

SL.Page = function (element, stage) {
	SL.EventDispatcher.call(this);
	
	this.element = element;
	
	this.stage = stage;
	
	this.id = element.id;
	
	this.zoomType = this.element.attributes['sl-zoom-type'] ? this.element.attributes['sl-zoom-type'].value : this.stage.zoomType;
	this.zoomWidth = this.element.attributes['sl-zoom-width'] ? parseInt(this.element.attributes['sl-zoom-width'].value) : this.stage.zoomWidth;
	this.zoomHeight = this.element.attributes['sl-zoom-height'] ? parseInt(this.element.attributes['sl-zoom-height'].value) : this.stage.zoomHeight;
	this.zoomAlign = this.element.attributes['sl-zoom-align'] ? this.element.attributes['sl-zoom-align'].value : this.stage.zoomAlign;
	
	var contents = $(this.element).find('.sl-content');
	this.contents = [];
	for(var i = 0; i < contents.length; i++) {
		this.contents.push(new SL.Content(contents[i], this));
	}
	
	this.bindEventByAttr(this.element);
};

//Object.defineProperty(SL.Page.prototype, 'id', {
//	get: function() {
//		return $(this.element).attr('id');
//	},
//	set: function(id) {
//		$(this.element).attr('id', id);
//	}
//});

SL.Page.prototype.active = function() {
	this.onActive();
	this.dispatchEvent({
		type: 'active'
	});
};

SL.Page.prototype.onActive = function() {
	for(var i = 0; i < this.contents.length; i++) {
		this.contents[i].active();
	}
};

SL.Page.prototype.deactive = function() {
	this.onDeactive();
	this.dispatchEvent({
		type: 'deactive'
	});
};

SL.Page.prototype.onDeactive = function() {
	for(var i = 0; i < this.contents.length; i++) {
		this.contents[i].deactive();
	}
};

SL.SlideNavigator = function () {
	SL.Navigator.call(this);
};

SL.SlideNavigator.prototype = Object.create(SL.Navigator.prototype);
SL.SlideNavigator.prototype.constructor = SL.SlideNavigator;

SL.SlideNavigator.prototype.onNavigate = function(opt) {
	switch(opt.options) {
		case 'left':
			$(opt.page.element).css({
				left: (opt.stage.offsetX - 1) * 100 + '%',
				top: (opt.stage.offsetY) * 100 + '%'
			});
			opt.stage.offsetX--;
			break;
		case 'right':
			$(opt.page.element).css({
				left: (opt.stage.offsetX + 1) * 100 + '%',
				top: (opt.stage.offsetY) * 100 + '%'
			});
			opt.stage.offsetX++;
			break;
		case 'top':
			$(opt.page.element).css({
				left: (opt.stage.offsetX) * 100 + '%',
				top: (opt.stage.offsetY - 1) * 100 + '%'
			});
			opt.stage.offsetY--;
			break;
		case 'bottom':
			$(opt.page.element).css({
				left: (opt.stage.offsetX) * 100 + '%',
				top: (opt.stage.offsetY + 1) * 100 + '%'
			});
			opt.stage.offsetY++;
			break;
	}
	
	opt.runned = false;

	var listener = (function(){
	    SL.TransitionManager.removeEventListener(this.stage.container, '', listener);
	    if (this.runned) return;
	    this.runned = true;
		this.navigator.onNavigateComplete(this);
	}).bind(opt);
	
	SL.TransitionManager.addEventListener(opt.stage.container, '', listener);
	
	//alert('navigate1');

	$(opt.stage.container).css({
	    transform: 'translate(' + (0 - opt.stage.offsetX * 100) + '%,' + (0 - opt.stage.offsetY * 100) + '%)',
	    webkitTransform: 'translate(' + (0 - opt.stage.offsetX * 100) + '%,' + (0 - opt.stage.offsetY * 100) + '%)'
	});
};

SL.Stage = function (element) {

	SL.EventDispatcher.call(this);
	
	this.element = element;
	
	this.container = $(this.element).find('.sl-container')[0];
	$(this.container).css({
	    transform: 'translate(0%, 0%)',
        webkitTransform: 'translate(0%, 0%)'
	});
	
	$(this.element).css({
		width: $(window).width() + 'px',
		height: $(window).height() + 'px'
	});
	
	this.zoomType = this.element.attributes['sl-zoom-type'] ? this.element.attributes['sl-zoom-type'].value : SL.config.zoomType;
	this.zoomWidth = this.element.attributes['sl-zoom-width'] ? parseInt(this.element.attributes['sl-zoom-width'].value) : SL.config.zoomWidth;
	this.zoomHeight = this.element.attributes['sl-zoom-height'] ? parseInt(this.element.attributes['sl-zoom-height'].value) : SL.config.zoomHeight;
	this.zoomAlign = this.element.attributes['sl-zoom-align'] ? this.element.attributes['sl-zoom-align'].value : SL.config.zoomAlign;
	
	this.pages = [];
	
	this.currentPage = null;
	
	this.offsetX = 0;
	this.offsetY = 0;
	
	this.navigator = new SL.SlideNavigator(this);
	
	this.bindEventByAttr(this.element);
	
	$(this.container).children('.sl-page').each((function(index, el){
		this.addPage(el);
	}).bind(this));
	
	this.navigating = false;
};

SL.Stage.prototype.addPage = function(page) {
	if(page instanceof Element) {
		return this.addPage(new SL.Page(page, this));
	}
	page.stage = this;
	if(this.pages.indexOf(page) == -1) {
		this.pages.push(page);
	}
	$(page.element).css({
		left: (this.offsetX - 1) * 100 + '%',
		top: (this.offsetY - 1) * 100 + '%'
	});
	return this;
};

SL.Stage.prototype.getPageById = function(id) {
	for(var i = 0; i < this.pages.length; i++) {
		if(this.pages[i].id == id) {
			return this.pages[i];
		}
	}
	return null;
};

SL.Stage.prototype.showPage = function(page) {
	if(typeof(page) == 'string') {
		return this.showPage(this.getPageById(page));
	}
	
	if(page == null) return this;
	
	if(page == this.currentPage) return this;
	
	if(page.stage != this) return this;
	
	var lastPage = this.currentPage;
	
	for(var i = 0; i < this.pages.length; i++) {
		if(this.pages[i] != page) {
			$(this.pages[i].element).css({
				left: (this.offsetX - 1) * 100 + '%',
				top: (this.offsetY - 1) * 100 + '%'
			});
		}
	}
	
	$(page.element).css({
		left: this.offsetX * 100 + '%',
		top: this.offsetY * 100 + '%'
	});
	
	this.currentPage = page;
	if(lastPage != null) {
		lastPage.deactive();
	}
	page.active();
	
	this.onPageChanged();
	
	return this;
};

SL.Stage.prototype.navigate = function(page, options, navigator) {
	if(typeof(page) == 'string') {
		var args = [];
		args.push(this.getPageById(page));
		for(var i = 1; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		return this.navigate.apply(this, args);
	}
	
	if(this.currentPage == null) {
		return this.showPage(page);
	}
	
	if(page == null) return this;
	
	if(page == this.currentPage) return this;
	
	if(page.stage != this) return this;
	
	if (this.navigating) return;

	this.navigating = true;

	this.currentPage.deactive();
	
	if(navigator == undefined) {
		navigator = this.navigator;
	}
	
	navigator.addEventListener('complete', function(evt){
		evt.navigator.removeEventListener('complete', arguments.callee);
		for (var i = 0; i < evt.stage.pages.length; i++) {
			if(evt.stage.pages[i] != evt.page) {
				$(evt.stage.pages[i].element).css({
					left: (evt.stage.offsetX - 1) * 100 + '%',
					top: (evt.stage.offsetY - 1) * 100 + '%'
				});
			}
		}
		
		evt.stage.onPageNavigated(evt.page);
	});
    //alert(page.id);

	this.onNavigateStart();

	navigator.navigate(this, page, this.currentPage, options);
};

SL.Stage.prototype.onPageNavigated = function (page) {
    this.navigating = false;
	this.currentPage = page;
	page.active();
	this.dispatchEvent({
		type: 'switch',
		page: page
	});
	this.onPageChanged();
	
};

SL.Stage.prototype.onPageChanged = function() {
	this.dispatchEvent({
		type: 'change'
	});
};

SL.Stage.prototype.onNavigateStart = function () {
    this.dispatchEvent({
        type: 'navigatestart'
    });
};

SL.Content = function (element, page) {
	SL.EventDispatcher.call(this);
	
	this.element = element;
	
	this.page = page;
	
	this.zoomType = this.element.attributes['sl-zoom-type'] ? this.element.attributes['sl-zoom-type'].value : this.page.zoomType;
	this.zoomWidth = this.element.attributes['sl-zoom-width'] ? parseInt(this.element.attributes['sl-zoom-width'].value) : this.page.zoomWidth;
	this.zoomHeight = this.element.attributes['sl-zoom-height'] ? parseInt(this.element.attributes['sl-zoom-height'].value) : this.page.zoomHeight;
	this.zoomAlign = this.element.attributes['sl-zoom-align'] ? this.element.attributes['sl-zoom-align'].value : this.page.zoomAlign;
	
	var width = $(window).width();
	var height = $(window).height();
	
	this.zoomScale = 1;
	this.offsetX = 0;
	this.offsetY = 0;
	
	switch(this.zoomType) {
		case 'width':
			this.zoomScale = width / this.zoomWidth;
			break;
		case 'height':
			this.zoomScale = height / this.zoomHeight;
			break;
		case 'cover':
			this.zoomScale = Math.max(width / this.zoomWidth, height / this.zoomHeight);
			break;
		default:
			this.zoomScale = Math.min(width / this.zoomWidth, height / this.zoomHeight);
			break;
	}
	
	switch(this.zoomAlign) {
		case 'topleft':
			this.offsetX = 0;
			this.offsetY = 0;
			break;
		case 'top':
			this.offsetX = (width - this.zoomWidth * this.zoomScale) / 2;
			this.offsetY = 0;
			break;
		case 'topright':
			this.offsetX = (width - this.zoomWidth * this.zoomScale);
			this.offsetY = 0;
			break;
		case 'left':
			this.offsetX = 0;
			this.offsetY = (height - this.zoomHeight * this.zoomScale) / 2;
			break;
		case 'right':
			this.offsetX = (width - this.zoomWidth * this.zoomScale);
			this.offsetY = (height - this.zoomHeight * this.zoomScale) / 2;
			break;
		case 'bottomleft':
			this.offsetX = 0;
			this.offsetY = (height - this.zoomHeight * this.zoomScale);
			break;
		case 'bottom':
			this.offsetX = (width - this.zoomWidth * this.zoomScale) / 2;
			this.offsetY = (height - this.zoomHeight * this.zoomScale);
			break;
		case 'bottomright':
			this.offsetX = (width - this.zoomWidth * this.zoomScale);
			this.offsetY = (height - this.zoomHeight * this.zoomScale);
			break;
		default:
			this.offsetX = (width - this.zoomWidth * this.zoomScale) / 2;
			this.offsetY = (height - this.zoomHeight * this.zoomScale) / 2;
			break;
	}
	
	$(this.element).css({
		width: this.zoomWidth + 'px',
		height: this.zoomHeight + 'px',
		left: this.offsetX + 'px',
		top: this.offsetY + 'px',
		transform: 'scale(' + this.zoomScale + ', ' + this.zoomScale + ')',
		webkitTransform: 'scale(' + this.zoomScale + ', ' + this.zoomScale + ')'
	});
	
	this.bindEventByAttr(this.element);
};

SL.Content.prototype.active = function() {
	this.onActive();
	this.dispatchEvent({
		type: 'active'
	});
};

SL.Content.prototype.onActive = function() {
	
};

SL.Content.prototype.deactive = function() {
	this.onDeactive();
	this.dispatchEvent({
		type: 'deactive'
	});
};

SL.Content.prototype.onDeactive = function() {
	
};

SL.CustomNavigator = function (obj) {
	SL.Navigator.call(this);
	
	this._doNavigate = obj.navigate;
};

SL.CustomNavigator.prototype = Object.create(SL.CustomNavigator.prototype);
SL.CustomNavigator.prototype.constructor = SL.CustomNavigator;

SL.CustomNavigator.prototype.onNavigate = function(opt) {
	this._doNavigate.call(this, opt);
};

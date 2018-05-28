/**
 * 全局对象基类
 * @class 全局方法
 */
var SL = {

    /**
     * 合并多个对象
     * @method merge
     * @param obj {Object} 要合并到的对象
     * @param [...objects] {Object} 提供属性的其他对象
     */
    merge: function (obj) {
        if (obj == undefined) {
            obj = {};
        }
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] == undefined) continue;
            for (var name in arguments[i]) {
                if (arguments[i][name] == undefined) continue;
                obj[name] = arguments[i][name];
            }
        }
        return obj;
    },

    /**
     * 请求生成下一帧画面所需要调用的方法
     * @static
     * @method requestAnimationFrame
     * @param func {function} 要调用的方法
     */
    requestAnimationFrame: function (func) {
        var f = (window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function (handler) {
            setTimeout(handler, 1000 / 60)
        }).bind(window);
        f(func);
    },
    
    getValueByBrowser: function(obj, property) {
    	var prefixs = ['webkit', 'moz', 'o', 'ms'];
    	for(var i = 0; i < prefixs.length; i++) {
    		var pname = prefixs[i] + property.substr(0, 1).toUpperCase() + property.substr(1);
    		if(obj[pname] !== undefined) {
    			return obj[pname];
    		}
    	}
    	return obj[property];
    },
    
    setValueByBrowser: function(obj, property, value) {
    	var prefixs = ['webkit', 'moz', 'o', 'ms'];
    	for(var i = 0; i < prefixs.length; i++) {
    		var pname = prefixs[i] + property.substr(0, 1).toUpperCase() + property.substr(1);
    		if(obj[pname] !== undefined) {
    			obj[pname] = value;
    			return;
    		}
    	}
    	obj[property] = value;
    },

    bindTransitionEnd: function (element, propertyName, func) {
        var callback = function (evt) {
            if (evt.target == element && evt.propertyName == propertyName) {
                func();
            }
        };
        if (window.onwebkttransitionend != undefined) {
            window.addEventListener('webkitTransitionEnd', callback);
        }
        else {
            window.addEventListener('transitionend', callback);
        }
    },
    
    /**
     * 获取一个唯一ID
     * @method uniqid
     * @static
     * @returns {string} 唯一ID
     */
    uniqid: function() {
        return (SL._uniqid++).toString();
    },
    
    _uniqid: 1,

    /**
     * 加载图片
     * @method loadImage
     * @param list {Array} 要加载的图片列表
     * 列表元素格式为：{name: '名称', url: '图片地址'}
     * @param onComplete {Function} 当加载完成时调用的回调方法
     * @param onProgress {Function} 当加载进度变更时调用的回调方法
     * @static
     */
    loadImage: function (list, onComplete, onProgress) {
        var loader = {
            onComplete: onComplete,
            onProgress: onProgress,
            isComplete: false
        };

        if (typeof (list) == 'object' && list.constructor == Array) {
            //加载一个数组
            loader.type = 'list';
            loader.images = [];
            for (var i = 0; i < list.length; i++) {
                var item = {
                    name: list[i].name,
                    image: new Image()
                };
                item.image.addEventListener('load', function () {
                    var complete = 0;
                    for (var i = 0; i < loader.images.length; i++) {
                        if (loader.images[i].image.complete) {
                            complete++;
                        }
                    }

                    if (loader.onProgress) {
                        loader.onProgress(Math.floor(complete * 100 / loader.images.length));
                    }
                    if (complete >= loader.images.length) {
                        if (loader.isComplete) return;
                        loader.isComplete = true;
                        var result = {};

                        for (var i = 0; i < loader.images.length; i++) {
                            result[loader.images[i].name] = loader.images[i].image;
                        }
                        if (loader.onComplete) {
                            loader.onComplete(result);
                            if (loader.onProgress) {
                                delete loader.onProgress;
                            }
                            delete loader.onComplete;
                        }
                    }
                });
                item.image.addEventListener('error', function (evt) {
                    var src = evt.target.src;
                    evt.target.src = "";
                    evt.target.src = src;
                });
                loader.images.push(item);

            }
            for (var i = 0; i < list.length; i++) {
                loader.images[i].image.src = list[i].url;
            }
        }
        else if (typeof (list) == 'string') {
            //加载单个图片地址
            loader.type = 'image';
            loader.image = new Image();
            loader.image.addEventListener('load', function (evt) {
                if (loader.onComplete) {
                    loader.onComplete(loader.image);
                }
            });
            loader.image.addEventListener('error', function (evt) {
                var src = evt.target.src;
                evt.target.src = "";
                evt.target.src = src;
            });
            loader.image.src = list;
        }
    },

    checkImage: function (list, onComplete, onProgress) {
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

        if(check(list) == 1)
        {
            if (onComplete) {
                onComplete();
            }
        }
        else
        {
            for (var i = 0; i < list.length; i++) {
                list[i].addEventListener('load', (function () {
                    var p = check(this.list);
                    if (p == 1 && !this.isComplete) {
                        if (this.onComplete) {
                            this.onComplete();
                        }
                    }
                    else
                    {
                        if (this.onProgress) {
                            this.onProgress(p);
                        }
                    }
                }).bind(loader));
            }
        }
    }
};

if (Function.prototype.bind == undefined) {
    Function.prototype.bind = function () {
        var fn = this, args = Array.prototype.slice.call(arguments), object = args.shift();
        return function () {
            return fn.apply(object,
                args.concat(Array.prototype.slice.call(arguments)));
        };
    };
}
/**
 * 样式表管理器
 * @static
 * @class StyleManager
 */
SL.StyleManager = {};

SL.StyleManager.stylesheet = null;

/**
 * 获取当前使用的临时样式表对象
 * @static
 * @protected
 * @method getStylesheet
 * @return {CSSStylesheet} 临时样式表对象
 */
SL.StyleManager.getStylesheet = function() {
	if (SL.StyleManager.stylesheet == null) {
		var node = document.createElement('style');
		node.type = 'text/css';
		document.head.appendChild(node);
		SL.StyleManager.stylesheet = node.sheet;
	}
	return SL.StyleManager.stylesheet;
};

/**
 * 添加一条CSS规则
 * @method addCssRule
 * @static
 * @param selector {string} 选择器名称
 * @param text {string} CSS文本
 * @returns {CSSRule} 被添加的CSS规则对象
 */
SL.StyleManager.addRule = function(selector, text) {
	var sheet = SL.StyleManager.getStylesheet();
	if(sheet.insertRule) {
        sheet.insertRule(selector + ' {' + text + '}', 0);
        return sheet.cssRules[0];
    }
    else {
        sheet.addRule(selector, text);
        return sheet.cssRules[sheet.cssRules.length - 1];
    }
};

/**
 * 移除一条CSS规则
 * @method  removeRule
 * @param rule {CSSRule} 要移除的CSS规则
 */
SL.StyleManager.removeRule = function(rule) {
	var sheet = SL.StyleManager.getStylesheet();
    for(var i = 0; i < sheet.cssRules.length; i++) {
        if(rule.parentStyleSheet.cssRules[i] == rule) {
            rule.parentStyleSheet.deleteRule(i);
            return;
        }
    }
};
/**
 * 
 */
SL.Events = {
	RESIZE: 'resize',
	
	RESET: 'reset',
	
	ACTIVE: 'active',
	
	DEACTIVE: 'deactive',
	
	NAVIGATE_START: 'navigate_start',
	
	NAVIGATE_END: 'navigate_end',
	
	CHANGE: 'change'
};

﻿/**
 * 拥有事件触发能力的对象基类
 * @class EventDispatcher
 * @constructor
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
};
﻿/**
 * 舞台对象
 * @class Stage
 * @uses EventDispatcher
 * @param [width = window.innerWidth] {Number} 舞台宽度，如果不传值则默认为窗口宽度
 * @param [height = window.innerHeight] {Number} 舞台高度，如果不传值则默认为窗口高度
 * @constructor
 */
SL.Stage = function (width, height) {
    SL.EventDispatcher.call(this);

    this.element = document.createElement('div');
    this.element.className = 'sl_stage';

    this.hiddenLayer = this.element.appendChild(document.createElement('div'));
    this.hiddenLayer.className = 'sl_hidden_layer';

    this.pageLayer = this.element.appendChild(document.createElement('div'));
    this.pageLayer.className = 'sl_page_layer';
    
    this.floatLayer = this.element.appendChild(document.createElement('div'));
    this.floatLayer.className = 'sl_float_layer';
    
    this.width = 0;
    this.height = 0;
    
    this.autoNavigate = true;
    this.navigator = null;
    this.navigateLimit = 0.2;
    this.hashNavigate = false;
    
    this.page = null;
    
    this.resize = function(width, height) {
    	this.onResize(width, height);
    	this.dispatchEvent({
    		type: SL.Events.RESIZE
    	});
    };
    
    this.setPage = function(page) {
    	if(page == null) return;
    	this.onSetPage(page);
    	this.dispatchEvent({
    		type: SL.Events.CHANGE
    	});
    };
    
    this.navigate = function(page, navigator, options) {
        if (page == null) return;
        if (page == this.page) return;
    	if(!navigator) {
    		navigator = this.navigator;
    	}
    	if(!navigator) {
    		this.setPage(page);
    		return;
    	}
    	var lastPage = this.page;
    	this.onNavigate(page, navigator, options);
    	this.dispatchEvent({
    		type: SL.Events.NAVIGATE_START,
    		lastPage: lastPage,
    		page: page,
    		navigator: navigator,
    		options: options
    	});
    };
    
    this.resize(width == undefined ? window.innerWidth : width, height == undefined ? window.innerHeight : height);
};

SL.Stage.prototype.onResize = function(width, height) {
	this.element.style.width = width + 'px';
	this.element.style.height = height + 'px';
	this.width = width;
	this.height = height;
};

SL.Stage.prototype.onSetPage = function(page) {
	if(this.page != null) {
		this.removeEventListener(SL.Events.RESIZE, this.page.onStageResize);
		this.page.deactive();
		this.pageLayer.removeChild(this.page.element);
	}
	page.stage = this;
	page.onStageResize = (function(){
		this.resize(this.stage.width, this.stage.height);
	}).bind(page);
	this.addEventListener(SL.Events.RESIZE, page.onStageResize);
	
	page.resize(this.width, this.height);
	page.reset();
	
	this.pageLayer.appendChild(page.element);
	this.page = page;
	
	page.active();
};

SL.Stage.prototype.onNavigate = function(page, navigator, options) {
	if(this.page != null) {
		this.removeEventListener(SL.Events.RESIZE, this.page.onStageResize);
		this.page.deactive();
	}
	
	page.stage = this;
	page.onStageResize = (function(){
		this.resize(this.stage.width, this.stage.height);
	}).bind(page);
	this.addEventListener(SL.Events.RESIZE, page.onStageResize);
	
	page.resize(this.width, this.height);
	page.reset();
	
	navigator.addEventListener(SL.Events.NAVIGATE_END, function (evt) {
	    
		evt.navigator.removeEventListener(SL.Events.NAVIGATE_END, arguments.callee);
		evt.stage.onNavigateComplete(evt.page, evt.navigator, evt.options);
	});
	
	navigator.start(this, page, this.page, options);
};

SL.Stage.prototype.onNavigateComplete = function(page, navigator, options) {
	this.pageLayer.removeChild(this.page.element);
	this.page = page;
	
	page.active();
};

SL.Stage.prototype.setMusic = function(music) {
	
};

SL.Stage.prototype.setArrows = function(arrows) {
	
};










/**
 * 
 */
SL.Navigator = function(duration) {
	SL.EventDispatcher.call(this);
	
	this.duration = duration;
	
	this.start = function(stage, page, lastPage, options) {
		if(!options) {
			options = {};
		}
		this.onStart(stage, page, lastPage, options);
		this.dispatchEvent({
			type: SL.Events.NAVIGATE_START,
			stage: stage,
			page: page,
			lastPage: lastPage,
			options: options
		});
	}
}

SL.Navigator.prototype.onStart = function(stage, page, lastPage, options) {
	
};

SL.Navigator.prototype.onEnd = function (stage, page, lastPage, options) {
    
	this.dispatchEvent({
		type: SL.Events.NAVIGATE_END,
		navigator: this,
		stage: stage,
		page: page,
		lastPage: lastPage,
		options: options
	});
}

/**
 * 
 */
SL.SlideNavigator = function(duration) {
	SL.Navigator.call(this, duration);
	
	this.className = 'sl_slide_' + SL.uniqid();
	
	var styleValue = this.duration + 'ms;';
	
	var cssValue = 'transition: transform ' + styleValue;
	cssValue += '-webkit-transition: -webkit-transform ' + styleValue;
	cssValue += '-moz-transition: -moz-transform ' + styleValue;
	cssValue += '-ms-transition: -ms-transform ' + styleValue;
	cssValue += '-o-transition: -o-transform ' + styleValue;
	
	SL.StyleManager.addRule('.' + this.className, cssValue);
}

SL.SlideNavigator.prototype = Object.create(SL.Navigator.prototype);
SL.SlideNavigator.prototype.constructor = SL.SlideNavigator;

SL.SlideNavigator.prototype.onStart = function(stage, page, lastPage, options) {
	switch(options.direction) {
		case 'left':
		    //page.element.classList.add('sl_slide_left');
		    page.element.style.left = 0 - stage.width + 'px';
			//SL.setValueByBrowser(page.style, 'transform', 'translate3d(-100%, 0%, 0%)');
			break;
		case 'right':
		    //page.element.classList.add('sl_slide_right');
		    page.element.style.left = stage.width + 'px';
			//SL.setValueByBrowser(page.style, 'transform', 'translate3d(100%, 0%, 0%)');
			break;
		case 'top':
		    //page.element.classList.add('sl_slide_top');
		    page.element.style.top = 0 - stage.height + 'px';
			//SL.setValueByBrowser(page.style, 'transform', 'translate3d(0%, -100%, 0%)');
			break;
		default:
		    //page.element.classList.add('sl_slide_bottom');
		    page.element.style.top = stage.height + 'px';
			//SL.setValueByBrowser(page.style, 'transform', 'translate3d(0%, 100%, 0%)');
			break;
	}
	//page.element.classList.add(this.className);
	//lastPage.element.classList.add(this.className);
	stage.pageLayer.appendChild(page.element);

	var callback = (function () {
	    this.navigator.onEnd(this.stage, this.page, this.lastPage, this.options);
	}).bind({
	    navigator: this,
	    stage: stage,
	    page: page,
	    lastPage: lastPage,
	    options: options
	});

	switch (options.direction) {
	    case 'left':
	        $(lastPage.element).animate({ left: stage.width }, {
                duration: this.duration
	        });
	        //lastPage.element.classList.add('sl_slide_right');
	        break;
	    case 'right':
	        $(lastPage.element).animate({ left: 0 - stage.width }, {
	            duration: this.duration
	        });
	        //lastPage.element.classList.add('sl_slide_left');
	        break;
	    case 'top':
	        $(lastPage.element).animate({ top: stage.height }, {
	            duration: this.duration
	        });
	        //lastPage.element.classList.add('sl_slide_bottom');
	        break;
	    default:
	        $(lastPage.element).animate({ top: 0 - stage.height }, {
	            duration: this.duration
	        });
	        //lastPage.element.classList.add('sl_slide_top');
	        break;
	}
	$(page.element).animate({ top: 0, left: 0 }, {
	    duration: this.duration,
        complete: callback
	});

	//setTimeout((function(stage, page, lastPage, options){
	//	var callback = (function(){
	//		this.navigator.onEnd(this.stage, this.page, this.lastPage, this.options);
	//	}).bind({
	//		navigator: this,
	//		stage: stage,
	//		page: page,
	//		lastPage: lastPage,
	//		options: options
	//	});
		
	//	if (window.ontransitionend !== undefined) {
	//	    window.addEventListener('transitionend', function (evt) {
	//	        if (evt.target == page.element) {
	//	            window.removeEventListener('transitionend', arguments.callee);
	//	            callback();
	//	        }
	//	    });
	//	}
	//	else if (window.onwebkittransitionend !== undefined) {
	//	    window.addEventListener('webkitTransitionEnd', function (evt) {
	//	        console.log(evt);
	//			if(evt.target == page.element) {
	//			    window.removeEventListener('webkitTransitionEnd', arguments.callee);
	//			    //console.log(callback);
	//				callback();
	//			}
	//		});
	//	}
	//	else if(window.onmoztransitionend !== undefined) {
	//		window.addEventListener('mozTransitionEnd', function(evt) {
	//			if(evt.target == page.element) {
	//				window.removeEventListener('mozTransitionEnd', arguments.callee);
	//				callback();
	//			}
	//		});
	//	}
	//	else if(window.onotransitionend !== undefined) {
	//		window.addEventListener('oTransitionEnd', function(evt) {
	//			if(evt.target == page.element) {
	//				window.removeEventListener('oTransitionEnd', arguments.callee);
	//				callback();
	//			}
	//		});
	//	}
	//	else if(window.onmstransitionend !== undefined) {
	//		window.addEventListener('msTransitionEnd', function(evt) {
	//			if(evt.target == page.element) {
	//				window.removeEventListener('msTransitionEnd', arguments.callee);
	//				callback();
	//			}
	//		});
	//	}
	//	else {
	//	    setTimeout(function () {
	//	        callback();
	//	    }, this.duration);
	//	}
		
	//	SL.setValueByBrowser(page.element.style, 'transform', 'translate3d(0%, 0%, 0px)');
	//	switch(options.direction) {
	//		case 'left':
	//			lastPage.element.classList.add('sl_slide_right');
	//			break;
	//		case 'right':
	//			lastPage.element.classList.add('sl_slide_left');
	//			break;
	//		case 'top':
	//			lastPage.element.classList.add('sl_slide_bottom');
	//			break;
	//		default:
	//			lastPage.element.classList.add('sl_slide_top');
	//			break;
	//	}
	//}).bind(this), 0, stage, page, lastPage, options);
};

SL.SlideNavigator.prototype.onEnd = function(stage, page, lastPage, options) {
	//page.element.classList.remove(this.className);
	//lastPage.element.classList.remove(this.className);
	SL.Navigator.prototype.onEnd.call(this, stage, page, lastPage, options);
	//switch(options.direction) {
	//	case 'left':
	//		page.element.classList.remove('sl_slide_left');
	//		lastPage.element.classList.remove('sl_slide_right');
	//		break;
	//	case 'right':
	//		page.element.classList.remove('sl_slide_right');
	//		lastPage.element.classList.remove('sl_slide_left');
	//		break;
	//	case 'top':
	//		page.element.classList.remove('sl_slide_top');
	//		lastPage.element.classList.remove('sl_slide_bottom');
	//		break;
	//	default:
	//		page.element.classList.remove('sl_slide_bottom');
	//		lastPage.element.classList.remove('sl_slide_top');
	//		break;
	//}
	//SL.setValueByBrowser(page.element.style, 'transform', '');
}
﻿/**
 * 
 */
SL.Page = function() {
	SL.EventDispatcher.call(this);
	
	this.element = document.createElement('div');
	this.element.className = 'sl_page';
	
	this.container = this.element;
	
	this.width = 0;
	this.height = 0;
	this.id = '';
	this.stage = null;
	
	this.reset = function() {
		this.onReset();
		this.dispatchEvent({ type: SL.Events.RESET });
	}
	
	this.active = function() {
		this.onActive();
		this.dispatchEvent({ type: SL.Events.ACTIVE });
	}
	
	this.deactive = function() {
		this.onDeactive();
		this.dispatchEvent({ type: SL.Events.DEACTIVE });
	}
	
	this.resize = function(width, height) {
		this.onResize(width, height);
		this.dispatchEvent({ type: SL.Events.RESIZE });
	}
};

SL.Page.prototype.onResize = function(width, height) {
	this.element.style.width = width + 'px';
	this.element.style.height = height + 'px';
	this.width = width;
	this.height = height;
};

SL.Page.prototype.onActive = function() {
	
};

SL.Page.prototype.onDeactive = function() {
	
};

SL.Page.prototype.onReset = function() {
	
};

/**
 * 
 * @param {Object} width
 * @param {Object} height
 * @param {Object} sizeMode
 * @param {Object} align
 */
SL.ZoomedPage = function(width, height, sizeMode, align) {
	SL.Page.call(this);
	
	this.sizeMode = sizeMode ? sizeMode : 'width';
	this.align = align ? align : 'center';
	
	this.dx = 0;
	this.dy = 0;
	this.originalDx = 0;
	this.originalDy = 0;
	this.scale = 1;
	this.originalWidth = width;
	this.originalHeight = height;
	
	this.container = document.createElement('div');
	this.container.className = 'sl_page_zoomwrap';
	this.element.appendChild(this.container);
	
	
};

SL.ZoomedPage.prototype = Object.create(SL.Page.prototype);
SL.ZoomedPage.prototype.constructor = SL.ZoomedPage;

SL.ZoomedPage.prototype.setOriginalSize = function(width, height) {
	this.originalWidth = width;
	this.originalHeight = height;
	this.container.style.width = width + 'px';
	this.container.style.height = height + 'px';
	this.zoom();
};

SL.ZoomedPage.prototype.zoom = function() {
	switch(this.sizeMode) {
		case 'height':
			this.scale = this.height / this.originalHeight;
			break;
		case 'contain':
			this.scale = Math.min(this.width / this.originalWidth, this.height / this.originalHeight);
			break;
		case 'cover':
			this.scale = Math.max(this.width / this.originalWidth, this.height / this.originalHeight);
			break;
		default:
			this.scale = this.width / this.originalWidth;
			break;
	}
	
	switch(this.align) {
		case 'topleft':
			this.dx = 0;
			this.dy = 0;
			break;
		case 'top':
			this.dx = (this.width - (this.originalWidth * this.scale)) / 2;
			this.dy = 0;
			break;
		case 'topright':
			this.dx = (this.width - (this.originalWidth * this.scale));
			this.dy = 0;
			break;
		case 'left':
			this.dx = 0;
			this.dy = (this.height - (this.originalHeight * this.scale)) / 2;
			break;
		case 'right':
			this.dx = (this.width - (this.originalWidth * this.scale));
			this.dy = (this.height - (this.originalHeight * this.scale)) / 2;
			break;
		case 'bottomleft':
			this.dx = 0;
			this.dy = (this.height - (this.originalHeight * this.scale));
			break;
		case 'bottom':
			this.dx = (this.width - (this.originalWidth * this.scale)) / 2;
			this.dy = (this.height - (this.originalHeight * this.scale));
			break;
		case 'bottomright':
			this.dx = (this.width - (this.originalWidth * this.scale));
			this.dy = (this.height - (this.originalHeight * this.scale));
			break;
		default:
			this.dx = (this.width - (this.originalWidth * this.scale)) / 2;
			this.dy = (this.height - (this.originalHeight * this.scale)) / 2;
			break;
	}
	this.originalDx = this.dx / this.scale;
	this.originalDy = this.dy / this.scale;
	this.container.style.left = this.dx + 'px';
	this.container.style.top = this.dy + 'px';
	SL.setValueByBrowser(this.container.style, 'transform', 'scale3d(' + this.scale + ', ' + this.scale + ', 1)');
};

SL.ZoomedPage.prototype.onResize = function(width, height) {
    SL.Page.prototype.onResize.call(this, width, height);
    this.setOriginalSize(this.originalWidth, this.originalHeight);
};


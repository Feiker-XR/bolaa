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
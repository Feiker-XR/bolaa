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
	
	window.addEventListener('transitionend', (function(evt){
		for(var i = 0; i < this.events.length; i++) {
		    if (this.events[i].element == evt.target && (this.events[i].propertyName == evt.propertyName || this.events[i].propertyName == '')) {
				this.events[i].listener(evt);
			}
		}
	}).bind(this));

	window.addEventListener('webkitTransitionEnd', (function (evt) {
	    for (var i = 0; i < this.events.length; i++) {
	        if (this.events[i].element == evt.target && (this.events[i].propertyName == evt.propertyName || this.events[i].propertyName == '')) {
	            this.events[i].listener(evt);
	        }
	    }
	}).bind(this));
})();

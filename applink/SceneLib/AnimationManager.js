SL.animation = function(element) {
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

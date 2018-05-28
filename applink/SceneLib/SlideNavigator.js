SL.SlideNavigator = function() {
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
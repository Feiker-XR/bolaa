SL.Navigator = function() {
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

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

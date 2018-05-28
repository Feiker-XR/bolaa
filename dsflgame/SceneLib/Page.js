SL.Page = function(element, stage) {
	SL.EventDispatcher.call(this);
	
	this.element = element;
	
	this.stage = stage;
	
	
	
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

Object.defineProperty(SL.Page.prototype, 'id', {
	get: function() {
		return $(this.element).attr('id');
	},
	set: function(id) {
		$(this.element).attr('id', id);
	}
});

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

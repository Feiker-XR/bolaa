SL.Content = function(element, page) {
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

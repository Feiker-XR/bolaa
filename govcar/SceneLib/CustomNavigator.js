SL.CustomNavigator = function(obj) {
	SL.Navigator.call(this);
	
	this._doNavigate = obj.navigate;
};

SL.CustomNavigator.prototype = Object.create(SL.CustomNavigator.prototype);
SL.CustomNavigator.prototype.constructor = SL.CustomNavigator;

SL.CustomNavigator.prototype.onNavigate = function(opt) {
	this._doNavigate.call(this, opt);
};
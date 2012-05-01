enyo.kind({
	name: "onyx.Scrim",
	showing: false,
	classes: "onyx-scrim enyo-fit",
	floating: false,
	//*@ protected
	create: function() {
		this.inherited(arguments);
		if (this.floating) {
			this.setParent(enyo.floatingLayer);
		}
	},
	showingChanged: function() {
	// auto render when shown.
		if (this.floating && this.showing && !this.hasNode()) {
			this.render();
		}
		this.inherited(arguments);
		//this.addRemoveClass(this.showingClassName, this.showing);
	},
	//* @protected
	make: function() {
		return this;
	}
});

//* @protected
//
// Scrim singleton exposing a subset of Scrim API. 
// is replaced with a proper enyo.Scrim instance.
//
enyo.kind({
	name: "onyx.scrimSingleton",
	kind: null,
	constructor: function(inName, inProps) {
		this.instanceName = inName;
		enyo.setObject(this.instanceName, this);
		this.props = inProps || {};
	},
	make: function() {
		var s = new onyx.Scrim(this.props);
		enyo.setObject(this.instanceName, s);
		return s;
	},
	show: function() {
		var s = this.make();
		s.show();
	}
});

new onyx.scrimSingleton("onyx.scrim", {floating: true, classes: "onyx-scrim-translucent"});
new onyx.scrimSingleton("onyx.scrimTransparent", {floating: true, classes: "onyx-scrim-transparent"});

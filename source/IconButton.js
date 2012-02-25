enyo.kind({
	name: "onyx.IconButton",
	kind: "onyx.Icon",
	published: {
		active: false
	},
	classes: "onyx-icon-button",
	create: function() {
		this.inherited(arguments);
		this.activeChanged();
	},
	tap: function() {
		this.setActive(true);
	},
	activeChanged: function() {
		this.bubble("onActivate");
	}
});
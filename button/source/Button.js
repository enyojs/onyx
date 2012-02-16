enyo.kind({
	name: "onyx.Button",
	kind: "enyo.Button",
	classes: "onyx-button enyo-unselectable",
	published: {
		disabled: false
	},
	create: function() {
		this.inherited(arguments);
		this.disabledChanged();
	},
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
	}
});

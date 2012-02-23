/* onyx.Button doesn't support icon */
enyo.kind({
	name: "IconButton",
	kind: "onyx.Button",
	published: {
		icon: ""
	},
	components: [
		{name: "icon", classes: "icon"}
	],
	create: function() {
		this.inherited(arguments);
		this.iconChanged();
	},
	iconChanged: function() {
		this.$.icon.applyStyle("background-image", "url(" + this.icon + ")");
	}
});
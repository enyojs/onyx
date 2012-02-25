/* onyx.Button doesn't support icon */
enyo.kind({
	name: "IconButton",
	kind: "onyx.Button",
	published: {
		icon: ""
	},
	components: [
		{kind: "IconImage"}
	],
	create: function() {
		this.inherited(arguments);
		this.iconChanged();
	},
	iconChanged: function() {
		this.$.iconImage.setSrc(this.icon);
	}
});

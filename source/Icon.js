enyo.kind({
	name: "onyx.Icon",
	published: {
		src: ""
	},
	classes: "onyx-icon",
	create: function() {
		this.inherited(arguments);
		if (this.src) {
			this.srcChanged();
		}
	},
	srcChanged: function() {
		this.applyStyle("background-image", "url(" + this.src + ")");
	}
});
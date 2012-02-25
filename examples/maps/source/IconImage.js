enyo.kind({
	name: "IconImage",
	classes: "icon",
	srcChanged: function() {
		this.applyStyle("background-image", "url(" + this.src + ")");
	}
});

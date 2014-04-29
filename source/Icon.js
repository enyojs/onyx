/**
	_onyx.Icon_ is a control that displays an icon. To set the icon image, specify
	a URL for the image's location in the Icon's _src_ property.

	In Onyx, icons have a size of 32x32 pixels. Since the icon image is applied
	as a CSS background, the height and width of the icon must be set if an image
	of a different size is used.

		{kind: "onyx.Icon", src: "images/search.png"}

	When an icon should act like a button, use an
	[onyx.IconButton](#onyx.IconButton).
*/
enyo.kind({
	name: "onyx.Icon",
	published: {
		//* URL specifying path to icon image
		src: "",
		//* When true, icon is shown as disabled
		disabled: false
	},
	classes: "onyx-icon",
	//* @protected
	create: function() {
		this.inherited(arguments);
		if (this.src) {
			this.srcChanged();
		}
		this.disabledChanged();
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	},
	srcChanged: function() {
		this.applyStyle("background-image", "url(" + enyo.path.rewrite(this.src) + ")");
	}
});
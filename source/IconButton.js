/**
	A icon that acts like a button. The icon image is specified by setting the src property to a url.

		{kind: "onyx.IconButton", src: "images/search.png", ontap: "buttonTap"}
	
	If an icon should be combined with text inside a button, use an 
	<a href="#onyx.Icon">onyx.Icon</a> inside an <a	href="#onyx.Button">onyx.Button</a>.

		{kind: "onyx.Button", ontap: "buttonTap", components: [
			{kind: "onyx.Icon", src: "images/search.png"},
			{content: "Button"}
		]}

	The image associated with the src property of the onyx.IconButton  is
	assumed to be 32x64 pixel strip with the top image showing normally, and
	the bottom one showing with the button is hovered over or active.
*/
enyo.kind({
	name: "onyx.IconButton",
	kind: "onyx.Icon",
	published: {
		active: false
	},
	classes: "onyx-icon-button",
	//* @protected
	rendered: function() {
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

/**
	An icon that acts like a button. The icon image is specified by setting the
	*src* property to a URL.

		{kind: "onyx.IconButton", src: "images/search.png", ontap: "buttonTap"}
	
	If you want to combine an icon with text inside a button, use an 
	<a href="#onyx.Icon">onyx.Icon</a> inside an
	<a href="#onyx.Button">onyx.Button</a>, e.g.:

		{kind: "onyx.Button", ontap: "buttonTap", components: [
			{kind: "onyx.Icon", src: "images/search.png"},
			{content: "Button"}
		]}

	The image associated with the *src* property of the IconButton is assumed
	to be 32x64-pixel strip with the top half showing the button's normal state
	and the bottom half showing its state when hovered-over or active.
*/
enyo.kind({
	name: "onyx.IconButton",
	kind: "onyx.Icon",
	published: {
		//* True if the IconButton is in its active state; false if in its
		//* normal state
		active: false
	},
	classes: "onyx-icon-button",
	//* @protected
	rendered: function() {
		this.inherited(arguments);
		this.activeChanged();
	},
	tap: function() {
		if (this.disabled) {
			return true;
		}
		this.setActive(!this.active);
	},
	activeChanged: function() {
		this.addRemoveClass("active", this.active);
		this.bubble("onActivate");
	}
});

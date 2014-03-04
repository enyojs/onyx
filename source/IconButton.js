/**
	_onyx.IconButton_ is an icon that acts like a button. The icon image is
	specified by setting the _src_ property to a URL.

	If you want to combine an icon with text inside a button, use an
	[onyx.Icon](#onyx.Icon) inside an [onyx.Button](#onyx.Button).

	The image associated with the _src_ property of the IconButton is assumed
	to be 32x64-pixel strip with the top half showing the button's normal state
	and the bottom half showing its state when hovered-over or active.

	For more information, see the documentation on
	[Buttons](building-apps/controls/buttons.html) in the Enyo Developer Guide.
*/
enyo.kind({
	name: "onyx.IconButton",
	kind: "onyx.Icon",
	published: {
		//* Used when the IconButton is part of a <a href="#enyo.Group">enyo.Group</a>, true
		//* to indicate that this is the active button of the group, false otherwise.
		active: false
	},
	classes: "onyx-icon-button",
	handlers: {
		ondown: "down",
		onenter: "enter",
		ondragfinish: "dragfinish",
		onleave: "leave",
		onup: "up"
	},
	rendered: function() {
		this.inherited(arguments);
		this.activeChanged();
	},
	tap: function() {
		if (this.disabled) {
			return true;
		}
		this.setActive(true);
	},
	down: function(inSender, inEvent) {
		if (this.disabled) {
			return true;
		}
		this.addClass("pressed");
		this._isPressed = true;
	},
	enter: function(inSender, inEvent) {
		if (this.disabled) {
			return true;
		}
		if(this._isPressed) {
			this.addClass("pressed");
		}
	},
	dragfinish: function(inSender, inEvent) {
		if (this.disabled) {
			return true;
		}
		this.removeClass("pressed");
		this._isPressed = false;
	},
	leave: function(inSender, inEvent) {
		if (this.disabled) {
			return true;
		}
		this.removeClass("pressed");
	},
	up: function(inSender, inEvent) {
		if (this.disabled) {
			return true;
		}
		this.removeClass("pressed");
		this._isPressed = false;
	},
	activeChanged: function() {
		this.bubble("onActivate");
	}
});

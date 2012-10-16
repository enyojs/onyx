/**
	_onyx.ToggleIconButton_ is an icon that acts like a toggle switch. The icon
	image is specified by setting the _src_ property to a URL.

		{kind: "onyx.ToggleIconButton", src: "images/search.png", ontap: "buttonTap"}

	The image associated with the _src_ property is assumed	to be a 32x64-pixel
	strip, with the top half showing the button's normal state and the bottom
	half showing its state when hovered-over or active.
*/

enyo.kind({
	name: "onyx.ToggleIconButton",
	kind: "onyx.Icon",
	published: {
		/**
		    Used when the ToggleIconButton is part of an enyo.Group; set to true
		    to indicate that this is the active button in the group.
		*/
		active: false,
		//* Boolean indicating whether the button is currently in the "on" state
		value: false
	},
	events: {
		/**
			Fires when the user changes the value of the toggle button, but not
			when the value is changed programmatically.
		*/
		onChange: ""
	},
	classes: "onyx-icon-button onyx-icon-toggle",
	//* @protected
	activeChanged: function() {
		this.addRemoveClass("active", this.value);
		this.bubble("onActivate");
	},
	updateValue: function(inValue) {
		if (!this.disabled) {
			this.setValue(inValue);
			this.doChange({value: this.value});
		}
	},
	tap: function() {
		this.updateValue(!this.value);
	},
	valueChanged: function() {
		this.setActive(this.value);
	},
	create: function() {
		this.inherited(arguments);
		this.value = Boolean(this.value || this.active);
	},
	rendered: function() {
		this.inherited(arguments);
		this.valueChanged();
		this.removeClass('onyx-icon');
	}
});
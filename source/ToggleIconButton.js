/**
	An icon that acts like a toggle switch. The icon image is specified by setting 
	the *src* property to a URL.

		{kind: "onyx.ToggleIconButton", src: "images/search.png", ontap: "buttonTap"}
	
	The image associated with the *src* property of the ToggleIconButton is assumed
	to be 32x64-pixel strip with the top half showing the button's normal state
	and the bottom half showing its state when hovered-over or active.
*/

enyo.kind({
	name: "onyx.ToggleIconButton",
	kind: "onyx.Icon",
	published: {
		active: false,
		value: false,
		disabled: false
	},
	events: {
		/**
			The onChange event fires when the user changes the value of the toggle button, 
			but not when the value is changed programmatically.
		*/
		onChange: ""
	},
	classes: "onyx-icon-button onyx-icon-toggle",
	//* @protected
	activeChanged: function() {
		this.addRemoveClass("active", this.value)
		this.bubble("onActivate");
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
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
		this.disabledChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.valueChanged();
		this.removeClass('onyx-icon')
	},
});
/**
	_onyx.ToggleButton_ is a control that looks like a switch with labels for
	two states. Each time a	ToggleButton is tapped, it switches its value and
	fires an _onChange_ event.

	To get the value of the button, call _getValue_.

	For more information, see the documentation on
	[Buttons](https://github.com/enyojs/enyo/wiki/Buttons) in the Enyo Developer
	Guide.
*/
enyo.kind({
	name: "onyx.ToggleButton",
	classes: "onyx-toggle-button",
	published: {
		//* Used when the ToggleButton is part of a <a href="#enyo.Group">enyo.Group</a>, true
		//* to indicate that this is the active button of the group, false otherwise.
		active: false,
		//* Boolean indicating whether toggle button is currently in the "on"
		//* state
		value: false,
		//* Label for toggle button's "on" state
		onContent: "On",
		//* Label for toggle button's "off" state
		offContent: "Off",
		//* If true, toggle button cannot be tapped and thus will not generate
		//* any events
		disabled: false
	},
	events: {
		/**
			Fires when the user changes the value of the toggle button,	but not
			when the value is changed programmatically.

			_inEvent.value_ contains the value of the toggle button.
		*/
		onChange: ""
	},
	//* @protected
	handlers: {
		ondragstart: "dragstart",
		ondrag: "drag",
		ondragfinish: "dragfinish"
	},
	components: [
		{name: "contentOn", classes: "onyx-toggle-content on"},
		{name: "contentOff", classes: "onyx-toggle-content off"},
		{classes: "onyx-toggle-button-knob"}
	],
	create: function() {
		this.inherited(arguments);
		this.value = Boolean(this.value || this.active);
		this.onContentChanged();
		this.offContentChanged();
		this.disabledChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.updateVisualState();
	},
	updateVisualState: function() {
		this.addRemoveClass("off", !this.value);
		this.$.contentOn.setShowing(this.value);
		this.$.contentOff.setShowing(!this.value);
		this.setActive(this.value);
	},
	valueChanged: function() {
		this.updateVisualState();
		this.doChange({value: this.value});
	},
	activeChanged: function() {
		this.setValue(this.active);
		this.bubble("onActivate");
	},
	onContentChanged: function() {
		this.$.contentOn.setContent(this.onContent || "");
		this.$.contentOn.addRemoveClass("empty", !this.onContent);
	},
	offContentChanged: function() {
		this.$.contentOff.setContent(this.offContent || "");
		this.$.contentOff.addRemoveClass("empty", !this.onContent);
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	},
	updateValue: function(inValue) {
		if (!this.disabled) {
			this.setValue(inValue);
		}
	},
	tap: function() {
		this.updateValue(!this.value);
	},
	dragstart: function(inSender, inEvent) {
		if (inEvent.horizontal) {
			inEvent.preventDefault();
			this.dragging = true;
			this.dragged = false;
			return true;
		}
	},
	drag: function(inSender, inEvent) {
		if (this.dragging) {
			var d = inEvent.dx;
			if (Math.abs(d) > 10) {
				this.updateValue(d > 0);
				this.dragged = true;
			}
			return true;
		}
	},
	dragfinish: function(inSender, inEvent) {
		this.dragging = false;
		if (this.dragged) {
			inEvent.preventTap();
		}
	}
});
enyo.kind({
	name: "onyx.ToggleButton",
	classes: "onyx-toggle-button",
	published: {
		active: false,
		value: false,
		onContent: "On",
		offContent: "Off",
		disabled: false
	},
	events: {
		/**
			The onChange event fires when the user changes the value of the toggle button, 
			but not when the value is changed programmatically.
		*/
		onChange: ""
	},
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
		this.valueChanged();
		this.onContentChanged();
		this.offContentChanged();
		this.disabledChanged();
	},
	valueChanged: function() {
		this.addRemoveClass("off", !this.value);
		this.$.contentOn.setShowing(this.value);
		this.$.contentOff.setShowing(!this.value);
		this.setActive(this.value);
	},
	activeChanged: function() {
		this.setValue(this.active);
		this.bubble("onActivate");
	},
	onContentChanged: function() {
		this.$.contentOn.setContent(this.onContent || "&nbsp");
		this.$.contentOn.addRemoveClass("empty", !this.onContent);
	},
	offContentChanged: function() {
		this.$.contentOff.setContent(this.offContent || "&nbsp");
		this.$.contentOff.addRemoveClass("empty", !this.onContent);
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
	},
	updateValue: function(inValue) {
		if (!this.disabled) {
			this.setValue(inValue);
			this.doChange(this.value);
		}
	},
	tap: function() {
		this.updateValue(!this.value);
	},
	dragstart: function(inSender, inEvent) {
		this._dx0 = inEvent.dx;
	},
	drag: function(inSender, inEvent) {
		var d = inEvent.dx - this._dx0;
		if (Math.abs(d) > 15) {
			this.updateValue(d > 0);
			this._dx0 = inEvent.dx;
		}
	},
	dragfinish: function(inSender, inEvent) {
		inEvent.preventTap();
	}
})

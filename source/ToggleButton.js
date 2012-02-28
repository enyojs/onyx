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
		{name: "bar", classes: "onyx-toggle-button-bar", components: [
			{name: "contentOn", classes: "onyx-toggle-content-on"},
			{name: "contentOff", classes: "onyx-toggle-content-off"},
			{classes: "onyx-toggle-button-knob"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.valueChanged();
		this.onContentChanged();
		this.offContentChanged();
		this.disabledChanged();
	},
	valueChanged: function() {
		this.$.bar.addClass(this.value ? "on" : "off");
		this.$.bar.removeClass(!this.value ? "on" : "off");
		this.$.contentOn.setShowing(this.value);
		this.$.contentOff.setShowing(!this.value);
		this.setActive(this.value);
	},
	activeChanged: function() {
		this.setValue(this.active);
		this.bubble("onActivate");
	},
	onContentChanged: function() {
		this.$.contentOn.setContent(this.onContent);
	},
	offContentChanged: function() {
		this.$.contentOff.setContent(this.offContent);
	},
	disabledChanged: function() {
		this.$.bar.addRemoveClass("disabled", this.disabled);
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
		//this._dx0 = inEvent.dx;
		this.dragged = false;
	},
	drag: function(inSender, inEvent) {
		//var d = inEvent.dx - this._dx0;
		var d = inEvent.dx;
		if (Math.abs(d) > 15) {
			this.updateValue(d > 0);
			this.dragged = true;
		}
	},
	dragfinish: function(inSender, inEvent) {
		if (this.dragged) {
			inEvent.preventTap();
		}
	}
})

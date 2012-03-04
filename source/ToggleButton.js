/**
A control that looks like a switch with labels for two states. Each time a ToggleButton is tapped,
it switches its value and fires an onChange event.

	{kind: "onyx.ToggleButton", onContent: "foo", offContent: "bar", onChange: "buttonToggle"}

	buttonToggle: function(inSender, inEvent) {
		this.log("Toggled to value " + inEvent.value);
	}

To find out the value of the button, use getValue:

	queryToggleValue: function() {
		return this.$.toggleButton.getValue();
	}
*/
enyo.kind({
	name: "onyx.ToggleButton",
	classes: "onyx-toggle-button",
	published: {
		active: false,
		value: false,
		onContent: "On",
		offContent: "Off",
		disabled: false,
		animated: true
	},
	events: {
		/**
			The onChange event fires when the user changes the value of the toggle button, 
			but not when the value is changed programmatically.
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
		{kind: "onyx.Slideable", name: "knob", axis: "h", unit: "px", max: 30, min: 0, overMoving: false,
			classes: "onyx-toggle-button-knob", ondragfinish: "knobDragFinish"}
	],
	create: function() {
		this.inherited(arguments);
		this.valueChanged();
		this.onContentChanged();
		this.offContentChanged();
		this.disabledChanged();
		this.animatedChanged();
	},
	valueChanged: function() {
		this.addRemoveClass("off", !this.value);
		this.$.contentOn.setShowing(this.value);
		this.$.contentOff.setShowing(!this.value);
		this.calculateSlidingBounds();
		if (this.animated) {
			if (this.value) {
				this.$.knob.animateToMax();
			} else {
				this.$.knob.animateToMin();
			}
		}
		this.setActive(this.value);
	},
	activeChanged: function() {
		this.setValue(this.active);
		this.bubble("onActivate");
	},
	onContentChanged: function() {
		this.$.contentOn.setContent(this.onContent || "");
		this.$.contentOn.addRemoveClass("empty", !this.onContent);
		this.calculateSlidingBounds();
		this.valueChanged();
	},
	offContentChanged: function() {
		this.$.contentOff.setContent(this.offContent || "");
		this.$.contentOff.addRemoveClass("empty", !this.onContent);
		this.calculateSlidingBounds();
		this.valueChanged();
	},
	disabledChanged: function() {
		this.addRemoveClass("disabled", this.disabled);
		this.$.knob.setDraggable(!this.disabled && this.animated);
	},
	animatedChanged: function() {
		this.addRemoveClass("onyx-toggle-button-animated", this.animated);
		this.$.knob.setDraggable(!this.disabled && this.animated);
		// When animated is set to false the knobs position should be determined by the css flow attributes
		if (!this.animated) {
			this.$.knob.setValue(0);
		}
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
	rendered: function() {
		// Do this after the Control has been rendered so that the sliding bounds can be calculated properly
		this.valueChanged();
	},
	// Calculate the maximum sliding position of the knob based on the controls bounds
	calculateSlidingBounds: function() {
		this.$.knob.setMax(this.getBounds().width-this.$.knob.getBounds().width-2);
	},
	dragstart: function(inSender, inEvent) {
		inEvent.preventNativeDefault();
		this.dragging = true;
		this.dragged = false;
	},
	drag: function(inSender, inEvent) {
		// Value shouldn't be updated while the knob is being dragged around
		if (this.dragging && (!this.animated || inSender != this.$.knob)) {
			var d = inEvent.dx;
			if (Math.abs(d) > 10) {
				this.updateValue(d > 0);
				this.dragged = true;
			}
		}
	},
	dragfinish: function(inSender, inEvent) {
		this.dragging = false;
		if (this.dragged) {
			inEvent.preventTap();
		}
	},
	knobDragFinish: function() {
		// Toggle the button when the user has finished dragging the knob. Since the Slidable kind always snaps into the opposite position
		// after dragging it doesn't matter where the knob is at this moment.
		if (this.animated) {
			this.updateValue(!this.value);
		}
	}
})

/**
	_onyx.Checkbox_ is a box that shows or hides a checkmark when clicked. The
	_onChange_ event is fired when the box is clicked. Call _getValue()_ to
	retrieve a boolean indicating whether the box is currently checked.

		{kind: "onyx.Checkbox", onchange: "checkboxClicked"}

		checkboxClicked: function(inSender) {
			if (inSender.getValue()) {
				this.log("I've been checked!");
			}
		}
*/
enyo.kind({
	name: "onyx.Checkbox",
	classes: "onyx-checkbox",
	//* @protected
	kind: enyo.Checkbox,
	tag: "div",
	handlers: {
		// prevent double onchange bubble in IE
		onclick: ""
	},
	tap: function(inSender, e) {
		if (!this.disabled) {
			this.setChecked(!this.getChecked());
			this.bubble("onchange");
		}
		return !this.disabled;
	},
	dragstart: function() {
		// Override enyo.Input dragstart handler, to allow drags to propagate for Checkbox
	}
});

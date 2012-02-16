/**
A box that shows or hides a check mark when clicked.
The onChange event is fired when it is clicked. Use getValue() to fetch
the checked status.

	{kind: "CheckBox", onChange: "checkboxClicked"}

	checkboxClicked: function(inSender) {
		if (inSender.getValue()) {
			 this.log("I've been checked!");
		}
	}
*/
enyo.kind({
	name: "onyx.Checkbox",
	classes: "onyx-checkbox",
	published: {
		value: false // event = {value:}
	},
	events: {
		/**
		The onChange event fires when the user checks or unchecks the checkbox,
		but not when the state is changed programmatically.
		*/
		onChange: ''
	},
	handlers: {
		ondown:"downHandler"
	},
	//* @protected
	create: function() {
		this.inherited(arguments);
		this.valueChanged();
	},
	contentChanged: function() {
	},
	valueChanged: function() {
		this.addRemoveClass("onyx-checkbox-checked", this.value);
	},
	downHandler: function(inSender, e) {
		if (!this.disabled) {
			this.setValue(!this.value);
			this.doChange({value:this.value});
		}
		return true;
	},
	tap: function(inSender, e) {
		return !this.disabled;
	}
});



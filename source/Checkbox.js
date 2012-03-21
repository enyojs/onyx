/**
	A box that shows or hides a check mark when clicked.
	The onChange event is fired when it is clicked. Use getValue() to fetch
	the checked status.
	
		{kind: "onyx.Checkbox", onChange: "checkboxClicked"}
	
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
		active: false,
		value: false,
		disabled: false
	},
	events: {
		/**
			The onChange event fires when the user checks or unchecks the checkbox,
			but not when the state is changed programmatically.
		*/
		onChange: ''
	},
	//* @protected
	handlers: {
		ondown:"downHandler"
	},
	create: function() {
		this.inherited(arguments);
		this.valueChanged();
		this.disabledChanged();
	},
	contentChanged: function() {
	},
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
	},
	valueChanged: function() {
		this.addRemoveClass("onyx-checkbox-checked", this.value);
		this.setActive(this.value);
	},
	activeChanged: function() {
		this.setValue(this.active);
		this.bubble("onActivate");
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



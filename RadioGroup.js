enyo.kind({
	name:"enyo.TabGroup",
	classes: "enyo-tab-group",
	defaultKind:"enyo.TabGroup.TabButton",
	published: {
		value: 0
	},
	create: function() {
		this.inherited(arguments);
		this.valueChanged(this.value);
	},
	valueChanged: function(oldValue) {
		var controls = this.getControls();
		if (oldValue !== undefined && controls[oldValue]) {
			controls[oldValue].removeClass('enyo-chosen');
		}
		if (controls[this.value]) {
			controls[this.value].addClass('enyo-chosen');
		}
	},
	tap: function(sender, event) {
		var idx = this.getControls().indexOf(sender);
		if (idx >= 0 && !sender.disabled) {
			this.setValue(idx);
		}
	}
});


enyo.kind({
	name:"enyo.TabGroup.TabButton", 
	classes:"enyo-tab-button",
	published: {
		disabled:false
	},
	create: function() {
		this.inherited(arguments);
		this.disabledChanged();
	},
	disabledChanged: function() {
		this.addRemoveClass("enyo-disabled", this.disabled);
	}
});

enyo.kind({
	name:"enyo.RadioGroup",
	kind:"enyo.TabGroup",
	classes: "enyo-radio-group"
});
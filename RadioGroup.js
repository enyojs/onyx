enyo.kind({
	name:"enyo.RadioGroup",
	classes: "enyo-radio-group",
	defaultKind:enyo.kind({classes:"enyo-radio-button"}),
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
		if(controls[this.value]) {
			controls[this.value].addClass('enyo-chosen');
		}
	},
	tap: function(sender, event) {
		this.setValue(this.getControls().indexOf(sender));
	}
	
	
});
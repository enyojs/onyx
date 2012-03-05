/* an item that contains icon, label and any input control, e.g. onyx.Checkbox, onyx.ToggleButton */
enyo.kind({
	name: "LabeledItem",
	published: {
		value: "",
		label: "",
		icon: ""
	},
	components: [
		{name: "icon", kind: "Image", classes: "labeled-item-icon"},
		{name: "label", kind: "Control"},
		{name: "input", classes: "label-item-input", ondragstart: "dragstart"}
	],
	defaultKind: "onyx.Checkbox",
	create: function() {
		this.inherited(arguments);
		this.valueChanged();
		this.labelChanged();
		this.iconChanged();
	},
	labelChanged: function() {
		this.$.label.setContent(this.label);
	},
	iconChanged: function() {
		this.$.icon.setSrc(this.icon);
	},
	getValue: function() {
		return this.$.input.getValue();
	},
	valueChanged: function() {
		this.$.input.setValue(this.value);
	},
	dragstart: function() {
		return true;
	}
});

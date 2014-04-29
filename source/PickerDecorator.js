/**
	_onyx.PickerDecorator_ is a control that loosely couples an
	[onyx.Picker](#onyx.Picker) with an activating
	[onyx.PickerButton](#onyx.PickerButton). The decorator must surround both the
	activating button and the picker itself. When the button is activated, the
	picker shows itself in the correct position relative to the activator.

		{kind: "onyx.PickerDecorator", components: [
			{}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
			{kind: "onyx.Picker", components: [
				{content: "Gmail", active: true},
				{content: "Yahoo"},
				{content: "Outlook"},
				{content: "Hotmail"}
			]}
		]}
 */
enyo.kind({
	name: "onyx.PickerDecorator",
	kind: "onyx.MenuDecorator",
	classes: "onyx-picker-decorator",
	defaultKind: "onyx.PickerButton",
	handlers: {
		onChange: "change"
	},
	change: function(inSender, inEvent) {
		this.waterfallDown("onChange", inEvent);
	}
});

enyo.kind({
	name: "onyx.PickerDecorator",
	kind: "onyx.MenuDecorator",
	classes: "onyx-picker-decorator",
	defaultKind: "onyx.PickerButton",
	handlers: {
		onSelect: "selected"
	},
	selected: function(inSender, inEvent) {
		this.waterfallDown("onSelect", inEvent);
	}
});

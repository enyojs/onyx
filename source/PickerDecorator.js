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

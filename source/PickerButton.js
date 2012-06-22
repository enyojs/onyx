enyo.kind({
	name: "onyx.PickerButton",
	kind: "onyx.Button",
	handlers: {
		onChange: "change"
	},
	change: function(inSender, inEvent) {
		this.setContent(inEvent.content);
	}
});
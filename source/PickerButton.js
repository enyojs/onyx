enyo.kind({
	name: "onyx.PickerButton",
	kind: "onyx.Button",
	handlers: {
		onSelect: "selected"
	},
	selected: function(inSender, inEvent) {
		this.setContent(inEvent.content);
	}
});
enyo.kind({
	name: "onyx.InputDecorator",
	kind: "onyx.FocusDecorator",
	classes: "onyx-input-decorator",
	published: {
		disabled: false
	},
	handlers: {
		onDisabledChange: "disabledHandler"
	},
	disabledHandler: function(inSender, inEvent) {
		this.addRemoveClass("onyx-disabled", inEvent.disabled);
	}
});
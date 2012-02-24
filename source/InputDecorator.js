enyo.kind({
	name: "onyx.InputDecorator",
	kind: "enyo.ToolDecorator",
	published: {
		disabled: false
	},
	tag: "label",
	classes: "onyx-input-decorator",
	handlers: {
		onDisabledChange: "disabledChange",
		onfocus: "receiveFocus",
		onblur: "receiveBlur"
	},
	receiveFocus: function() {
		this.addClass("onyx-focused");
	},
	receiveBlur: function() {
		this.removeClass("onyx-focused");
	},
	disabledChange: function(inSender, inEvent) {
		this.addRemoveClass("onyx-disabled", inEvent.originator.disabled);
	}
});
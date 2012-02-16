enyo.kind({
	name: "onyx.FocusDecorator",
	kind: "enyo.ToolDecorator",
	tag: "label",
	classes: "onyx-focus-decorator",
	handlers: {
		onfocus: "receiveFocus",
		onblur: "receiveBlur"
	},
	receiveFocus: function() {
		this.addClass("onyx-focused");
	},
	receiveBlur: function() {
		this.removeClass("onyx-focused");
	}
});

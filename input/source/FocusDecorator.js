enyo.kind({
	name: "onyx.FocusDecorator",
	tag: "label",
	kind: "enyo.ToolDecorator",
	classes: "onyx-focus-decorator",
	handlers: {
		onfocus: "receiveFocus",
		onblur: "receiveBlur"
	},
	receiveFocus: function() {
		this.log();
		this.addClass("focused");
	},
	receiveBlur: function() {
		this.log();
		this.removeClass("focused");
	}
});

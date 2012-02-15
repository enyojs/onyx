enyo.kind({
	name: "enyo.InputDecorator",
	// if we use label, clicking on stuff inside auto-focuses the input.
	tag: "label",
	kind: "enyo.ToolDecorator",
	classes: "enyo-input-decorator",
	handlers: {
		onfocus: "focus",
		onblur: "blur"
	},
	focus: function() {
		this.addClass("focused");
	},
	blur: function() {
		this.removeClass("focused");
	}
});
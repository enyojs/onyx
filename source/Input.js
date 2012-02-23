enyo.kind({
	name: "onyx.Input",
	kind: "enyo.Input",
	events: {
		onDisabledChange: ""
	},
	classes: "onyx-input",
	defaultFocus: false,
	rendered: function() {
		this.inherited(arguments);
		if (this.defaultFocus) {
			this.focus();
		}
	},
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
		this.bubble("onDisabledChange", this);
	}
});

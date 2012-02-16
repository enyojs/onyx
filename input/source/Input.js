enyo.kind({
	name: "onyx.Input",
	kind: "enyo.Input",
	defaultFocus: false,
	events: {
		onDisabledChange: ""
	},
	classes: "onyx-input",
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

enyo.kind({
	name: "enyo.ButtonDecorator",
	kind: "enyo.ToolDecorator",
	classes: "enyo-button-decorator enyo-unselectable",
	published: {
		disabled: false
	},
	tap: function(inSender, inEvent) {
		if (this.disabled) {
			return true;
		}
	},
	create: function() {
		this.inherited(arguments);
		this.disabledChanged();
	},
	disabledChanged: function() {
		this.setAttribute("disabled", this.disabled);
	}
});

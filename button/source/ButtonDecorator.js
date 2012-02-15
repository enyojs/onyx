enyo.kind({
	name: "enyo.ButtonDecorator",
	kind: "enyo.ToolDecorator",
	classes: "enyo-button-decorator",
	published: {
		disabled: false
	},
	handlers: {
		ontap: "tapHandler"
	},
	tapHandler: function(inSender, inEvent) {
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

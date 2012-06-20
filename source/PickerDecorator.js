enyo.kind({
	name: "onyx.PickerDecorator",
	kind: "onyx.MenuDecorator",
	classes: "onyx-picker-decorator",
	defaultKind: "onyx.PickerButton",
	handlers: {
		onSelect: "selected",
	},
	events: {
		onPickerItemSelected: ""
	},
	selected: function(inSender, inEvent) {
		this.waterfallDown("onSelect", inEvent);
	},
	menuItemSelected: function(inSender, inEvent){
		this.inherited(arguments);
		this.doPickerItemSelected(inEvent);
	}	
});

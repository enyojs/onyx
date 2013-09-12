/**
	_onyx.PickerButton_ is a button that, when tapped, shows an
	[onyx.Picker](#onyx.Picker). Once an item is selected, the list of items
	closes, but the item stays selected and the PickerButton displays the choice
	that was made.

	For more information, see the documentation on
	[Pickers](building-apps/controls/pickers.html) in the Enyo Developer Guide.
 */
enyo.kind({
	name: "onyx.PickerButton",
	kind: "onyx.Button",
	handlers: {
		onChange: "change"
	},
	change: function(inSender, inEvent) {
		if (inEvent.content !== undefined){
			this.setContent(inEvent.content);
		}
	}
});
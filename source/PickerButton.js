/**
 	onyx.PickerButton is a button that when tapped will	show a <a href="#onyx.Picker">onyx.Picker</a>. 
	Once an item is selected the list of items will close but the item will stay selected and the
	PickerButton will display the choice made.
 */
enyo.kind({
	name: "onyx.PickerButton",
	kind: "onyx.Button",
	handlers: {
		onChange: "change"
	},
	change: function(inSender, inEvent) {
		this.setContent(inEvent.content);
	}
});
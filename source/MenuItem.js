/**
 A menu item.

 The onMenuItemSelected event is generated when the user taps a menu item. Note that since any control may be used with a MenuDecorator, you will need to generate the onMenuItemSelected event from these other controls yourself if you would like the MenuDecorator to receive the event and automatically close the menu.
 */
enyo.kind({
	name: "onyx.MenuItem",
	kind: "enyo.Button",
	tag: "div",
	classes: "onyx-menu-item",
	events: {
		onMenuItemSelected: ""
	},	
	tap: function(inSender) {
		this.inherited(arguments);
		this.doMenuItemSelected();
	}
});
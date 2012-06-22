/**
 A menu item.
 */
enyo.kind({
	name: "onyx.MenuItem",
	kind: "enyo.Button",
	tag: "div",
	classes: "onyx-menu-item",
	events: {
		onSelect: ""
	},
	tap: function(inSender) {
		this.inherited(arguments);
		this.bubble("onRequestHideMenu");
		this.doSelect({selected:this, content:this.content});
	}
});
/**
	_MenuItem_ is a button styled to look like a menu item, intended for use in
	an <a href="#onyx.Menu">onyx.Menu</a>. When the MenuItem is tapped, it
	tells the menu to hide itself and sends an _onSelect_ event with its
	content and a reference to itself. This event and its properties may be
	received by a client application to determine which menu item was selected.

		enyo.kind({
			handlers: {
				onSelect: "itemSelected"
			},
			components: [
				{kind: "onyx.MenuDecorator", components: [
					{content: "Open Menu (floating)"},
					{kind: "onyx.Menu", floating: true, components: [
						{content: "1"},
						{content: "2"},
						{classes: "onyx-menu-divider"},
						{content: "Label", classes: "onyx-menu-label"},
						{content: "3"},
					]}
				]}
			],
			itemSelected: function(inSender, inEvent) {
				enyo.log("Menu Item Selected: " + inEvent.originator.content);
			}
		})
 */
enyo.kind({
	name: "onyx.MenuItem",
	kind: "enyo.Button",
	events: {
		/**
			Fires when the menu item is selected.

			_inEvent.selected_ contains a reference to the menu item.

			_inEvent.content_ contains the menu item's content.
		*/
		onSelect: "",
		/**
			Fires when the content of an item changes.

			_inEvent.content_ contains the content of the item.
		*/
		onItemContentChange: ""
	},
	//* @protected
	classes: "onyx-menu-item",
	tag: "div",
	create: function(){
		this.inherited(arguments);
		if (this.active){
			this.bubble("onActivate");
		}
	},
	tap: function(inSender) {
		this.inherited(arguments);
		this.bubble("onRequestHideMenu");
		this.doSelect({selected:this, content:this.content});
	},
	contentChanged: function(inOld){
		this.inherited(arguments);
		this.doItemContentChange({content: this.content});
	}
});
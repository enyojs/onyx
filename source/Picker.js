/**
 	onyx.Picker is a sub-kind of <a href="#onyx.Menu">onyx.Menu</a> and it is used to display
 	a list of items that can be selected. It is meant to be used in conjunction with a 
	<a href="#onyx.PickerDecorator">onyx.PickerDecorator</a>. The decorator loosely couples a
	<a href="#onyx.PickerButton">onyx.PickerButton</a> which is a button that when tapped will
	show the picker. Once an item is selected the list of items will close but the item will stay
	selected and the PickerButton will display the choice made.
	
	To initialize the Picker to a value you can use set the active property on the item that should
	initially be selected.
	
		{kind: "onyx.PickerDecorator", components: [
			{}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
			{kind: "onyx.Picker", components: [
				{content: "Gmail", active: true},
				{content: "Yahoo"},
				{content: "Outlook"},
				{content: "Hotmail"}
			]}
		]}
	
	Picker uses <a href="#onyx.MenuItems">onyx.MenuItems</a> for each item in the list and so an
	onSelect event with the item can be received by a client application to determine which picker
	item was selected.
 */
enyo.kind({
	name: "onyx.Picker",
	kind: "onyx.Menu",
	classes: "onyx-picker enyo-unselectable",
	published: {
		selected: null,
		maxHeight: "200px"
	},
	events: {
		onChange: ""
	},
	components: [
		{name: "client", kind: "enyo.Scroller", strategyKind: "TouchScrollStrategy"}
	],
	floating: true,
	showOnTop: true,
	scrollerName: "client",
	create: function() {
		this.inherited(arguments);
		this.maxHeightChanged();
	},
	getScroller: function() {
		return this.$[this.scrollerName];
	},
	maxHeightChanged: function() {
		this.getScroller().setMaxHeight(this.maxHeight);
	},
	showingChanged: function() {
		this.getScroller().setShowing(this.showing);
		this.inherited(arguments);
		if (this.showing && this.selected) {
			this.scrollToSelected();
		}
	},
	scrollToSelected: function() {
		this.getScroller().scrollToControl(this.selected, !this.menuUp);
	},
	itemActivated: function(inSender, inEvent) {
		this.processActivatedItem(inEvent.originator)
		return this.inherited(arguments);
	},
	processActivatedItem: function(inItem) {
		if (inItem.active) {
			this.setSelected(inItem);
		}
	},
	selectedChanged: function(inOld) {
		if (inOld) {
			inOld.removeClass("selected");
		}
		if (this.selected) {
			this.selected.addClass("selected");
			this.doChange({selected: this.selected, content: this.selected.content});
		};
	},
	resizeHandler: function() {
		this.inherited(arguments);			
		this.adjustPosition(false);
	}
});

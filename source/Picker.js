/**
	_onyx.Picker_, a subkind of <a href="#onyx.Menu">onyx.Menu</a>, is used to
	display	a list of items that can be selected. It is meant to be used in
	conjunction with an	<a href="#onyx.PickerDecorator">onyx.PickerDecorator</a>.
	The decorator loosely couples the picker with an
	<a href="#onyx.PickerButton">onyx.PickerButton</a>--a button that, when
	tapped, shows the picker. Once an item is selected, the list of items closes,
	but the item stays selected and the PickerButton displays the choice that
	was made.

	To initialize the Picker to a particular value, set the _active_ property to
	true for the item that should be selected.
	
		{kind: "onyx.PickerDecorator", components: [
			{}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
			{kind: "onyx.Picker", components: [
				{content: "Gmail", active: true},
				{content: "Yahoo"},
				{content: "Outlook"},
				{content: "Hotmail"}
			]}
		]}

	Each item in the list is an <a href="#onyx.MenuItem">onyx.MenuItem</a>, so
	an _onSelect_ event with the item can be listened to by a client application
	to determine which picker item was selected.
	
	For more information, see the documentation on
	<a href="https://github.com/enyojs/enyo/wiki/Pickers">Pickers</a> in the
	Enyo Developer Guide.
 */
enyo.kind({
	name: "onyx.Picker",
	kind: "onyx.Menu",
	classes: "onyx-picker enyo-unselectable",
	published: {
		//* Currently selected item, if any
		selected: null
	},
	events: {
		/**
			Fires when the currently selected item changes.
			
			_inEvent.selected_ contains the currently selected item.
			
			_inEvent.content_ contains the content of the currently selected item.
		*/
		onChange: ""
	},
	/**
		Set to true to render the picker in a floating layer outside of other
		controls. This can be used to guarantee that the picker will be shown
		on top of other controls.
	*/
	floating: true,
	//* @protected
	// overrides default value from onyx.Menu
	showOnTop: true,
	initComponents: function() {
		this.setScrolling(true);
        this.inherited(arguments);
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
		this.processActivatedItem(inEvent.originator);
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
		}
	},
	resizeHandler: function() {
		this.inherited(arguments);			
		this.adjustPosition();
	}
});

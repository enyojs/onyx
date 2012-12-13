/**
	_onyx.FlyweightPicker_, a subkind of <a href="#onyx.Picker">onyx.Picker</a>,
	is a picker	that employs the flyweight pattern. It is used to display a
	large list of selectable items.	As with
	<a href="#enyo.FlyweightRepeater">enyo.FlyweightRepeater</a>,
	the _onSetupItem_ event allows for customization of item rendering.

	To initialize the FlyweightPicker to a particular value, call _setSelected_
	with the index of the item you wish to select, and call _setContent_ with
	the item that should be shown in the activator button.

	FlyweightPicker will send an _onSelect_ event with a selected item's
	information. This can be received by a client application to determine which
	item was selected.

		enyo.kind({
			handlers: {
				onSelect: "itemSelected"
			},
			components: [
				{kind: "onyx.PickerDecorator", components: [
					{},
					{name: "yearPicker", kind: "onyx.FlyweightPicker", count: 200,
						onSetupItem: "setupYear", components: [
							{name: "year"}
						]
					}
				]}
			],
			create: function() {
				var d = new Date();
				var y = d.getYear();
				this.$.yearPicker.setSelected(y);
				this.$.year.setContent(1900+y);
			},
			setupYear: function(inSender, inEvent) {
				this.$.year.setContent(1900+inEvent.index);
			},
			itemSelected: function(inSender, inEvent) {
				enyo.log("Picker Item Selected: " + inEvent.selected.content);
			}
		})
 */
enyo.kind({
	name: "onyx.FlyweightPicker",
	kind: "onyx.Picker",
	classes: "onyx-flyweight-picker",
	published: {
		//* How many rows to render
		count: 0
	},
	events: {
		/**
			Fires when a row is being initialized. The _index_ property contains
			the row index, while the _flyweight_ property contains the row
			control, for decoration.
		*/
		onSetupItem: "",
		/**
			Fires when an item is selected. The _content_ property contains the
			content of the selected item, while the _index_ property contains
			its row index.
		*/
		onSelect: ""
	},
	//* @protected
	handlers: {
		onSelect: "itemSelect"
	},
	components: [
		{name: "scroller", kind: "enyo.Scroller", strategyKind: "TouchScrollStrategy", components: [
			{name: "flyweight", kind: "FlyweightRepeater", ontap: "itemTap"}
		]}
	],
	scrollerName: "scroller",
	initComponents: function() {
		this.controlParentName = 'flyweight';
        this.inherited(arguments);
		//Force the flyweight's client control (MenuItem is default) to activate. This will
		//result in a call to processActivatedItem which preps our picker selection logic.
		//This is a workaround for changes caused by ENYO-1609 which resulted in ENYO-1611.
		this.$.flyweight.$.client.children[0].setActive(true);
    },
	create: function() {
		this.inherited(arguments);
		this.countChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.selectedChanged();
	},
	scrollToSelected: function() {
		var n = this.$.flyweight.fetchRowNode(this.selected);
		this.getScroller().scrollToNode(n, !this.menuUp);
	},
	countChanged: function() {
		this.$.flyweight.count = this.count;
	},
	processActivatedItem: function(inItem) {
		this.item = inItem;
	},
	selectedChanged: function(inOld) {
		if (!this.item) {
			return;
		}
		if (inOld !== undefined) {
			this.item.removeClass("selected");
			this.$.flyweight.renderRow(inOld);
		}
		this.item.addClass("selected");
		this.$.flyweight.renderRow(this.selected);
		// need to remove the class from control to make sure it won't apply to other rows
		this.item.removeClass("selected");
		var n = this.$.flyweight.fetchRowNode(this.selected);
		this.doChange({selected: this.selected, content: n && n.textContent || this.item.content});
	},
	itemTap: function(inSender, inEvent) {
		this.setSelected(inEvent.rowIndex);
		//Send the select event that we want the client to receive.
		this.doSelect({selected: this.item, content: this.item.content});
	},
	itemSelect: function(inSender, inEvent) {
		//Block all select events that aren't coming from this control. This is to prevent select events from MenuItems since they won't have the correct value in a Flyweight context.
		if (inEvent.originator != this) {
			return true;
		}
	}
});

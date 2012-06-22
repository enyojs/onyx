enyo.kind({
	name: "onyx.FlyweightPicker",
	kind: "onyx.Picker",
	classes: "onyx-flyweight-picker",
	published: {
		//* How many rows to render
		count: 0
	},
	events: {
		//* Sends the row index, and the row control, for decoration
		onSetupItem: "",
		onSelect: ""
	},
	handlers: {
		onSelect: "itemSelect"
	},
	components: [
		{name: "scroller", kind: "enyo.Scroller", strategyKind: "TouchScrollStrategy", components: [
			{name: "client", kind: "FlyweightRepeater", ontap: "itemTap"}
		]}
	],
	scrollerName: "scroller",
	create: function() {
		this.inherited(arguments);
		this.countChanged();
	},
	rendered: function() {
		this.inherited(arguments);
		this.selectedChanged();
	},
	scrollToSelected: function() {
		var n = this.$.client.fetchRowNode(this.selected);
		this.getScroller().scrollToNode(n, !this.menuUp);
	},
	countChanged: function() {
		this.$.client.count = this.count;
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
			this.$.client.renderRow(inOld);
		}
		this.item.addClass("selected");
		this.$.client.renderRow(this.selected);
		// need to remove the class from control to make sure it won't apply to other rows
		this.item.removeClass("selected");
		var n = this.$.client.fetchRowNode(this.selected);
		this.doChange({selected: this.selected, content: n && n.textContent || this.item.content});
	},
	itemTap: function(inSender, inEvent) {
		this.setSelected(inEvent.rowIndex);
		//Send the select event that we want the client to receive.
		this.doSelect({selected: this.item, content: this.item.content})
	},
	itemSelect: function(inSender, inEvent) {
		//Block all select events that aren't coming from this control. This is to prevent select events from MenuItems since they won't have the correct value in a Flyweight context.
		if (inEvent.originator != this) {
			return true;
		}
	}
});

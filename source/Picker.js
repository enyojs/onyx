enyo.kind({
	name: "onyx.Picker",
	kind: "onyx.Menu",
	classes: "onyx-picker enyo-unselectable",
	published: {
		selected: null,
		maxHeight: "200px"
	},
	events: {
		onSelect: ""
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
			this.doSelect({selected: this.selected, content: this.selected.content});
		}
	}
});

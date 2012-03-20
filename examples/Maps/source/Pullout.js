enyo.kind({
	name: "Pullout",
	kind: "onyx.Slideable",
	events: {
		onDropPin: "",
		onShowTraffic: "",
		onMapTypeSelect: "",
		onBookmarkSelect: ""
	},
	components: [
		{name: "shadow", classes: "pullout-shadow"},
		{kind: "onyx.Grabber", classes: "pullout-grabbutton"},
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{name: "client", classes: "pullout-toolbar"},
			{fit: true, style: "position: relative;", components: [
				{name: "info", kind: "Scroller", classes: "enyo-fit", components: [
					{kind: "onyx.Groupbox", classes: "settings", components: [
						{kind: "onyx.GroupboxHeader", content: "General"},
						{kind: "LabeledItem", label: "Show Drop Pin", icon: "images/icon-dropPin.png", defaultKind: "onyx.ToggleButton", onChange: "dropPinChange"},
						{kind: "LabeledItem", label: "Show Traffic", icon: "images/icon-traffic.png", defaultKind: "onyx.ToggleButton", onChange: "showTrafficChange"}
					]},
					{name: "mapType", kind: "Group", classes: "onyx-groupbox settings", highlander: true, onChange: "mapTypeChange", components: [
						{kind: "onyx.GroupboxHeader", content: "Map Type"},
						{kind: "LabeledItem", label: "Road", mapType: "road", icon: "images/map-type-road.png", value: true},
						{kind: "LabeledItem", label: "Satellite", mapType: "aerial", icon: "images/map-type-satellite.png"},
						{kind: "LabeledItem", label: "Bird's Eye", mapType: "birdseye", icon: "images/map-type-bird-eye.png"}
					]}
				]},
				{name: "bookmark", kind: "FittableRows", showing: false, classes: "enyo-fit", components: [
					{kind: "onyx.RadioGroup", classes: "bookmark-header", components: [
						{content: "Saved", active: true},
						{content: "Recents"}
					]},
					{fit: true, kind: "Scroller", classes: "bookmark-scroller", ondragfinish: "preventDragTap", components: [
						{kind: "BookmarkList", onItemSelect: "itemSelect"}
					]}
				]}
			]}
		]}
	],
	max: 100,
	value: 100,
	unit: "%", 
	toggle: function(inPanelName) {
		var t = this.$[inPanelName];
		if (t.showing && this.isAtMin()) {
			this.animateToMax();
		} else {
			this.animateToMin();
			this.$.info.hide();
			this.$.bookmark.hide();
			t.show();
			t.resized();
		}
	},
	valueChanged: function() {
		this.inherited(arguments);
		this.$.shadow.setShowing(this.value !== this.max);
	},
	dropPinChange: function(inSender) {
		this.doDropPin({value: inSender.getValue()});
	},
	showTrafficChange: function(inSender) {
		this.doShowTraffic({value: inSender.getValue()});
	},
	mapTypeChange: function(inSender, inEvent) {
		var o = inEvent.originator;
		this.doMapTypeSelect({mapType: o.parent.mapType});
	},
	itemSelect: function(inSender, inItem) {
		this.doBookmarkSelect(inItem);
	},
	preventDragTap: function(inSender, inEvent) {
		inEvent.preventTap();
	}
})

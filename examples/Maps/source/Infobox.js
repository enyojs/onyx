enyo.kind({
	name: "Infobox",
	kind: "onyx.Popup",
	classes: "infobox",
	published: {
		title: "",
		details: ""
	},
	floating: true,
	components: [
		{name: "title"},
		{name: "details", classes: "infobox-details"}
	],
	create: function() {
		this.inherited(arguments);
		this.titleChanged();
		this.detailsChanged();
	},
	titleChanged: function() {
		this.$.title.setContent(this.title);
	},
	detailsChanged: function() {
		this.$.details.setContent(this.details);
	},
	openAt: function(inTop, inLeft) {
		this.applyStyle("top", inTop + "px");
		this.applyStyle("left", inLeft + "px");
		this.show();
	},
	openWithItem: function(inItem, inTop, inLeft) {
		this.setTitle(inItem.Title);
		this.setDetails(inItem.Address);
		this.openAt(inTop, inLeft);
	}
})

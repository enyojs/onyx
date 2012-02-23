enyo.kind({
	name: "BookmarkList",
	classes: "bookmark-list",
	create: function() {
		this.inherited(arguments);
		for (var i=0; i<100; i++) {
			this.createComponent({kind: "BookmarkItem", title: "Starbucks Store #" + i, details: "A Street, San Francisco, CA"});
		}
	}
});

enyo.kind({
	name: "BookmarkItem",
	classes: "bookmark-item",
	published: {
		title: "",
		details: ""
	},
	components: [
		{name: "title", classes: "bookmark-item-title"},
		{name: "details", classes: "bookmark-item-details"}
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
	}
})

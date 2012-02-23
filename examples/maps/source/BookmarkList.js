mock_bookmarks = [
	{title: "Blue Bottle Cafe", details: "66 Mint Street, San Francisco, CA", location: {latitude: 37.782442, longitude: -122.407467}},
	{title: "Thirsty Bear Brewing", details: "661 Howard Street, San Francisco, CA", location: {latitude: 37.785485, longitude: -122.399698}},
	{title: "South Park Cafe", details: "108 South Park Street, San Francisco, CA", location: {latitude: 37.781561, longitude: -122.394318}},
	{title: "Golden Boy Pizza", details: "542 Green Street, San Francisco, CA", location: {latitude: 37.799632, longitude: -122.407921}}
]

enyo.kind({
	name: "BookmarkList",
	classes: "bookmark-list",
	events: {
		onItemSelect: ""
	},
	create: function() {
		this.inherited(arguments);
		for (var i=0; i<100; i++) {
			var b = mock_bookmarks[i%4];
			this.createComponent({kind: "BookmarkItem",
				ontap: "doItemSelect",
				}, b);
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

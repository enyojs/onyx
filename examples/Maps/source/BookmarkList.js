enyo.kind({
	name: "BookmarkList",
	classes: "bookmark-list",
	events: {
		onItemSelect: ""
	},
	create: function() {
		this.inherited(arguments);
		for (var i=0; i<100; i++) {
			var b = mock_data[i % mock_data.length];
			this.createComponent({kind: "BookmarkItem",
				ontap: "itemTap",
				}, b);
		}
	},
	itemTap: function(inSender) {
		if (this.activated) {
			this.activated.applyStyle("background", null);
		}
		this.activated = inSender;
		this.activated.applyStyle("background", "lightblue");
		this.doItemSelect(inSender);
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

var bookmarks = [
	{title: "Enyo", url: "http://www.enyojs.com"},
	{title: "TheVerge", url: "http://www.theverge.com"},
	{title: "Engadget", url: "http://www.endgadget.com"},
	{title: "Ars Technica", url: "http://www.arstechnica.com"},
];

enyo.kind({
	name: "App",
	classes: "onyx",
	style: "background-color: #eaeaea;",
	components: [
		{kind: "Rows", classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", components: [
				{kind: "onyx.Grabber", style: "float: left"},
				{name: "bookmarksButton", kind: "onyx.Button", content: "B", ontap: "toggleBookmarks", style: "float: left;"},
				{kind: "onyx.Button", content: "&laquo;", ontap: "back", style: "float: left;"},
				{kind: "onyx.Button", content: "&raquo;", ontap: "forward", style: "float: left;"},
				{kind: "onyx.Button", content: "Go", ontap: "goTap", input: "input2", style: "float: right;"},
				{kind: "onyx.InputDecorator", style: "overflow: hidden; display: block;", components: [
					{kind: "onyx.Input", style: "width: 100%;", onchange: "inputChange", placeholder: "Enter a url", onfocus: "inputFocus"}
				]}
			]},
			{fit: true, kind: "Cols", components: [
				{name: "bookmarks", kind: "Rows", style: "width: 300px; border-right: 1px solid silver;", components: [
					{name: "titleDecorator", kind: "onyx.InputDecorator", style: "display: block; margin: 4px; padding: 8px;", components: [
						{name: "titleInput", kind: "onyx.Input", placeholder: "Enter a title", style: "width: 220px; margin-right: 4px;"},
						{kind: "onyx.Button", content: "+", ontap: "addBookmark", style: "background-color: lightgreen; color: white; font-weight: bold;"},
						
					]},
					{fit: true, kind: "Scroller", name: "list"},
					{style: "text-align: right;", components: [
						{kind: "onyx.Button", content: "-", ontap: "deleteBookmark", style: "margin: 4px; background-color: #ff3333; color: white; font-weight: bold;"}
					]}
				]},
				{fit: true, name: "iframe", tag: "iframe", classes: "frame", onload: "frameload", attributes: {onload: enyo.bubbler}, style: "background: white;"}
			]}
		]}
	],
	rowItem: {kind: "Control", style: "border-bottom: 1px solid silver; padding: 10px;", ontap: "rowTap"},
	create: function() {
		this.inherited(arguments);
		// FIXME: label gotcha with button
		this.$.titleDecorator.setAttribute("for", this.$.titleInput.getId());
		//
		this.setBookmarksShowing(this.$.bookmarksButton.active);
	},
	inputChange: function(inSender) {
		this.goto(inSender.getValue());
	},
	inputFocus: function(inSender) {
		if (!inSender.getValue()) {
			inSender.setValue("http://");
		}
	},
	goto: function(inUrl) {
		this.$.input.setValue(inUrl);
		this.$.iframe.setSrc(inUrl);
	},
	frameload: function(inSender) {
		this.log();
	},
	goTap: function() {
		this.goto(this.$.input.getValue());
	},
	back: function() {
		this.$.iframe.hasNode().contentWindow.history.back();
	},
	forward: function() {
		this.$.iframe.hasNode().contentWindow.history.forward();
	},
	setBookmarksShowing: function(inShow) {
		this.$.bookmarks.setShowing(inShow);
		this.resized();
	},
	toggleBookmarks: function(inSender) {
		inSender.down = !inSender.down;
		inSender.setActive(inSender.down);
		inSender.addRemoveClass("active", inSender.active);
		this.renderBookmarks();
		this.setBookmarksShowing(inSender.active);
	},
	storageItemName: "browser_bookmarks",
	renderBookmarks: function() {
		var s = this.storageItemName;
		this.$.list.destroyClientControls();
		this.bookmarks = enyo.json.parse(localStorage.getItem(s));
		if (!this.bookmarks) {
			this.saveBookmarks(bookmarks);
			this.bookmarks = bookmarks;
		}
		for (var i=0, c; c=this.bookmarks[i]; i++) {
			this.createComponent(this.rowItem, {container: this.$.list, content: c.title, url: c.url, index: i});
		}
		this.$.list.render();
	},
	addBookmark: function() {
		this.log();
		var t = this.$.titleInput.getValue();
		var u = this.$.input.getValue();
		if (t && u) {
			this.bookmarks.push({title: t, url: u});
			this.saveBookmarks(this.bookmarks);
			this.renderBookmarks();
		}
	},
	deleteBookmark: function() {
		if (this.activated) {
			enyo.remove(this.bookmarks[this.activated.index], this.bookmarks);
			this.activated = null;
			this.saveBookmarks(this.bookmarks);
			this.renderBookmarks();
		}
	},
	saveBookmarks: function(inBookmarks) {
		localStorage.setItem(this.storageItemName, enyo.json.stringify(inBookmarks));
	},
	rowTap: function(inSender, inEvent) {
		if (this.activated) {
			this.activated.applyStyle("background", null);
		}
		this.activated = inSender;
		this.activated.applyStyle("background", "lightblue");
		this.goto(inSender.url);
	}
});

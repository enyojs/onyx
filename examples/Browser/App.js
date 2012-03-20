var bookmarks = [
	{title: "Enyo", url: "http://www.enyojs.com"},
	{title: "TheVerge", url: "http://www.theverge.com"},
	{title: "Engadget", url: "http://www.engadget.com"},
	{title: "Ars Technica", url: "http://www.arstechnica.com"}
];

enyo.kind({
	name: "App",
	classes: "onyx",
	style: "background-color: #eaeaea;",
	components: [
		{kind: "FittableRows", classes: "enyo-fit", components: [
			{kind: "onyx.Toolbar", components: [
				{name: "bookmarksButton", kind: "onyx.IconButton", src: "images/menu-icon-bookmark.png", ontap: "toggleBookmarks", style: "float: left;"},
				{kind: "onyx.IconButton", src: "images/menu-icon-back.png", ontap: "back", style: "float: left;"},
				{kind: "onyx.IconButton", src: "images/menu-icon-forward.png", ontap: "forward", style: "float: left; margin-right: 8px;"},
				{kind: "onyx.Button", content: "Go", ontap: "goTap", input: "input2", style: "float: right;"},
				{kind: "onyx.InputDecorator", style: "overflow: hidden; display: block;", components: [
					{kind: "onyx.Input", style: "width: 100%;", onchange: "inputChange", placeholder: "Enter a url", onfocus: "inputFocus"}
				]}
			]},
			{fit: true, kind: "FittableColumns", components: [
				{name: "bookmarks", kind: "FittableRows", style: "width: 300px; border-right: 1px solid silver;", components: [
					{name: "titleDecorator", kind: "onyx.InputDecorator", style: "display: block; margin: 4px; padding: 8px;", components: [
						{name: "titleInput", kind: "onyx.Input", placeholder: "Enter a title", style: "width: 210px; margin-right: 4px;"},
						{kind: "onyx.IconButton", src: "images/menu-icon-add.png", ontap: "addBookmark", style: "float: right;"}
						
					]},
					{fit: true, kind: "Scroller", name: "list"},
					{style: "text-align: right;", classes: "onyx-toolbar-inline", components: [
						{kind: "onyx.Button", ontap: "deleteBookmark", content: "Delete Selected"}
					]}
				]},
				{fit: true, name: "iframe", tag: "iframe", classes: "frame", onload: "frameload", attributes: {onload: enyo.bubbler}, style: "background: white;"}
			]}
		]}
	],
	rowItem: {kind: "Control", style: "border-bottom: 1px solid silver; padding: 10px;", ontap: "rowTap"},
	create: function() {
		this.inherited(arguments);
		this.$.titleDecorator.setAttribute("for", this.$.titleInput.getId());
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
	},
	goTap: function() {
		this.goto(this.$.input.getValue());
	},
	back: function() {
		if (this.$.iframe.hasNode()) {
			this.$.iframe.node.contentWindow.history.back();
		}
	},
	forward: function() {
		if (this.$.iframe.hasNode()) {
			this.$.iframe.node.contentWindow.history.forward();
		}
	},
	setBookmarksShowing: function(inShow) {
		this.$.bookmarks.setShowing(inShow)
		if (this.hasNode()) {
			this.resized();
		}
	},
	toggleBookmarks: function(inSender) {
		inSender.down = !inSender.down;
		inSender.addRemoveClass("active", inSender.down);
		this.renderBookmarks();
		this.setBookmarksShowing(inSender.down);
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

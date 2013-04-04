/**
	_onyx.Submenu_ is a control that collapses several menu items into a drawer,
	which can be opened and closed by tapping on its label. It is meant to be
	placed inside an <a href="#onyx.Menu">onyx.Menu</a>.

		{kind: "onyx.MenuDecorator", components:[
			{content: "Open menu"},
			{kind: "onyx.Menu", components:[
				{content: "One"},
				{content: "Two"},
				{kind: "onyx.Submenu", content: "Sort by...", components: [
					{content: "A"},
					{content: "B"},
					{content: "C"}
				]},
				{content: "Three"}
			]}
		]}
 */
enyo.kind({
	name: "onyx.Submenu",
	defaultKind: "onyx.MenuItem",
	initComponents: function() {
		this.createChrome([
			{
				name: "label",
				kind: "enyo.Control",
				classes: "onyx-menu-item",
				content: this.content || this.name,
				isChrome: true,
				ontap: "toggleOpen"
			},
			{kind: "onyx.Drawer", name: "client", classes: "client onyx-submenu", isChrome: true, open: false}
		]);

		this.inherited(arguments);
	},
	//* @public
	toggleOpen: function() {
		this.setOpen(!this.getOpen());
	},
	setOpen: function(open) {
		this.$.client.setOpen(open);
	},
	getOpen: function() {
		return this.$.client.getOpen();
	}
});

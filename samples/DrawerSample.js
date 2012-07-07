enyo.kind({
	name: "onyx.sample.DrawerSample",
	classes: "onyx onyx-sample box",
	stretch: true,
	components: [
		{content: "Above Drawer #1", classes: "box mtb"},
		{name: "drawer", kind: "onyx.Drawer", components: [
			{content: "Drawer #1<br>Drawer #1<br>Drawer #1<br>Drawer #1", allowHtml: true, classes: "box mtb"}
		]},
		{content: "Below Drawer #1<br>Below Drawer #1", allowHtml: true, classes: "box mtb"},
		{kind: "FittableColumns", fit: true, classes: "box mtb o", ontap: "columnsTap", components: [
			{content: "111111111111111", classes: "box mlr"},
			{name: "columnsDrawer", orient: "h", kind: "onyx.Drawer", open: false, components: [
				{content: "Drawer", classes: "box mlr"},
			]},
			{content: "2", fit: true, classes: "box mlr o"},
			{content: "3333333", classes: "box mlr"}
		]},
		{content: "Bat", classes: "box mtb"}
	],
	tap: function() {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},
	columnsTap: function() {
		this.$.columnsDrawer.setOpen(!this.$.columnsDrawer.open);
		return true;
	}
});

enyo.kind({
	name: "onyx.sample.DrawerSample",
	classes: "onyx drawer-sample",
	components: [
		{content: "Drawers", classes:"drawer-sample-divider"},
		{content: "Activate (V)", classes: "drawer-sample-box drawer-sample-mtb", ontap:"activateDrawer"},
		{name: "drawer", kind: "onyx.Drawer", components: [
			{content: "Vertical Drawer<br>Vertical Drawer<br>Vertical Drawer<br>Vertical Drawer", allowHtml: true, classes: "drawer-sample-box drawer-sample-mtb"}
		]},
		{content: "Foo<br>Foo", allowHtml: true, classes: "drawer-sample-box drawer-sample-mtb"},
		{kind: "FittableColumns", fit: true, ontap: "activateColumnsDrawer", classes: "drawer-sample-box drawer-sample-mtb drawer-sample-o", components: [
			{content: "Activate (H)", classes: "drawer-sample-box drawer-sample-mlr"},
			{name: "columnsDrawer", orient: "h", kind: "onyx.Drawer", open: false, components: [
				{content: "H-Drawer", classes: "drawer-sample-box drawer-sample-mlr"},
			]},
			{content: "Foo", fit: true, classes: "drawer-sample-box drawer-sample-mlr drawer-sample-o"},
			{content: "Foo", classes: "drawer-sample-box drawer-sample-mlr"}
		]},
		{content: "Foo", classes: "drawer-sample-box drawer-sample-mtb"}
	],
	activateDrawer: function() {
		this.$.drawer.setOpen(!this.$.drawer.open);
	},
	activateColumnsDrawer: function() {
		this.$.columnsDrawer.setOpen(!this.$.columnsDrawer.open);
		return true;
	}
});

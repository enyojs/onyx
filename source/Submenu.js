/**
 	_onyx.Submenu_ is a control that exposes a drawer full of menu items. It is
	meant to be placed inside an <a href="#onyx.Menu">onyx.Menu</a>. When the
	item is tapped, its submenu items are revealed or hidden.
 */
enyo.kind({
	name:"onyx.Submenu",
	defaultKind:"onyx.MenuItem",
	initComponents: function()
	{
		var owner = this.getInstanceOwner();
		this.createChrome([
			{
				name:"label",
				kind:"enyo.Control",
				classes:"onyx-menu-item",
				content:this.content || this.name,
				isChrome:true,
				ontap:"toggleOpen"
			},
			{kind:"onyx.Drawer", name:"client", classes:"client onyx-submenu", isChrome:true, open:false},
		]);

		this.inherited(arguments);
	},
	toggleOpen:function()
	{
		this.setOpen(!this.getOpen());
	},
	setOpen:function(open)
	{
		this.$.client.setOpen(open);
	},
	getOpen:function()
	{
		return this.$.client.getOpen();
	}
});

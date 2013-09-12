/**
	_onyx.Toolbar_ is a horizontal bar containing controls used to perform common
	UI actions.

	A toolbar customizes the styling of the controls it hosts, including buttons,
	icons, and inputs.

		{kind: "onyx.Toolbar", components: [
			{kind: "onyx.Button", content: "Favorites"},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", placeholder: "Enter a search term..."}
			]},
			{kind: "onyx.IconButton", src: "go.png"}
		]}

	For more information, see the documentation on
	[Toolbars](building-apps/controls/toolbars.html) in the Enyo Developer Guide.
*/
enyo.kind({
	name: "onyx.Toolbar",
	classes: "onyx onyx-toolbar onyx-toolbar-inline",
	create: function(){
		this.inherited(arguments);

		//workaround for android 4.0.3 rendering glitch (ENYO-674)
		if (this.hasClass('onyx-menu-toolbar') && (enyo.platform.android >= 4)){
			this.applyStyle("position", "static");
		}
	}
});
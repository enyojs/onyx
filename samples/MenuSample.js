enyo.kind({
	name: "onyx.sample.MenuSample",
	kind: "Control",
	classes: "onyx onyx-sample",
	fit:true,
	handlers: {
		onSelect: "itemSelected"
	},
	components: [
		{style: "padding: 10px;", content: "Some popups in a toolbar:"},
		{kind: "onyx.MoreToolbar", classes: "onyx-menu-toolbar", components: [
			{kind: "onyx.TooltipDecorator", components: [
				{kind: "onyx.Button", content: "Tooltip"},
				{kind: "onyx.Tooltip", content: "I'm a tooltip for a button."}
			]},
			{kind: "onyx.TooltipDecorator", components: [
				{kind: "onyx.InputDecorator", components: [
					{kind: "onyx.Input", placholder: "Just an input..."}
				]},
				{kind: "onyx.Tooltip", content: "I'm a tooltip for an input."}
			]},
			{kind: "onyx.MenuDecorator", components: [
				{content: "Bookmarks menu"},
				{kind: "onyx.Tooltip", content: "Tap to open..."},
				{kind: "onyx.Menu", components: [
					{components: [
						{kind: "onyx.IconButton", src: "assets/menu-icon-bookmark.png"},
						{content: "Bookmarks"}
					]},
					{content: "Favorites"},
					{classes: "onyx-menu-divider"},
					{content: "Recents"},
				]}
			]},
			{kind: "onyx.MenuDecorator", components: [
				{kind: "onyx.IconButton", src: "assets/menu-icon-bookmark.png"},
				{kind: "onyx.Tooltip", content: "Bookmarks menu"},
				{kind: "onyx.Menu", components: [
					{components: [
						{kind: "onyx.IconButton", src: "assets/menu-icon-bookmark.png"},
						{content: "Bookmarks"}
					]},
					{content: "Favorites"},
					{classes: "onyx-menu-divider"},
					{content: "Recents"},
				]}
			]}
		]},
		{kind: "Scroller", classes: "enyo-fit", style: "top: 130px;", components: [
			{style: "height: 100px; padding: 10px;", content: "Some popups in a scrolling region:"},
			{classes: "onyx-toolbar-inline", components: [
				{kind: "onyx.Button", content: "Popup...", ontap: "showPopup", popup: "popup"},
				{name: "popup", kind: "onyx.Popup", centered: true, floating: true, ontap: "floatTap", style: "font-size: 200px;", content: "Popup!!!"},
				{kind: "onyx.Button", content: "Modal Popup...", ontap: "showPopup", popup: "modalPopup"},
				{name: "modalPopup", kind: "onyx.Popup", centered: true, modal: true, floating: true, ontap: "floatTap", style: "font-size: 200px;", content: "Popup!!!"},
				{kind: "onyx.MenuDecorator", components: [
					{content: "Popup menu (floating)"},
					{kind: "onyx.Menu", floating: true, components: [
						{content: "1"},
						{content: "2"},
						{classes: "onyx-menu-divider"},
						{content: "3"},
					]}
				]},
				{kind: "onyx.MenuDecorator", components: [
					{content: "Scrolling Popup menu"},
					{kind: "onyx.Menu", components: [
						{name: "menuScroller", kind: "enyo.Scroller", defaultKind: "onyx.MenuItem", vertical: "auto", classes: "enyo-unselectable", maxHeight: "200px", strategyKind: "TouchScrollStrategy", components: [
							{content: "1"},
							{content: "2"},
							{classes: "onyx-menu-divider"},
							{content: "3"},
							{content: "4"},
							{content: "5"},
							{classes: "onyx-menu-divider"},
							{content: "6"},
							{content: "7"},
						]}
					]}
				]},
				{kind: "onyx.MenuDecorator", components: [
					{content: "Split Popup menu", kind: "onyx.Button", onActivate: "preventMenuActivate", style: "border-radius: 3px 0 0 3px;"},
					{content: "*", style: "border-radius: 0 3px 3px 0;"},
					{kind: "onyx.Menu", components: [
						{content: "1"},
						{content: "2"},
						{classes: "onyx-menu-divider"},
						{content: "3"},
					]}
				]}
			]},
			{tag: "br"},
			{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
				{kind: "onyx.GroupboxHeader", content: "Result"},
				{name:"menuSelection", classes:"onyx-sample-result", content:"No menu selection yet."}
			]}
		]}
	],
	create: function() {
		this.inherited(arguments);
	},
	showPopup: function(inSender) {
		var p = this.$[inSender.popup];
		if (p) {
			p.show();
		}
	},
	preventMenuActivate: function() {
		return true;
	},
	itemSelected: function(inSender, inEvent) {
		//Menu items send an onSelect event with a reference to themselves & any directly displayed content
		if (inEvent.originator.content){
			this.$.menuSelection.setContent(inEvent.originator.content + " Selected");			
		} else if (inEvent.selected){
			//	Since some of the menu items do not have directly displayed content (they are kinds with subcomponents),
			//	we have to handle those items differently here.
			this.$.menuSelection.setContent(inEvent.selected.controlAtIndex(1).content + " Selected");
		}
	}
});

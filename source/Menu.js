/**
 	onyx.Menu is a sub-kind of <a href="#onyx.Popup">onyx.Popup</a> that displays a list of 
	<a href="#onyx.MenuItems">onyx.MenuItems</a> and looks like a popup menu. Menu is meant to 
	be used in conjunction with a <a href="#onyx.MenuDecorator">onyx.MenuDecorator</a>. The 
	decorator couples an activating control such as a button (or anything with an onActivate event) 
	together with the menu. When the control is activated the menu will shows itself in the correct 
	position relative to the activator.
	
		{kind: "onyx.MenuDecorator", components: [
			{content: "Show menu"},
			{kind: "onyx.Menu", components: [
				{content: "1"},
				{content: "2"},
				{classes: "onyx-menu-divider"},
				{content: "3"},
			]}
		]}
	
	A menu can be floated by setting the _floating_ property to true and by default it is not floating.
	When a menu is not floating, it will scroll with the activating control, but it may be obscured by 
	surrounding content with a higher z-index. If it is floating, it will never be obscured, but it 
	will not scroll with the activating button.
 */
enyo.kind({
	name: "onyx.Menu",
	kind: "onyx.Popup",
	modal: true,
	defaultKind: "onyx.MenuItem",
	classes: "onyx-menu",
	showOnTop: false,
	handlers: {
		onActivate: "itemActivated",
		onRequestShowMenu: "requestMenuShow",
		onRequestHideMenu: "requestHide"
	},
	itemActivated: function(inSender, inEvent) {
		inEvent.originator.setActive(false);
		return true;
	},
	showingChanged: function() {
		this.inherited(arguments);
		this.adjustPosition(true);
	},
	requestMenuShow: function(inSender, inEvent) {
		if (this.floating) {
			var n = inEvent.activator.hasNode();
			if (n) {
				var r = this.activatorOffset = this.getPageOffset(n);
				this.applyPosition({top: r.top + (this.showOnTop ? 0 : r.height), left: r.left, width: r.width});
			}
		}
		this.show();
		return true;
	},
	applyPosition: function(inRect) {
		var s = ""
		for (n in inRect) {
			s += (n + ":" + inRect[n] + (isNaN(inRect[n]) ? "; " : "px; "));
		}
		this.addStyles(s);
	},
	getPageOffset: function(inNode) {
		// getBoundingClientRect returns top/left values which are relative to the viewport and not absolute
		var r = inNode.getBoundingClientRect();

		// IE8 doesn't return window.page{X/Y}Offset & r.{height/width}
		// FIXME: Perhaps use an alternate universal method instead of conditionals 
		var pageYOffset = (window.pageYOffset === undefined) ? document.documentElement.scrollTop : window.pageYOffset;
		var pageXOffset = (window.pageXOffset === undefined) ? document.documentElement.scrollLeft : window.pageXOffset;
		var rHeight = (r.height === undefined) ? (r.bottom - r.top) : r.height;
		var rWidth = (r.width === undefined) ? (r.right - r.left) : r.width;

		return {top: r.top + pageYOffset, left: r.left + pageXOffset, height: rHeight, width: rWidth};
	},	
	//* @protected
	/* Adjusts the menu position to fit inside the current window size. 
	   belowActivator determines whether to position the top of the menu below or on top of the activator
	*/
	adjustPosition: function(belowActivator) {
		if (this.showing && this.hasNode()) {
			this.removeClass("onyx-menu-up");
			var b = this.node.getBoundingClientRect();
			var bHeight = (b.height === undefined) ? (b.bottom - b.top) : b.height;
			var innerHeight = (window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight;
			this.menuUp = b.top + bHeight > innerHeight;
			this.addRemoveClass("onyx-menu-up", this.menuUp);
			
			if (this.floating) {
				var r = this.activatorOffset;
				//if the menu doesn't fit below the activator, move it up
				if (this.menuUp) {
					this.applyPosition({top: (r.top - bHeight + r.height), bottom: "auto"});
				}
				else {
					//if the top of the menu is above the top of the activator and there's room to move it down, do so
					if ((b.top < r.top) && (r.top + (belowActivator ? r.height : 0) + bHeight < innerHeight))
					{
						this.applyPosition({top: r.top + (this.showOnTop ? 0 : r.height), bottom: "auto"});
					}
				}
			}
		}
	},
	resizeHandler: function() {
		this.inherited(arguments);			
		this.adjustPosition(true);	
	}
});
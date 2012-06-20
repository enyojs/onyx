/**
 A menu control.
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
		return {top: r.top + window.pageYOffset, left: r.left + window.pageXOffset, height: r.height, width: r.width};
	},	
	//* @protected
	/* Adjusts the menu position to fit inside the current window size. 
	   belowActivator determines whether to position the top of the menu below or on top of the activator
	*/
	adjustPosition: function(belowActivator) {
		if (this.showing && this.hasNode()) {
			this.removeClass("onyx-menu-up");
			var b = this.node.getBoundingClientRect();
			this.menuUp = b.top + b.height > window.innerHeight;
			this.addRemoveClass("onyx-menu-up", this.menuUp);
			
			if (this.floating) {
				var r = this.activatorOffset;
				//if the menu doesn't fit below the activator, move it up
				if (this.menuUp) {
					this.applyPosition({top: (r.top - b.height + r.height), bottom: "auto"});
				}
				else {
					//if the top of the menu is above the top of the activator and there's room to move it down, do so
					if ((b.top < r.top) && (r.top + (belowActivator ? r.height : 0) + b.height < window.innerHeight))
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
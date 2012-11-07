/**
	_onyx.Menu_ is a subkind of <a href="#onyx.Popup">onyx.Popup</a> that
	displays a list of <a href="#onyx.MenuItem">onyx.MenuItem</a> objects and
	looks like a popup menu. It is meant to be used in conjunction with an
	<a href="#onyx.MenuDecorator">onyx.MenuDecorator</a>. The decorator couples
	the menu with an activating control, which may be a button or any other
	control with an _onActivate_ event. When the control is activated, the menu
	shows itself in the correct position relative to the activator.

		{kind: "onyx.MenuDecorator", components: [
			{content: "Show menu"},
			{kind: "onyx.Menu", components: [
				{content: "1"},
				{content: "2"},
				{classes: "onyx-menu-divider"},
				{content: "Label", classes: "onyx-menu-label"},
				{content: "3"},
			]}
		]}

	For more information, see the documentation on
	<a href="https://github.com/enyojs/enyo/wiki/Menus">Menus</a> in the Enyo
	Developer Guide.
 */
enyo.kind({
	name: "onyx.Menu",
	kind: "onyx.Popup",
	//* If true, prevents controls outside the menu from receiving events while
	//* the menu is showing
	modal: true,
	defaultKind: "onyx.MenuItem",
	classes: "onyx-menu",
	published: {
		//* Maximum height of the menu
		maxHeight: 200,
		//* Toggle scrolling
		scrolling: true
	},	
	handlers: {
		onActivate: "itemActivated",
		onRequestShowMenu: "requestMenuShow",
		onRequestHideMenu: "requestHide"
	},
	childComponents: [
		{name: "client", kind: "enyo.Scroller", strategyKind: "TouchScrollStrategy"}
	],	
	showOnTop: false,	
	scrollerName: "client",
	create: function() {
		this.inherited(arguments);
	    this.maxHeightChanged();	
	},
	initComponents: function() {
	    this.scrolling ? this.createComponents(this.childComponents, {isChrome: true}) : enyo.nop;	
        this.inherited(arguments);
    },
	getScroller: function() {
		return this.$[this.scrollerName];
	},
	maxHeightChanged: function() {
	    this.scrolling ? this.getScroller().setMaxHeight(this.maxHeight + "px") : enyo.nop;	
	},		
	itemActivated: function(inSender, inEvent) {
		inEvent.originator.setActive(false);		
		return true;
	},
	showingChanged: function() {
		this.inherited(arguments);
		this.scrolling ? this.getScroller().setShowing(this.showing) : enyo.nop;
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
	/* Note that we aren't currently adjusting picker scroller heights. 
	*/
	adjustPosition: function() {
		if (this.showing && this.hasNode()) {
			(this.scrolling && !this.showOnTop) ? this.getScroller().setMaxHeight(this.maxHeight+"px") : enyo.nop;	
			this.removeClass("onyx-menu-up");
						
			//reset the left position before we get the bounding rect for proper horizontal calculation
			this.floating ? enyo.noop : this.applyPosition({left: "auto"});
							
			var b = this.node.getBoundingClientRect();
			var bHeight = (b.height === undefined) ? (b.bottom - b.top) : b.height;
			var innerHeight = (window.innerHeight === undefined) ? document.documentElement.clientHeight : window.innerHeight;
			var innerWidth = (window.innerWidth === undefined) ? document.documentElement.clientWidth : window.innerWidth;			
			
			//position the menu above the activator if it's getting cut off, but only if there's more room above than below
			this.menuUp = (b.top + bHeight > innerHeight) && ((innerHeight - b.bottom) < (b.top - bHeight));
			this.addRemoveClass("onyx-menu-up", this.menuUp);
			
			//if floating, adjust the vertical positioning
			if (this.floating) {
				var r = this.activatorOffset;
				//if the menu doesn't fit below the activator, move it up
				if (this.menuUp) {
					this.applyPosition({top: (r.top - bHeight + (this.showOnTop ? r.height : 0)), bottom: "auto"});
				}
				else {
					//if the top of the menu is above the top of the activator and there's room to move it down, do so
					if ((b.top < r.top) && (r.top + (this.showOnTop ? 0 : r.height) + bHeight < innerHeight))
					{
						this.applyPosition({top: r.top + (this.showOnTop ? 0 : r.height), bottom: "auto"});
					}
				}
			}
			
			//adjust the horizontal positioning to keep the menu from being cut off on the right
			if ((b.right) > innerWidth) {
				if (this.floating){
					this.applyPosition({left:innerWidth-b.width});
				} else {
					this.applyPosition({left: -(b.right - innerWidth)});
				}					
			}
			
			//finally prevent the menu from being cut off on the left
			if (b.left < 0) {
				if (this.floating){
					this.applyPosition({left: 0, right:"auto"});
				} else {
					//handle the situation where a non-floating menu is right or left aligned
					if (this.getComputedStyleValue("right") == "auto"){
						this.applyPosition({left:-b.left});
					} else {
						this.applyPosition({right:b.left});												
					}
				}
			}
								
			//adjust the scroller height based on room available - only doing this for menus currently
			if (this.scrolling && !this.showOnTop){
				b = this.node.getBoundingClientRect(); //update to the current menu position
				var scrollerHeight;
				if (this.menuUp){
					scrollerHeight = (this.maxHeight < b.bottom) ? this.maxHeight : b.bottom;
				} else {
					scrollerHeight = ((b.top + this.maxHeight) < innerHeight) ? this.maxHeight : (innerHeight - b.top);
				}
				this.getScroller().setMaxHeight(scrollerHeight+"px");	
			}					
		}
	},
	resizeHandler: function() {
		this.inherited(arguments);			
		this.adjustPosition();	
	},
	requestHide: function(){
		this.setShowing(false);
	}
});
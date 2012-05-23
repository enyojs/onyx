/**
 A menu control.
 */
enyo.kind({
	name: "onyx.Menu",
	kind: "onyx.Popup",
	modal: true,
	defaultKind: "onyx.MenuItem",
	classes: "onyx-menu",
	handlers: {
		onActivate: "itemActivated",
		onRequestShowMenu: "requestMenuShow",
		onRequestHideMenu: "requestHide"
	},
	create: function() {
		enyo.Control.prototype.create.apply(this, arguments);
		this.canGenerate = !this.floating;
	},
	render: function() {
		if (this.floating) {
			if (!enyo.floatingLayer.hasNode()) {
				enyo.floatingLayer.render();
			}
			this.parentNode = enyo.floatingLayer.hasNode();
		}
		enyo.Control.prototype.render.apply(this);
	},
	getBubbleTarget: function() {
		return enyo.Control.prototype.getBubbleTarget.apply(this, arguments);
	},
	itemActivated: function(inSender, inEvent) {
		inEvent.originator.setActive(false);
		return true;
	},
	showingChanged: function() {
		this.inherited(arguments);
		if (this.showing && this.hasNode()) {
			this.removeClass("onyx-menu-up");
			var b = this.node.getBoundingClientRect();
			this.menuUp = b.top + b.height > window.innerHeight;
			this.addRemoveClass("onyx-menu-up", this.menuUp);
			if (this.floating && this.menuUp) {
				var r = this.activatorOffset;
				this.applyPosition({top: (r.top - b.height + r.height), bottom: "auto"});
			}
		}
	},
	requestMenuShow: function(inSender, inEvent) {
		if (this.floating) {
			var n = inEvent.activator.hasNode();
			if (n) {
				var r = this.activatorOffset = this.getPageOffset(n);
				this.applyPosition({top: r.top, left: r.left, width: r.width});
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
	}
});
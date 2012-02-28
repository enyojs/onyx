/**
 A popup control.
 */
enyo.kind({
	name: "onyx.Popup",
	classes: "onyx-popup",
	showing: false,
	published: {
		modal: false,
		autoDismiss: true,
		floating: false,
		centered: false
	},
	handlers: {
		ondown: "down",
		onkeydown: "keydown",
		onfocus: "focus",
		onblur: "blur",
		onRequestShow: "requestShow",
		onRequestHide: "requestHide"
		
	},
	events: {
		onShow: "",
		onHide: ""
	},
	//* @protected
	tools: [
		{kind: "Signals", onKeydown: "keydown"},
	],
	create: function() {
		this.inherited(arguments);
		if (this.floating) {
			this.setParent(onyx.floatingLayer);
		}
	},
		// bubble events to owner when floating
	getBubbleTarget: function() {
		return this.floating ? this.owner : this.inherited(arguments);
	},
	reflow: function() {
		this.updatePosition();
		this.inherited(arguments);
	},
	calcViewportSize: function() {
		if (window.innerWidth) {
			return {
				width: window.innerWidth,
				height: window.innerHeight
			}
		} else {
			var e = document.documentElement;
			return {
				width: e.offsetWidth, 
				height: e.offsetHeight
			}
		}
	},
	updatePosition: function() {
		if (this.centered) {
			var d = this.calcViewportSize();
			var b = this.getBounds();
			this.addStyles("top: " + ((d.height-b.height)/2) + "px; left: " + ((d.width-b.width)/2) + "px;");
		}
	},
	showingChanged: function() {
		// auto render when shown.
		if (this.floating && this.showing && !this.hasNode()) {
			this.render();
		}
		// events desired due to programmatic show/hide
		if (this.hasNode()) {
			this[this.showing ? "doShow" : "doHide"]();
		}
		// hide while sizing
		if (this.centered) {
			this.applyStyle("visibility", "hidden");
		}
		this.inherited(arguments);
		if (this.showing) {
			this.reflow();
			this.capture();
		} else {
			this.release();
		}
		// show after sizing
		if (this.centered) {
			this.applyStyle("visibility", null);
		}
	},
	capture: function() {
		enyo.dispatcher.capture(this, !this.modal);
	},
	release: function() {
		enyo.dispatcher.release();
	},
	down: function(inSender, inEvent) {
		// prevent focus shifting outside the poup when modal.
		if (this.modal && !inEvent.dispatchTarget.isDescendantOf(this)) {
			inEvent.preventNativeDefault();
		}
	},
	tap: function(inSender, inEvent) {
		// dismiss on tap if property is set and click was outside the popup
		if (this.autoDismiss && (!inEvent.dispatchTarget.isDescendantOf(this))) {
			this.hide();
			return true;
		}
	},
	keydown: function(inSender, inEvent) {
		if (this.showing && this.autoDismiss && inEvent.keyCode == 27 /* escape */) {
			this.hide();
		}
	},
	// if something inside the popup blurred, keep track of it
	blur: function(inSender, inEvent) {
		if (inEvent.dispatchTarget.isDescendantOf(this)) {
			this.lastFocus = inEvent.originator;
		}
	},
	// when something outside the popup focuses (e.g. due to tab key), focus our last focused control.
	focus: function(inSender, inEvent) {
		var dt = inEvent.dispatchTarget;
		if (this.modal && !dt.isDescendantOf(this)) {
			if (dt.hasNode()) {
				dt.node.blur();
			}
			var n = (this.lastFocus && this.lastFocus.hasNode()) || this.hasNode();
			if (n) {
				n.focus();
			}
		}
	},
	requestShow: function(inSender, inEvent) {
		this.show();
		return true;
	},
	requestHide: function(inSender, inEvent) {
		this.hide();
		return true;
	}
});
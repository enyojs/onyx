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
		floating: false
	},
	handlers: {
		ondown: "down",
		onkeydown: "keydown"
		
	},
	events: {
		onShow: "",
		onHide: ""
	},
	//* @protected
	statics: {
		count: 0
	},
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
	showingChanged: function() {
		// auto render when shown.
		if (this.floating && this.showing && !this.hasNode()) {
			this.render();
		}
		// events desired due to programmatic show/hide
		if (this.hasNode()) {
			this[this.showing ? "doShow" : "doHide"]();
		}
		this.inherited(arguments);
		if (this.showing) {
			this.capture();
		} else {
			this.release();
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
		if (this.modal && !inEvent.originator.isDescendantOf(this)) {
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
		if (this.modal && !inEvent.dispatchTarget.isDescendantOf(this)) {
			var n = (this.lastFocus && this.lastFocus.hasNode()) || this.hasNode();
			if (n) {
				n.focus();
			}
		}
	}
});
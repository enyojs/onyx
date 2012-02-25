/**
 A popup control.
 */
enyo.kind({
	name: "onyx.Popup",
	kind: "onyx.ModalControl",
	classes: "onyx-popup",
	showing: false,
	published: {
		modal: false,
		autoDismiss: true,
		floating: false
	},
	handlers: {
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
		//* @public
	// open / close events
	tap: function(inSender, inEvent) {
		this.log();
		// dismiss on tap if property is set and click was outside the popup
		if (this.autoDismiss && (!inEvent.dispatchTarget.isDescendantOf || !inEvent.dispatchTarget.isDescendantOf(this))) {
			this.log();
			this.hide();
			return true;
		}
	},
	keydown: function(inSender, e) {
		if (this.showing && this.autoDismiss && e.keyCode == 27 /* escape */) {
			this.hide();
		}
	}
});
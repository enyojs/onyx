/**
 A popup control.
 */
enyo.kind({
	name: "onyx.ModalControl",
	published: {
		modal: false
	},
	handlers: {
		onmousedown: "nativeDownHandler",
		ontouchstart: "nativeDownHandler",
		onblur: "blurHandler",
		onfocus: "focusHandler"
		
	},
	//* @protected
	/*
	dispatchDomEvent: function(e) {
		var r = this.inherited(arguments);
		// avoid bubbling dom events if we are not modal and will therefore forward events
		// this prevents events from being sent twice to ancestors of both the popup and the event dispatch target.
		return !this.modal ? true : r;
	},
	*/
	//* @public
	capture: function() {
		enyo.dispatcher.capture(this, !this.modal);
	},
	release: function() {
		enyo.dispatcher.release();
	},
	// prevent focus changes
	nativeDownHandler: function(inSender, inEvent) {
		// prevent focusing from shifting if we're modal.
		if (this.modal && !inEvent.dispatchTarget.isDescendantOf(this)) {
			inEvent.preventDefault();
		}
	}/*,
	// FIXME: this would handle programmatic focus changes. why bother?
	blurHandler: function(inSender, e) {
		this.lastFocus = inSender;
	},
	focusHandler: function(inSender, e) {
		if (this.modal && !inSender.isDescendantOf(this)) {
			var n = (this.lastFocus && this.lastFocus.hasNode()) || this.hasNode();
			if (n) {
				n.focus();
			}
		}
	}*/
});
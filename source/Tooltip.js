/**
	_onyx.Tooltip_ is a subkind of [onyx.Popup](#onyx.Popup) that works in
	conjunction with an [onyx.TooltipDecorator](#onyx.TooltipDecorator). It
	automatically displays a tooltip when the user hovers over the decorator.
	The tooltip is positioned around the decorator where there is available
	window space.

		{kind: "onyx.TooltipDecorator", components: [
			{kind: "onyx.Button", content: "Tooltip"},
			{kind: "onyx.Tooltip", content: "I'm a tooltip for a button."}
		]}

	You may also force a tooltip to be displayed by calling its _show()_ method.
*/
enyo.kind({
	name: "onyx.Tooltip",
	kind: "onyx.Popup",
	classes: "onyx-tooltip below left-arrow",
	/**
		If true, the tooltip is automatically dismissed when user stops hovering
		over the decorator
	*/
	autoDismiss: false,
	/**
		Hovering over the decorator for this length of time (in milliseconds)
		causes the tooltip to appear
	*/
	showDelay: 500,
	//* Default _margin-left_ value
	defaultLeft: -6,
	//* @protected
	handlers: {
		onRequestShowTooltip: "requestShow",
		onRequestHideTooltip: "requestHide"
	},
	requestShow: function() {
		this.showJob = setTimeout(this.bindSafely("show"), this.showDelay);
		return true;
	},
	cancelShow: function() {
		clearTimeout(this.showJob);
	},
	requestHide: function() {
		this.cancelShow();
		return this.inherited(arguments);
	},
	showingChanged: function() {
		this.cancelShow();
		this.adjustPosition(true);
		this.inherited(arguments);
	},
	applyPosition: function(inRect) {
		var s = "";
		for (var n in inRect) {
			s += (n + ":" + inRect[n] + (isNaN(inRect[n]) ? "; " : "px; "));
		}
		this.addStyles(s);
	},
	adjustPosition: function(belowActivator) {
		if (this.showing && this.hasNode()) {
			var b = this.node.getBoundingClientRect();

			//when the tooltip bottom goes below the window height move it above the decorator
			if (b.top + b.height > window.innerHeight) {
				this.addRemoveClass("below", false);
				this.addRemoveClass("above", true);
			} else {
				this.addRemoveClass("above", false);
				this.addRemoveClass("below", true);
			}

			//when the tooltip's right edge is out of the window, align its right edge with the decorator left edge (approx)
			if (b.left + b.width > window.innerWidth){
				this.applyPosition({'margin-left': -b.width, bottom: "auto"});
				//use the right-arrow
				this.addRemoveClass("left-arrow", false);
				this.addRemoveClass("right-arrow", true);
			}
		}
	},
	handleResize: function() {
		//reset the tooltip to align its left edge with the decorator
		this.applyPosition({'margin-left': this.defaultLeft, bottom: "auto"});
		this.addRemoveClass("left-arrow", true);
		this.addRemoveClass("right-arrow", false);

		this.adjustPosition(true);
		this.inherited(arguments);
	}
});

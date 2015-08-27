require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Tooltip~Tooltip} kind.
* @module onyx/Tooltip
*/

var
	kind = require('enyo/kind');

var
	Popup = require('onyx/Popup');

/**
* {@link module:onyx/Tooltip~Tooltip} is a subkind of {@link module:onyx/Popup~Popup} that works in
* conjunction with an {@link module:onyx/TooltipDecorator~TooltipDecorator}. It automatically displays
* a tooltip when the user hovers over the decorator. The tooltip is positioned
* around the decorator where there is available window space.
*
* ```
* var
* 	Button = require('onyx/Button'),
* 	Tooltip = require('onyx/Tooltip'),
* 	TooltipDecorator = require('onyx/TooltipDecorator');
*
*	{kind: TooltipDecorator, components: [
*		{kind: Button, content: 'Tooltip'},
*		{kind: Tooltip, content: 'I am a tooltip for a button.'}
*	]}
* ```
*
* You may also force a tooltip to be displayed by calling its `show()` method.
*
* @class Tooltip
* @extends module:onyx/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Tooltip~Tooltip.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Tooltip',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	classes: 'onyx-tooltip below left-arrow',

	/**
	* If `true`, the tooltip is automatically dismissed when user stops hovering
	* over the decorator.
	*
	* @type {Boolean}
	* @default false
	* @public
	*/
	autoDismiss: false,

	/**
	* Hovering over the decorator for this length of time (in milliseconds)
	* causes the tooltip to appear.
	*
	* @type {Number}
	* @default 500
	* @public
	*/
	showDelay: 500,

	/**
	* Default `'margin-left'` value.
	*
	* @type {Number}
	* @default -6
	* @public
	*/
	defaultLeft: -6,

	/**
	* @private
	*/
	handlers: {
		onRequestShowTooltip: 'requestShow',
		onRequestHideTooltip: 'requestHide'
	},

	/**
	* @private
	*/
	requestShow: function () {
		this.showJob = setTimeout(this.bindSafely('show'), this.showDelay);
		return true;
	},

	/**
	* @private
	*/
	cancelShow: function () {
		clearTimeout(this.showJob);
	},

	/**
	* @private
	*/
	requestHide: function () {
		this.cancelShow();
		return Popup.prototype.requestHide.apply(this, arguments);
	},

	/**
	* @private
	*/
	showingChanged: function () {
		this.cancelShow();
		this.adjustPosition(true);
		Popup.prototype.showingChanged.apply(this, arguments);
	},

	/**
	* @private
	*/
	applyPosition: function (inRect) {
		var s = '';
		for (var n in inRect) {
			s += (n + ':' + inRect[n] + (isNaN(inRect[n]) ? '; ' : 'px; '));
		}
		this.addStyles(s);
	},

	/**
	* @private
	*/
	adjustPosition: function (belowActivator) {
		if (this.showing && this.hasNode()) {
			var b = this.node.getBoundingClientRect();

			//when the tooltip bottom goes below the window height move it above the decorator
			if (b.top + b.height > window.innerHeight) {
				this.addRemoveClass('below', false);
				this.addRemoveClass('above', true);
			} else {
				this.addRemoveClass('above', false);
				this.addRemoveClass('below', true);
			}

			// when the tooltip's right edge is out of the window, align its right edge with the decorator left
			// edge (approx)
			if (b.left + b.width > window.innerWidth){
				this.applyPosition({'margin-left': -b.width, bottom: 'auto'});
				//use the right-arrow
				this.addRemoveClass('left-arrow', false);
				this.addRemoveClass('right-arrow', true);
			}
		}
	},

	/**
	* @private
	*/
	handleResize: function () {
		//reset the tooltip to align its left edge with the decorator
		this.applyPosition({'margin-left': this.defaultLeft, bottom: 'auto'});
		this.addRemoveClass('left-arrow', true);
		this.addRemoveClass('right-arrow', false);

		this.adjustPosition(true);
		Popup.prototype.handleResize.apply(this, arguments);
	}
});

require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ToggleButton~ToggleButton} kind.
* @module onyx/ToggleButton
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* Fires when the user changes the value of the toggle button, but not
* when the value is changed programmatically.
*
* @event module:onyx/ToggleButton~ToggleButton#onChange
* @type {Object}
* @property {Boolean} value - Current value of the button.
* @public
*/

/**
* {@link module:onyx/ToggleButton~ToggleButton} is a control that looks like a switch with labels for
* two states. Each time a	ToggleButton is tapped, it switches its value and fires
* an [onChange]{@link module:onyx/ToggleButton~ToggleButton#onChange} event.
*
* @ui
* @class ToggleButton
* @extends module:enyo/Control~Control
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ToggleButton~ToggleButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ToggleButton',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-toggle-button',

	/**
	* @lends module:onyx/ToggleButton~ToggleButton.prototype
	* @private
	*/
	published: {
		/**
		* Used when the ToggleButton is part of an {@link module:enyo/Group~Group}. A value
		* of `true` indicates that this is the active button of the group.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,

		/**
		* Indicates whether toggle button is currently in the `'on'` state.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		value: false,

		/**
		* Label for the `'on'` state.
		*
		* @type {String}
		* @default 'On'
		* @public
		*/
		onContent: 'On',

		/**
		* Label for the `'off'` state.
		*
		* @type {String}
		* @default 'Off'
		* @public
		*/
		offContent: 'Off',

		/**
		* If `true`, toggle button cannot be tapped and thus will not generate any
		* events.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false
	},

	/**
	* @private
	*/
	events: {
		onChange: ''
	},

	/**
	* @private
	*/
	handlers: {
		ondragstart: 'dragstart',
		ondrag: 'drag',
		ondragfinish: 'dragfinish'
	},

	/**
	* @private
	*/
	components: [
		{name: 'contentOn', classes: 'onyx-toggle-content on'},
		{name: 'contentOff', classes: 'onyx-toggle-content off'},
		{classes: 'onyx-toggle-button-knob'}
	],

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.value = Boolean(this.value || this.active);
		this.onContentChanged();
		this.offContentChanged();
		this.disabledChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Control.prototype.rendered.apply(this, arguments);
		this.updateVisualState();
	},

	/**
	* @private
	*/
	updateVisualState: function () {
		this.addRemoveClass('off', !this.value);
		this.$.contentOn.setShowing(this.value);
		this.$.contentOff.setShowing(!this.value);
		this.setActive(this.value);
	},

	/**
	* @fires module:onyx/ToggleButton~ToggleButton#onChange
	* @private
	*/
	valueChanged: function () {
		this.updateVisualState();
		this.doChange({value: this.value});
	},

	/**
	* @private
	*/
	activeChanged: function () {
		this.setValue(this.active);
		this.bubble('onActivate');
	},

	/**
	* @private
	*/
	onContentChanged: function () {
		this.$.contentOn.setContent(this.onContent || '');
		this.$.contentOn.addRemoveClass('empty', !this.onContent);
	},

	/**
	* @private
	*/
	offContentChanged: function () {
		this.$.contentOff.setContent(this.offContent || '');
		this.$.contentOff.addRemoveClass('empty', !this.onContent);
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @private
	*/
	updateValue: function (value) {
		if (!this.disabled) {
			this.setValue(value);
		}
	},

	/**
	* Programmatically simulates a user tap of the toggle button.
	*
	* @public
	*/
	tap: function () {
		this.updateValue(!this.value);
	},

	/**
	* @private
	*/
	dragstart: function (sender, event) {
		if (event.horizontal) {
			event.preventDefault();
			this.dragging = true;
			this.dragged = false;
			return true;
		}
	},

	/**
	* @private
	*/
	drag: function (sender, event) {
		if (this.dragging) {
			var d = event.dx;
			if (Math.abs(d) > 10) {
				this.updateValue(d > 0);
				this.dragged = true;
			}
			return true;
		}
	},

	/**
	* @private
	*/
	dragfinish: function (sender, event) {
		this.dragging = false;
		if (this.dragged) {
			event.preventTap();
		}
	}
});

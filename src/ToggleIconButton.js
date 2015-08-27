require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ToggleIconButton~ToggleIconButton} kind.
* @module onyx/ToggleIconButton
*/

var
	kind = require('enyo/kind');

var
	Icon = require('onyx/Icon');

/**
* Fires when the user changes the value of the toggle button, but not
* when the value is changed programmatically.
*
* @event module:onyx/ToggleIconButton~ToggleIconButton#onChange
* @type {Object}
* @property {Boolean} value - The current value of the button.
* @public
*/

/**
* {@link module:onyx/ToggleIconButton~ToggleIconButton} is an icon that acts like a toggle switch. The icon
* image is specified by setting the [src]{@link module:onyx/Icon~Icon#src} property to a URL.
*
* ```
* var
* 	ToggleIconButton = require('onyx/ToggleIconButton');
*
* {kind: ToggleIconButton, src: 'images/search.png', ontap: 'buttonTap'}
* ```
*
* The image associated with the `src` property is assumed	to be a 32x64-pixel
* strip, with the top half showing the button's normal state and the bottom
* half showing its state when hovered-over or active.
*
* @class ToggleIconButton
* @extends module:onyx/Icon~Icon
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ToggleIconButton~ToggleIconButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.ToggleIconButton',

	/**
	* @private
	*/
	kind: Icon,

	/**
	* @lends module:enyo/ToggleIconButton~ToggleIconButton.prototype
	* @private
	*/
	published: {
		/**
		* Used when the ToggleIconButton is part of an {@link module:enyo/Group~Group}; set the
		* value to `true` to indicate that this is the active button in the group.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		active: false,
	
		/**
		* Indicates whether the button is currently in the `'on'` state.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		value: false
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
	classes: 'onyx-icon-button onyx-icon-toggle',

	/**
	* @private
	*/
	activeChanged: function () {
		this.addRemoveClass('active', this.value);
		this.bubble('onActivate');
	},

	/**
	* @private
	*/
	updateValue: function (inValue) {
		if (!this.disabled) {
			this.setValue(inValue);
			this.doChange({value: this.value});
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
	valueChanged: function () {
		this.setActive(this.value);
	},

	/**
	* @private
	*/
	create: function () {
		Icon.prototype.create.apply(this, arguments);
		this.value = Boolean(this.value || this.active);
	},

	/**
	* @private
	*/
	rendered: function () {
		Icon.prototype.rendered.apply(this, arguments);
		this.valueChanged();
		this.removeClass('onyx-icon');
	}
});

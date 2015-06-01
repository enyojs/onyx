require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Checkbox~Checkbox} kind.
* @module onyx/Checkbox
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils'),
	Checkbox = require('enyo/Checkbox');

/**
* {@link module:onyx/Checkbox~Checkbox} is a box that shows or hides a checkmark when clicked. The
* [onActivate]{@link module:enyo/Checkbox~Checkbox#onActivate} event is fired when the box is clicked.
* Call `getValue()` to retrieve a boolean indicating whether the box is currently
* checked.
*
* ```
* var
* 	Checkbox = require('onyx/Checkbox');
*
* {kind: Checkbox, onchange: 'checkboxClicked'}
*
* checkboxClicked: function (sender) {
* 	if (sender.getValue()) {
* 		this.log('Someone checked me!');
* 	}
* }
* ```
*
* @class Checkbox
* @extends module:enyo/Checkbox~Checkbox
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:enyo/Checkbox~Checkbox.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Checkbox',

	/**
	* @private
	*/
	classes: 'onyx-checkbox',

	/**
	* @private
	*/
	kind: Checkbox,

	/**
	* @private
	*/
	tag: 'div',

	/**
	* @private
	*/
	handlers: {
		// prevent double onchange bubble in IE
		onclick: ''
	},

	/**
	* @private
	*/
	tap: function (sender, e) {
		if (!this.disabled) {
			this.setChecked(!this.getChecked());
			this.bubble('onchange');
		}
		return !this.disabled;
	},

	/**
	* Overrides {@link module:enyo/Input~Input} `dragstart` handler, to allow drags to propagate
	* for Checkbox.
	*
	* @private
	*/
	dragstart: utils.nop
});

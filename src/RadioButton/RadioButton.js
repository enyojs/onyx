require('onyx');

/**
* Contains the declaration for the {@link module:onyx/RadioButton~RadioButton} kind.
* @module onyx/RadioButton
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* {@link module:onyx/RadioButton~RadioButton} is a radio button designed for use within an
* {@link module:onyx/RadioGroup~RadioGroup}.
*
* @class RadioButton
* @extends module:enyo/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/RadioButton~RadioButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RadioButton',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	classes: 'onyx-radiobutton'
});

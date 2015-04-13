require('onyx');

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* {@link onyx.RadioButton} is a radio button designed for use within an
* {@link onyx.RadioGroup}.
*
* @class  onyx.RadioButton
* @extends enyo.Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends  onyx.RadioButton.prototype */ {

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
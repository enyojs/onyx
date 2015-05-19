require('onyx');

/**
* Contains the declaration for the {@link onyx.RadioButton} kind.
* @module onyx/RadioButton
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* {@link onyx.RadioButton} is a radio button designed for use within an
* {@link onyx.RadioGroup}.
*
* @namespace onyx
* @class onyx.RadioButton
* @extends enyo.Button
* @ui
* @definedby module:onyx/RadioButton
* @public
*/
module.exports = kind(
	/** @lends onyx.RadioButton.prototype */ {

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

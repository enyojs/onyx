require('onyx');

/**
* Contains the declaration for the {@link onyx.Input} kind.
* @module onyx/Input
*/

var
	kind = require('enyo/kind'),
	Input = require('enyo/Input');

/**
* {@link onyx.Input} is an Onyx-styled input control, derived from {@link enyo.Input}.
* Typically, an `onyx.Input` is placed inside an {@link onyx.InputDecorator}, which
* provides styling, e.g.:
*
* ```
* {kind: 'onyx.InputDecorator', components: [
* 	{kind: 'onyx.Input', placeholder: 'Enter some text...', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @namespace onyx
* @class onyx.Input
* @extends enyo.Input
* @ui
* @definedby module:onyx/Input
* @public
*/
module.exports = kind(
	/** @lends onyx.Input.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Input',

	/**
	* @private
	*/
	kind: Input,

	/**
	* @private
	*/
	classes: 'onyx-input'
});

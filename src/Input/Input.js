require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Input~Input} kind.
* @module onyx/Input
*/

var
	kind = require('enyo/kind'),
	Input = require('enyo/Input');

/**
* {@link module:onyx/Input~Input} is an Onyx-styled input control, derived from {@link module:enyo/Input~Input}.
* Typically, an `onyx.Input` is placed inside an {@link module:onyx/InputDecorator~InputDecorator}, which
* provides styling, e.g.:
*
* ```
* var
* 	Input = require('onyx/Input'),
* 	InputDecorator = require('onyx/InputDecorator');
*
* {kind: InputDecorator, components: [
* 	{kind: Input, placeholder: 'Enter some text...', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class Input
* @extends module:enyo/Input~Input
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Input~Input.prototype */ {

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

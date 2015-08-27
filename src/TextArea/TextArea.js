require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TextArea~TextArea} kind.
* @module onyx/TextArea
*/

var
	kind = require('enyo/kind'),
	TextArea = require('enyo/TextArea');

/**
* {@link module:onyx/TextArea~TextArea} is an Onyx-styled TextArea control, derived from
* {@link module:enyo/TextArea~TextArea}. Typically, an `onyx.TextArea` is placed inside an
* {@link module:onyx/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```
* var
* 	InputDecorator = require('onyx/InputDecorator'),
* 	TextArea = require('onyx/TextArea');
*
* {kind: InputDecorator, components: [
* 	{kind: TextArea, onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class TextArea
* @extends module:enyo/TextArea~TextArea
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/TextArea~TextArea.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TextArea',

	/**
	* @private
	*/
	kind: TextArea,

	/**
	* @private
	*/
	classes: 'onyx-textarea'
});

require('onyx');

/**
* Contains the declaration for the {@link module:onyx/RichText~RichText} kind.
* @module onyx/RichText
*/

var
	kind = require('enyo/kind'),
	RichText = require('enyo/RichText');

/**
* {@link module:onyx/RichText~RichText} is an Onyx-styled rich text control, derived from
* {@link module:enyo/RichText~RichText}. Typically, an `onyx.RichText` is placed inside an
* {@link module:onyx/InputDecorator~InputDecorator}, which provides styling, e.g.:
*
* ```
* var
* 	InputDecorator = require('onyx/InputDecorator'),
* 	RichText = require('onyx/RichText');
*
* {kind: InputDecorator, components: [
* 	{kind: RichText, style: 'width: 100px;', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class RichText
* @extends module:enyo/RichText~RichText
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/RichText~RichText.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RichText',

	/**
	* @private
	*/
	kind: RichText,

	/**
	* @private
	*/
	classes: 'onyx-richtext'
});

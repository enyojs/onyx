require('onyx');

var
	kind = require('enyo/kind'),
	RichText = require('enyo/RichText');

/**
* {@link onyx.RichText} is an Onyx-styled rich text control, derived from
* {@link enyo.RichText}. Typically, an `onyx.RichText` is placed inside an
* {@link onyx.InputDecorator}, which provides styling, e.g.:
*
* ```
* {kind: 'onyx.InputDecorator', components: [
* 	{kind: 'onyx.RichText', style: 'width: 100px;', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @class  onyx.RichText
* @extends enyo.RichText
* @ui
* @public
*/
module.exports = kind(
	/** @lends  onyx.RichText.prototype */ {

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
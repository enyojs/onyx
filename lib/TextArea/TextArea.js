require('onyx');

/**
* Contains the declaration for the {@link onyx.TextArea} kind.
* @module onyx/TextArea
*/

var
	kind = require('enyo/kind'),
	TextArea = require('enyo/TextArea');

/**
* {@link onyx.TextArea} is an Onyx-styled TextArea control, derived from
* {@link enyo.TextArea}. Typically, an `onyx.TextArea` is placed inside an
* {@link onyx.InputDecorator}, which provides styling, e.g.:
*
* ```
* {kind: 'onyx.InputDecorator', components: [
* 	{kind: 'onyx.TextArea', onchange: 'inputChange'}
* ]}
* ```
*
* For more information, see the documentation on
* [Text Fields]{@linkplain $dev-guide/building-apps/controls/text-fields.html}
* in the Enyo Developer Guide.
*
* @namespace onyx
* @class onyx.TextArea
* @extends enyo.TextArea
* @ui
* @definedby module:onyx/TextArea
* @public
*/
module.exports = kind(
	/** @lends onyx.TextArea.prototype */ {

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

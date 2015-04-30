require('onyx');

/**
* Contains the declaration for the {@link onyx.GroupboxHeader} kind.
* @module onyx/GroupboxHeader
*/

var
	kind = require('enyo/kind');

/**
* {@link onyx.GroupboxHeader} is a control designed to be placed inside an
* {@link onyx.Groupbox}. When a header is desired, make a GroupboxHeader the
* first control inside the Groupbox.
*
* ```
* {kind: 'onyx.Groupbox', components: [
* 	{kind: 'onyx.GroupboxHeader', content: 'Sounds'},
* 	{content: 'Yawn'},
* 	{content: 'Beep'}
* ]}
* ```
*
* @namespace onyx
* @class onyx.GroupboxHeader
* @extends enyo.Control
* @ui
* @definedby module:onyx/GroupboxHeader
* @public
*/
module.exports = kind(
	/** @lends onyx.GroupboxHeader.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.GroupboxHeader',

	/**
	* @private
	*/
	classes: 'onyx-groupbox-header'
});

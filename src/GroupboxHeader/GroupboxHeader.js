require('onyx');

/**
* Contains the declaration for the {@link module:onyx/GroupboxHeader~GroupboxHeader} kind.
* @module onyx/GroupboxHeader
*/

var
	kind = require('enyo/kind');

/**
* {@link module:onyx/GroupboxHeader~GroupboxHeader} is a control designed to be placed inside an
* {@link module:onyx/Groupbox~Groupbox}. When a header is desired, make a GroupboxHeader the
* first control inside the Groupbox.
*
* ```
* var
* 	Groupbox = require('onyx/Groupbox'),
* 	GroupboxHeader = require('onyx/GroupboxHeader');
*
* {kind: Groupbox, components: [
* 	{kind: GroupboxHeader, content: 'Sounds'},
* 	{content: 'Yawn'},
* 	{content: 'Beep'}
* ]}
* ```
*
* @class GroupboxHeader
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/GroupboxHeader~GroupboxHeader.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.GroupboxHeader',

	/**
	* @private
	*/
	classes: 'onyx-groupbox-header'
});

require('onyx');

/**
* Contains the declaration for the {@link module:onyx/RadioGroup~RadioGroup} kind.
* @module onyx/RadioGroup
*/

var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	RadioButton = require('onyx/RadioButton');

/**
* {@link module:onyx/RadioGroup~RadioGroup} is a group of {@link module:onyx/RadioButton~RadioButton} objects laid out
* horizontally. Within the same radio group, tapping on one radio button will
* release any previously-tapped radio button.
*
* ```
* var RadioGroup = require('onyx/RadioGroup');
*
* {kind: RadioGroup, components: [
* 	{content: 'foo', active: true},
* 	{content: 'bar'},
* 	{content: 'baz'}
* ]}
* ```
*
* @class RadioGroup
* @extends module:enyo/Group~Group
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/RadioGroup~RadioGroup.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.RadioGroup',

	/**
	* @private
	*/
	kind: Group,

	/**
	* @private
	*/
	defaultKind: RadioButton,

	/**
	* Set to `true` to provide radio button behavior.
	*
	* @private
	*/
	highlander: true
});

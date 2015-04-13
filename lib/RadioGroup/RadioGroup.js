require('onyx');

var
	kind = require('enyo/kind'),
	Group = require('enyo/Group');

var
	RadioButton = require('onyx/RadioButton');

/**
* {@link onyx.RadioGroup} is a group of {@link onyx.RadioButton} objects laid out
* horizontally. Within the same radio group, tapping on one radio button will
* release any previously-tapped radio button.
*
* ```
* {kind: 'onyx.RadioGroup', components: [
* 	{content: 'foo', active: true},
* 	{content: 'bar'},
* 	{content: 'baz'}
* ]}
* ```
*
* @class  onyx.RadioGroup
* @extends enyo.Group
* @ui
* @public
*/
module.exports = kind(
	/** @lends  onyx.RadioGroup.prototype */ {

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
require('onyx');

var
	kind = require('enyo/kind');

/**
* {@link onyx.Groupbox} displays rows of controls as a vertically-stacked group.
* It is designed to have container controls as its children, with each container
* representing a row in the Groupbox.
*
* To add a header, specify an {@link onyx.GroupboxHeader} as the first control
* in the Groupbox, e.g.:
*
* ```
* {kind: 'onyx.Groupbox', components: [
* 	{kind: 'onyx.GroupboxHeader', content: 'Sounds'},
* 		{components: [
* 			{content: 'System Sounds'},
* 			{kind: 'onyx.ToggleButton', value: true}
* 		]},
* 		{kind: 'onyx.InputDecorator', components: [
* 			{kind: 'onyx.Input'}
* 		]}
* 	]}
* ]}
* ```
*
* @class  onyx.Groupbox
* @extends enyo.Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends onyx.Groupbox.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Groupbox',

	/**
	* @private
	*/
	classes: 'onyx-groupbox'
});
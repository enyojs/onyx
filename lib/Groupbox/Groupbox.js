require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Groupbox~Groupbox} kind.
* @module onyx/Groupbox
*/

var
	kind = require('enyo/kind');

/**
* {@link module:onyx/Groupbox~Groupbox} displays rows of controls as a vertically-stacked group.
* It is designed to have container controls as its children, with each container
* representing a row in the Groupbox.
*
* To add a header, specify an {@link module:onyx/GroupboxHeader~GroupboxHeader} as the first control
* in the Groupbox, e.g.:
*
* ```
* var
* 	Groupbox = require('onyx/Groupbox'),
* 	GroupboxHeader = require('onyx/GroupboxHeader'),
* 	Input = require('onyx/Input'),
* 	InputDecorator = require('onyx/InputDecorator'),
* 	ToggleButton = require('onyx/ToggleButton');
*
* {kind: Groupbox, components: [
* 	{kind: GroupboxHeader, content: 'Sounds'},
* 	{
* 		components: [
* 			{content: 'System Sounds'},
* 			{kind: ToggleButton, value: true}
* 		]
* 	},
* 	{kind: InputDecorator, components: [
* 		{kind: Input}
* 	]}
* ]}
* ```
*
* @class Groupbox
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Groupbox~Groupbox.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Groupbox',

	/**
	* @private
	*/
	classes: 'onyx-groupbox'
});

require('onyx');

/**
* Contains the declaration for the {@link module:onyx/PickerDecorator~PickerDecorator} kind.
* @module onyx/PickerDecorator
*/

var
	kind = require('enyo/kind');

var
	MenuDecorator = require('onyx/MenuDecorator'),
	PickerButton = require('onyx/PickerButton');

/**
* {@link module:onyx/PickerDecorator~PickerDecorator} is a control that loosely couples an
* {@link module:onyx/Picker~Picker} with an activating {@link module:onyx/PickerButton~PickerButton}. The
* decorator must surround both the activating button and the picker itself.
* When the button is activated, the picker shows itself in the correct
* position relative to the activator.
*
* ```
* var
* 	Picker = require('onyx/Picker'),
* 	PickerDecorator = require('onyx/PickerDecorator');
*
* {kind: PickerDecorator, components: [
* 	{}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
* 	{kind: Picker, components: [
* 		{content: 'Gmail', active: true},
* 		{content: 'Yahoo'},
* 		{content: 'Outlook'},
* 		{content: 'Hotmail'}
* 	]}
* ]}
* ```
*
* @class PickerDecorator
* @extends module:onyx/MenuDecorator~MenuDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/PickerDecorator~PickerDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.PickerDecorator',

	/**
	* @private
	*/
	kind: MenuDecorator,

	/**
	* @private
	*/
	classes: 'onyx-picker-decorator',

	/**
	* @private
	*/
	defaultKind: PickerButton,

	/**
	* @private
	*/
	handlers: {
		onChange: 'change'
	},

	/**
	* Handles [onChange]{@link module:onyx/Picker~Picker#onChange} event, waterfalling
	* it down to children.
	*
	* @private
	*/
	change: function (sender, event) {
		this.waterfallDown('onChange', event);
	}
});

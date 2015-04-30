require('onyx');

/**
* Contains the declaration for the {@link onyx.PickerButton} kind.
* @module onyx/PickerButton
*/

var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button');

/**
* {@link onyx.PickerButton} is a button that, when tapped, shows an
* {@link onyx.Picker}. Once an item is selected, the list of items closes, but
* the item stays selected and the PickerButton displays the choice that was made.
*
* @namespace onyx
* @class onyx.PickerButton
* @extends onyx.Button
* @ui
* @definedby module:onyx/PickerButton
* @public
*/
module.exports = kind(
	/** @lends onyx.PickerButton.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.PickerButton',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	handlers: {
		onChange: 'change'
	},

	/**
	* Handles [onChange]{@link onyx.Picker#onChange} event that is waterfalled
	* down from {@link onyx.PickerDecorator}.
	*
	* @private
	*/
	change: function (sender, event) {
		if (event.content !== undefined){
			this.setContent(event.content);
		}
	}
});

require('onyx');

/**
* Contains the declaration for the {@link onyx.TooltipDecorator} kind.
* @module onyx/TooltipDecorator
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Button = require('onyx/Button');

/**
* {@link onyx.TooltipDecorator} is a control that couples an {@link onyx.Tooltip}
* with an activating control, such as a button. The tooltip is displayed when the
* activator generates an `onenter` event:
*
*  ```
* 	{kind: 'onyx.TooltipDecorator', components: [
* 		{kind: 'onyx.Button', content: 'Tooltip'},
* 		{kind: 'onyx.Tooltip', content: 'I am a tooltip for a button.'}
* 	]}
* 	```
*
* Here's an example with an {@link onyx.Input} control and an
* {@link onyx.InputDecorator} around the input:
*
* ```
* 	{kind: 'onyx.TooltipDecorator', components: [
* 		{kind: 'onyx.InputDecorator', components: [
* 			{kind: 'onyx.Input', placeholder: 'Just an input...'}
* 		]},
* 		{kind: 'onyx.Tooltip', content: 'I am a tooltip for an input.'}
* 	]}
* 	```
*
* @namespace onyx
* @class onyx.TooltipDecorator
* @extends enyo.Control
* @ui
* @definedby module:onyx/TooltipDecorator
* @public
*/
module.exports = kind(
	/** @lends onyx.TooltipDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TooltipDecorator',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	defaultKind: Button,

	/**
	* @private
	*/
	classes: 'onyx-popup-decorator',

	/**
	* @private
	*/
	handlers: {
		onenter: 'enter',
		onleave: 'leave'
	},

	/**
	* @private
	*/
	enter: function () {
		this.requestShowTooltip();
	},

	/**
	* @private
	*/
	leave: function () {
		this.requestHideTooltip();
	},

	/**
	* @private
	*/
	tap: function () {
		this.requestHideTooltip();
	},

	/**
	* @private
	*/
	requestShowTooltip: function () {
		this.waterfallDown('onRequestShowTooltip');
	},

	/**
	* @private
	*/
	requestHideTooltip: function () {
		this.waterfallDown('onRequestHideTooltip');
	}
});

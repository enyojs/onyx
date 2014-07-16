(function (enyo, scope) {

	/**
	* _onyx.TooltipDecorator_ is a control that couples an
	* [onyx.Tooltip](@link onyx.Tooltip) with an activating control, such as a button.
	* The tooltip is displayed when the activator generates an _onenter_ event:
	*
	*  ```
	* 	{kind: 'onyx.TooltipDecorator', components: [
	* 		{kind: 'onyx.Button', content: 'Tooltip'},
	* 		{kind: 'onyx.Tooltip', content: 'I am a tooltip for a button.'}
	* 	]}
	* 	```
	*
	* Here is an example with an [onyx.Input](@link onyx.Input) control and a decorator
	* around the input:
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
	* @ui
	* @class onyx.TooltipDecorator
	* @extends enyo.Control
	* @public
	*/

	enyo.kind(
		/** @lends onyx.Button.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.TooltipDecorator',
	
		/**
		* @private
		*/
		kind: 'enyo.Control',

		/**
		* @private
		*/
		defaultKind: 'onyx.Button',

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

})(enyo, this);

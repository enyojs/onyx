(function (enyo, scope) {

	/**
	* Fires when cancel button is tapped
	*
	* @event onyx.ProgressButton#event:onCancel
	* @type {Object}
	* @public
	*/

	/**
	* _onyx.ProgressButton_ is a progress bar that has a cancel button on the right
	* and may have other controls inside of it.
	*
	* ```
	* {kind: 'onyx.ProgressButton'},
	* {kind: 'onyx.ProgressButton', barClasses: 'onyx-light', progress: 20, components: [
	* 	{content: '0'},
	* 	{content: '100', style: 'float: right;'}
	* ]}
	* ```
	*
	* For more information, see the documentation on [Progress
	* Indicators](building-apps/controls/progress-indicators.html) in the Enyo
	* Developer Guide.
	*
	* @class  onyx.ProgressButton
	* @extends onyx.ProgressBar
	* @ui
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.ProgressButton */ {

		/**
		* @private
		*/
		name: 'onyx.ProgressButton',

		/**
		* @private
		*/
		kind: 'onyx.ProgressBar',

		/**
		* @private
		*/
		classes: 'onyx-progress-button',

		/**
		* @private
		*/
		events: {
			onCancel: ''
		},

		/**
		* @private
		*/
		components: [
			{name: 'progressAnimator', kind: 'enyo.Animator', onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
			{name: 'bar', classes: 'onyx-progress-bar-bar onyx-progress-button-bar'},
			{name: 'client', classes: 'onyx-progress-button-client'},
			{kind: 'onyx.Icon', src: '$lib/onyx/images/progress-button-cancel.png', classes: 'onyx-progress-button-icon', ontap: 'cancelTap'}
		],

		/**
		* @fires onyx.ProgressButton#event:onCancel
		* @private
		*/
		cancelTap: function () {
			this.doCancel();
		}
	});

})(enyo, this);
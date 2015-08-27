require('onyx');

/**
* Contains the declaration for the {@link module:onyx/ProgressButton~ProgressButton} kind.
* @module onyx/ProgressButton
*/

var
	kind = require('enyo/kind'),
	Animator = require('enyo/Animator');

var
	Icon = require('onyx/Icon'),
	ProgressBar = require('onyx/ProgressBar');

/**
* Fires when cancel button is tapped.
*
* @event module:onyx/ProgressButton~ProgressButton#event:onCancel
* @type {Object}
* @public
*/

/**
* {@link module:onyx/ProgressButton~ProgressButton} is an {@link module:onyx/ProgressBar~ProgressBar} with a cancel
* button on the right; there may also be other controls inside.
*
* ```
* var
* 	ProgressButton = require('onyx/ProgressButton');
*
* {kind: ProgressButton},
* {kind: ProgressButton, barClasses: 'onyx-light', progress: 20, components: [
* 	{content: '0'},
* 	{content: '100', style: 'float: right;'}
* ]}
* ```
*
* @class ProgressButton
* @extends module:onyx/ProgressBar~ProgressBar
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/ProgressButton~ProgressButton */ {

	/**
	* @private
	*/
	name: 'onyx.ProgressButton',

	/**
	* @private
	*/
	kind: ProgressBar,

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
		{name: 'progressAnimator', kind: Animator, onStep: 'progressAnimatorStep', onEnd: 'progressAnimatorComplete'},
		{name: 'bar', classes: 'onyx-progress-bar-bar onyx-progress-button-bar'},
		{name: 'client', classes: 'onyx-progress-button-client'},
		{kind: Icon, src: 'images/progress-button-cancel.png', classes: 'onyx-progress-button-icon', ontap: 'cancelTap'}
	],

	/**
	* @fires module:onyx/ProgressButton~ProgressButton#event:onCancel
	* @private
	*/
	cancelTap: function () {
		this.doCancel();
	}
});

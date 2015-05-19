require('onyx');

/**
* Contains the declaration for the {@link onyx.Spinner} kind.
* @module onyx/Spinner
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link onyx.Spinner} is a control that displays a spinning animation to indicate
* that activity is taking place. By default, a light spinner, suitable for
* displaying against a dark background, is shown. To get a dark spinner
* (suitable for use on a lighter background), apply the `'onyx-light'` CSS class:
*
* ```
* {kind: 'onyx.Spinner', classes: 'onyx-light'}
* ```
*
* Typically, a spinner is shown to indicate activity and hidden to indicate
* that the activity has ended. The spinning animation will automatically start
* when the spinner is shown. If you wish, you may control the animation directly
* by calling the [start()]{@link onyx.Spinner#start}, [stop()]{@link onyx.Spinner#stop},
* and [toggle()]{@link onyx.Spinner#toggle} methods.
*
* @namespace onyx
* @class onyx.Spinner
* @extends enyo.Control
* @ui
* @definedby module:onyx/Spinner
* @public
*/
module.exports = kind(
	/** @lends onyx.Spinner.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Spinner',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-spinner',

	/**
	* Stops the spinner animation.
	*
	* @public
	*/
	stop: function () {
		this.setShowing(false);
	},

	/**
	* Starts the spinner animation.
	*
	* @public
	*/
	start: function () {
		this.setShowing(true);
	},

	/**
	* Toggles the spinner animation on or off.
	*
	* @public
	*/
	toggle: function () {
		this.setShowing(!this.getShowing());
	}
});

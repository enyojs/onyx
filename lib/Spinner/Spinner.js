require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Spinner~Spinner} kind.
* @module onyx/Spinner
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Spinner~Spinner} is a control that displays a spinning animation to indicate
* that activity is taking place. By default, a light spinner, suitable for
* displaying against a dark background, is shown. To get a dark spinner
* (suitable for use on a lighter background), apply the `'onyx-light'` CSS class:
*
* ```
* var
* 	Spinner = require('onyx/Spinner');
*
* {kind: Spinner, classes: 'onyx-light'}
* ```
*
* Typically, a spinner is shown to indicate activity and hidden to indicate
* that the activity has ended. The spinning animation will automatically start
* when the spinner is shown. If you wish, you may control the animation directly
* by calling the [start()]{@link module:onyx/Spinner~Spinner#start}, [stop()]{@link module:onyx/Spinner~Spinner#stop},
* and [toggle()]{@link module:onyx/Spinner~Spinner#toggle} methods.
*
* @class Spinner
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Spinner~Spinner.prototype */ {

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

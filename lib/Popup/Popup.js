require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Popup~Popup} kind.
* @module onyx/Popup
*/

var
	kind = require('enyo/kind'),
	Popup = require('enyo/Popup');

/**
* {@link module:onyx/Popup~Popup} is an {@link module:enyo/Popup~Popup} with Onyx styling applied.
*
* For more information, see the documentation on
* [Popups]{@linkplain $dev-guide/building-apps/controls/popups.html} in the
* Enyo Developer Guide.
*
* @class Popup
* @extends module:enyo/Popup~Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Popup~Popup.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Popup',

	/**
	* @private
	*/
	kind: Popup,

	/**
	* @private
	*/
	classes: 'onyx-popup'
});

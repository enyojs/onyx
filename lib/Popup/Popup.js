require('onyx');

var
	kind = require('enyo/kind'),
	Popup = require('enyo/Popup');

/**
* {@link onyx.Popup} is an {@link enyo.Popup} with Onyx styling applied.
*
* For more information, see the documentation on
* [Popups]{@linkplain $dev-guide/building-apps/controls/popups.html} in the
* Enyo Developer Guide.
*
* @class  onyx.Popup
* @extends enyo.Popup
* @ui
* @public
*/
module.exports = kind(
	/** @lends  onyx.Popup.prototype */ {

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
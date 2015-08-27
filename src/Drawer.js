require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Drawer~Drawer} kind.
* @module onyx/Drawer
*/

var
	kind = require('enyo/kind'),
	Drawer = require('enyo/Drawer');

/**
* {@link module:onyx/Drawer~Drawer} is now an empty kind derived from {@link module:enyo/Drawer~Drawer}.
* All of its functionality has been moved into the latter kind, found in Enyo
* Core's `ui` module.
*
* For more information, see the documentation on
* [Drawers]{@linkplain $dev-guide/building-apps/layout/drawers.html} in the
* Enyo Developer Guide.
*
* @class Drawer
* @extends module:enyo/Drawer~Drawer
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Drawer~Drawer.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Drawer',

	/**
	* @private
	*/
	kind: Drawer
});

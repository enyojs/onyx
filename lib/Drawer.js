require('onyx');

/**
* Contains the declaration for the {@link onyx.Drawer} kind.
* @module onyx/Drawer
*/

var
	kind = require('enyo/kind'),
	Drawer = require('enyo/Drawer');

/**
* {@link onyx.Drawer} is now an empty kind derived from {@link enyo.Drawer}.
* All of its functionality has been moved into the latter kind, found in Enyo
* Core's `ui` module.
*
* For more information, see the documentation on
* [Drawers]{@linkplain $dev-guide/building-apps/layout/drawers.html} in the
* Enyo Developer Guide.
*
* @namespace onyx
* @class onyx.Drawer
* @extends enyo.Drawer
* @ui
* @definedby module:onyx/Drawer
* @public
*/
module.exports = kind(
	/** @lends onyx.Drawer.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Drawer',

	/**
	* @private
	*/
	kind: Drawer
});

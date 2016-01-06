require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Item~Item} kind.
* @module onyx/Item
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Item~Item} is a control designed to display a group of stacked items,
* typically in a list. By default, items are highlighted when tapped. Set
* [tapHighlight]{@link module:onyx/Item~Item#tapHighlight} to	`false` to prevent the
* highlighting.
*
* ```
* var
* 	Item = require('onyx/Item');
*
* {kind: Item, tapHighlight: false}
* ```
*
* @class Item
* @extends module:enyo/Control~Control
* @ui
* @public
*/
var Item = module.exports = kind(
	/** @lends module:onyx/Item~Item.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Item',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-item',

	/**
	* @lends module:onyx/Item~Item.prototype
	* @private
	*/
	published: {
		/**
		* When `true`, the item will be automatically highlighted (the
		* `'onyx-highlight'` CSS class will be applied) when tapped. Set to
		* `false` to disable this behavior.
		*
		* @type {Boolean}
		* @default  true
		* @public
		*/
		tapHighlight: true
	},

	/**
	* @private
	*/
	handlers: {
		onhold: 'hold',
		onrelease: 'release'
	},

	/**
	* @private
	*/
	hold: function (sender, event) {
		if (this.tapHighlight) {
			Item.addRemoveFlyweightClass(this.controlParent || this, 'onyx-highlight', true, event);
		}
	},

	/**
	* @private
	*/
	release: function (sender, event) {
		if (this.tapHighlight) {
			Item.addRemoveFlyweightClass(this.controlParent || this, 'onyx-highlight', false, event);
		}
	},

	/**
	* @lends module:onyx/Item~Item
	* @private
	*/
	statics: {
		/**
		* Modifies a control by adding or removing a CSS class.
		*
		* @param {module:enyo/Control~Control} control - The control to modify.
		* @param {String} className     - The name of the CSS class.
		* @param {Boolean} add          - If `true`, the CSS class will be added;
		*		if `false`, it will be removed.
		* @param {Object} event       - The event object that triggered the call.
		* @param {Number} [index]     - Index of the row in the flyweight. Retrieved from
		* 	`event` if not specified.
		*
		* @public
		*/
		addRemoveFlyweightClass: function (control, className, add, event, index) {
			var flyweight = event.flyweight;
			if (flyweight) {
				index = index !== undefined ? index : event.index;
				flyweight.performOnRow(index, function () {
					control.addRemoveClass(className, add);
				});
			}
		}
	}
});

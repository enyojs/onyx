(function (enyo, scope) {

	/**
	* _onyx.Item_ is a control designed to display a group of stacked items,
	* typically in lists. By default, items are highlighted when tapped. Set
	* {@link onyx.Item#tapHighlight} to	`false` to prevent the highlighting.
	*
	* ```
	* {kind: 'onyx.Item', tapHighlight: false}
	* ```
	*
	* @class  onyx.Item
	* @extends enyo.Control
	* @ui
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.Item.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.Item',

		/**
		* @private
		*/
		classes: 'onyx-item',

		/**
		* @lends onyx.Item.prototype
		* @private
		*/
		published: {
			/**
			* If true, the item will be automatically highlighted (the _onyx-highlight_
			* CSS class will be applied) when tapped. Set to false to disable this
			* behavior
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
				onyx.Item.addRemoveFlyweightClass(this.controlParent || this, 'onyx-highlight', true, event);
			}
		},

		/**
		* @private
		*/
		release: function (sender, event) {
			if (this.tapHighlight) {
				onyx.Item.addRemoveFlyweightClass(this.controlParent || this, 'onyx-highlight', false, event);
			}
		},

		/**
		* @lends  onyx.Item
		* @private
		*/
		statics: {
			/**
			* Adds or removes `className` to `control` based on `add`
			*
			* @param {enyo.Control} control - Control to modify
			* @param {String} className     - CSS Class Name
			* @param {Boolean} add          - If `true`, the class is added. If `false`, the class
			* 	is removed
			* @param {Object} event       - Event object that triggered the call
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
})(enyo, this);
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
		hold: function (inSender, inEvent) {
			if (this.tapHighlight) {
				onyx.Item.addRemoveFlyweightClass(this.controlParent || this, 'onyx-highlight', true, inEvent);
			}
		},

		/**
		* @private
		*/
		release: function (inSender, inEvent) {
			if (this.tapHighlight) {
				onyx.Item.addRemoveFlyweightClass(this.controlParent || this, 'onyx-highlight', false, inEvent);
			}
		},

		/**
		* @lends  onyx.Item
		* @private
		*/
		statics: {
			/**
			* Adds or removes `inClass` to `inControl` based on `inTrueToAdd`
			* 
			* @param {enyo.Control} inControl - Control to modify
			* @param {String} inClass     - CSS Class Name
			* @param {Boolean} inTrueToAdd - If `true`, the class is added. If `false`, the class
			* 	is removed
			* @param {Object} inEvent     - Event object that triggered the call
			* @param {Number} [inIndex]   - Index of the row in the flyweight. Retrieved from
			* 	`inEvent` if not specified.
			*
			* @public
			*/
			addRemoveFlyweightClass: function (inControl, inClass, inTrueToAdd, inEvent, inIndex) {
				var flyweight = inEvent.flyweight;
				if (flyweight) {
					var index = inIndex !== undefined ? inIndex : inEvent.index;
					flyweight.performOnRow(index, function () {
						inControl.addRemoveClass(inClass, inTrueToAdd);
					});
				}
			}
		}
	});
})(enyo, this);
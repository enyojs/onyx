/**
	_onyx.Item_ is a control designed to display a group of stacked items,
	typically in lists. By default, items are highlighted when tapped. Set
	_tapHighlight_ to	_false_ to prevent the highlighting.

		{kind: "onyx.Item", tapHighlight: false}
*/
enyo.kind({
	name: "onyx.Item",
	classes: "onyx-item",
	/**
		If true, the item will be automatically highlighted (the _onyx-highlight_
		CSS class will be applied) when tapped. Set to false to disable this
		behavior.
	*/
	tapHighlight: true,
	//* @protected
	handlers: {
		onhold: "hold",
		onrelease: "release"
	},
	//* @public
	hold: function(inSender, inEvent) {
		if (this.tapHighlight) {
			onyx.Item.addRemoveFlyweightClass(this.controlParent || this, "onyx-highlight", true, inEvent);
		}
	},
	release: function(inSender, inEvent) {
		if (this.tapHighlight) {
			onyx.Item.addRemoveFlyweightClass(this.controlParent || this, "onyx-highlight", false, inEvent);
		}
	},
	//* @protected
	statics: {
		addRemoveFlyweightClass: function(inControl, inClass, inTrueToAdd, inEvent, inIndex) {
			var flyweight = inEvent.flyweight;
			if (flyweight) {
				var index = inIndex !== undefined ? inIndex : inEvent.index;
				flyweight.performOnRow(index, function() {
					inControl.addRemoveClass(inClass, inTrueToAdd);
				});
			} else {
				inControl.addRemoveClass(inClass, inTrueToAdd);
			}
		}
	}
});

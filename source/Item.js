/**
	A control designed to display a group of stacked items, typically used in
	lists. By default, items are highlighted when tapped. Set *tapHighlight* to
	false to prevent the highlighting.

		{kind: "onyx.Item", tapHighlight: false}
*/
enyo.kind({
	name: "onyx.Item",
	classes: "onyx-item",
	//* When true, the item will automatically highlight (by application of the onyx-highlight
	//* CSS class) when tapped. Set to false to disable this behavior.
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
			}
		}
	}
});
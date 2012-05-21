enyo.kind({
	name: "onyx.Item",
	classes: "onyx-item",
	tapHighlight: true,
	handlers: {
		onhold: "hold",
		onrelease: "release"
	},
	hold: function(inSender, inEvent) {
		if (this.tapHighlight) {
			onyx.Item.addFlyweightClass(this.controlParent || this, "onyx-highlight", inEvent);
		}
	},
	release: function(inSender, inEvent) {
		if (this.tapHighlight) {
			onyx.Item.removeFlyweightClass(this.controlParent || this, "onyx-highlight", inEvent);
		}
	},
	statics: {
		addFlyweightClass: function(inControl, inClass, inEvent, inIndex) {
			var flyweight = inEvent.flyweight;
			if (flyweight) {
				var index = inIndex != undefined ? inIndex : inEvent.index;
				flyweight.performOnRow(index, function() {
					if (!inControl.hasClass(inClass)) {
						inControl.addClass(inClass);
					} else {
						inControl.setClassAttribute(inControl.getClassAttribute());
					}
				});
				enyo.log(inControl.generated);
				inControl.removeClass(inClass);
			}
		},
		// FIXME: dry
		removeFlyweightClass: function(inControl, inClass, inEvent, inIndex) {
			var flyweight = inEvent.flyweight;
			if (flyweight) {
				var index = inIndex != undefined ? inIndex : inEvent.index;
				flyweight.performOnRow(index, function() {
					if (!inControl.hasClass(inClass)) {
						inControl.setClassAttribute(inControl.getClassAttribute());
					} else {
						inControl.removeClass(inClass);
					}
				});
			}
		}
	}
});
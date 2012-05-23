/**
	An item that slides to the left to reveal Delete and Cancel buttons. Pressing the Cancel button will slide the item back into place and generate
	an onCancel event. Pressing the Delete button will immediately position the content back in place and generate an onDelete event.

	A SwipeableItem contains methods for styling its content and these should be used to effect styling on the row content. Add css classes via
	the contentClasses property and the methods add|remove|has|addRemove<ContentClass>. Alter css styles via the applyContentStyle method.

*/
enyo.kind({
	name: "onyx.SwipeableItem",
	kind: "onyx.Item",
	classes: "onyx-swipeable-item",
	published: {
		contentClasses: ""
	},
	defaultContentClasses: "onyx-swipeable-item-content",
	handlers: {
		ondown: "down"
	},
	events: {
		onDelete: "",
		onCancel: ""
	},
	components: [
		{name: "client", kind: "Slideable", min: -100, unit: "%", ondragstart: "clientDragStart"},
		{name: "confirm", kind: "onyx.Toolbar", canGenerate: false, classes: "onyx-swipeable-item-confirm enyo-fit", style: "text-align: center;", ontap: "confirmTap", components: [
			{kind: "onyx.Button", content: "Delete", ontap: "deleteTap"},
			{kind: "onyx.Button", content: "Cancel", ontap: "cancelTap"}
		]}
	],
	swiping: -1,
	create: function() {
		this.inherited(arguments);
		this.contentClassesChanged();
	},
	reset: function() {
		this.applyStyle("position", null);
		this.$.confirm.setShowing(false);
		// stop animating if we reset.
		this.$.client.getAnimator().stop();
		this.$.client.setValue(0);
	},
	contentClassesChanged: function() {
		this.$.client.setClasses(this.defaultContentClasses + " " + this.contentClasses);
	},
	applyContentStyle: function(inStyle, inValue) {
		this.$.client.applyStyle(inStyle, inValue);
	},
	addContentClass: function(inClass) {
		this.$.client.addClass(inClass);
	},
	removeContentClass: function(inClass) {
		this.$.client.removeClass(inClass);
	},
	hasContentClass: function(inClass) {
		return this.$.client.hasClass(inClass);
	},
	addRemoveContentClass: function(inClass, inAdd) {
		this.$.client.addRemoveClass(inClass, inAdd);
	},
	generateHtml: function() {
		this.reset();
		return this.inherited(arguments);
	},
	contentChanged: function() {
		this.$.client.setContent(this.content);
	},
	confirmTap: function() {
		return true;
	},
	deleteTap: function(inSender, inEvent) {
		this.reset();
		this.doDelete();
		return true;
	},
	cancelTap: function(inSender, inEvent) {
		this.$.client.animateToMax();
		this.doCancel();
		return true;
	},
	down: function(inSender, inEvent) {
		// on down, remove swiping state
		var last = this.swiping;
		this.swiping = inEvent.index;
		var flyweight = inEvent.flyweight;
		if (this.swiping != last && last >= 0 && flyweight) {
			flyweight.performOnRow(last, enyo.bind(this, function() {
				this.reset();
			}));
		}
	},
	clientDragStart: function(inSender, inEvent) {
		if (inSender.dragging) {
			var flyweight = inEvent.flyweight;
			if (flyweight) {
				flyweight.prepareRow(inEvent.index);
				// if needed, render confirm.
				// NOTE: position relative so can enyo-fit confirm; apply only when confirm needed
				// because it's a known rendering slowdown.
				this.applyStyle("position", "relative");
				this.$.confirm.setShowing(true);
				if (!this.$.confirm.hasNode()) {
					// NOTE: prepend so Slideable will be on top.
					this.$.confirm.prepend = true;
					this.$.confirm.render();
					this.$.confirm.prepend = false;
				}
				// note: can't teardown.
			}
		}
	}
});
/**
 A menu control.
 */
enyo.kind({
	name: "onyx.Menu",
	kind: "onyx.Popup",
	handlers: {
		onRequestOpen: "requestOpen",
		onActivate: "activated"
	},
	defaultKind: "onyx.MenuItem",
	classes: "onyx-menu",
	activated: function(inSender, inEvent) {
		inEvent.originator.setActive(false);
		this.hide();
		return true;
	},
	requestOpen: function(inSender, inEvent) {
		this.show();
		return true;
	}
});

enyo.kind({
	name: "onyx.MenuDecorator",
	defaultKind: "onyx.MenuButton",
	classes: "onyx-menu-decorator",
	handlers: {
		onActivate: "activated",
		onHide: "menuHidden"
	},
	activated: function(inSender, inEvent) {
		if (inEvent.originator.active) {
			this.activator = inSender;
			this.waterfallDown("onRequestOpen", inEvent);
		}
	},
	menuHidden: function() {
		if (this.activator) {
			this.activator.setActive(false);
		}
	}
});

enyo.kind({
	name: "onyx.MenuButton",
	kind: "onyx.Button",
	activeChanged: function() {
		this.inherited(arguments);
		this.addRemoveClass("active", this.active);
	}
});

enyo.kind({
	name: "onyx.MenuItem",
	kind: "enyo.GroupItem",
	classes: "onyx-menu-item",
	tap: function() {
		this.setActive(true);
	}
});
/**
 A menu decorator.
 */
enyo.kind({
	name: "onyx.MenuDecorator",
	kind: "onyx.TooltipDecorator",
	defaultKind: "onyx.Button",
	// selection on ios prevents tap events, so avoid.
	classes: "onyx-popup-decorator enyo-unselectable",
	handlers: {
		onActivate: "activated",
		onHide: "menuHidden"
	},
	activated: function(inSender, inEvent) {
		this.requestHideTooltip();
		if (inEvent.originator.active) {
			this.menuActive = true;
			this.activator = inEvent.originator;
			this.activator.addClass("active");
			this.requestShowMenu();
		} else {
			this.requestHideMenu();
		}
	},
	requestShowMenu: function() {
		this.waterfallDown("onRequestShowMenu", {activator: this.activator});
	},
	requestHideMenu: function() {
		this.waterfallDown("onRequestHideMenu");
	},
	menuHidden: function() {
		this.menuActive = false;
		if (this.activator) {
			this.activator.setActive(false);
			this.activator.removeClass("active");
		}
	},
	enter: function(inSender) {
		if (!this.menuActive) {
			this.inherited(arguments);
		}
	},
	leave: function(inSender, inEvent) {
		if (!this.menuActive) {
			this.inherited(arguments);
		}
	}
});
/**
 A menu control.
 */
enyo.kind({
	name: "onyx.Menu",
	kind: "onyx.Popup",
	modal: true,
	defaultKind: "onyx.MenuItem",
	classes: "onyx-menu",
	handlers: {
		onActivate: "itemActivated",
		onRequestShowMenu: "requestShow",
		onRequestHideMenu: "requestHide"
	},
	itemActivated: function(inSender, inEvent) {
		inEvent.originator.setActive(false);
		this.hide();
		return true;
	}
});
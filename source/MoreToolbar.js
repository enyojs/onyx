enyo.kind({
	name: "onyx.MoreToolbar",
	layoutKind: "FittableColumnsLayout",
	noStretch: true,
	classes: "onyx-toolbar onyx-more-toolbar",
	tools: [
		{name: "client", fit: true, classes: "onyx-toolbar-inline"},
		{name: "nard", kind: "onyx.MenuDecorator", showing: false, components: [
			{kind: "onyx.IconButton", classes: "onyx-more-button"},
			{name: "menu", kind: "onyx.Menu", classes: "onyx-more-menu", prepend: true}
		]}
	],
	initComponents: function() {
		this.createChrome(this.tools);
		this.inherited(arguments);
	},
	reflow: function() {
		this.inherited(arguments);
		if (this.isContentOverflowing()) {
			this.$.nard.show();
			if (this.popItem()) {
				this.reflow();
			}
		} else if (this.tryPushItem()) {
			this.reflow();
		} else if (!this.$.menu.children.length) {
			this.$.nard.hide();
			this.$.menu.hide();
		}
	},
	popItem: function() {
		var c = this.findCollapsibleItem();
		if (c) {
			this.$.menu.addChild(c);
			var p = this.$.menu.hasNode();
			if (p && c.hasNode()) {
				c.insertNodeInParent(p);
			}
			return true;
		}
	},
	pushItem: function() {
		var c$ = this.$.menu.children;
		var c = c$[0];
		if (c) {
			this.$.client.addChild(c);
			var p = this.$.client.hasNode();
			if (p && c.hasNode()) {
				c.appendNodeToParent(p);
			}
			return true;
		}
	},
	tryPushItem: function() {
		if (this.pushItem()) {
			if (!this.isContentOverflowing()) {
				return true;
			} else {
				this.popItem();
			}
		}
	},
	isContentOverflowing: function() {
		if (this.$.client.hasNode()) {
			return (this.$.client.node.scrollWidth > this.$.client.node.clientWidth);
		}
	},
	findCollapsibleItem: function() {
		var c$ = this.$.client.children;
		for (var i=c$.length-1; c=c$[i]; i--) {
			if (!c.unmoveable) {
				return c;
			}
		}
	}
});

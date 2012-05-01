enyo.kind({
	name: "onyx.Drawer",
	published: {
		open: true,
		orient: "v"
	},
	style: "overflow: hidden; position: relative;",
	tools: [
		{kind: "Animator", onStep: "animatorStep", onEnd: "animatorEnd"},
		{name: "client", style: "position: relative;", classes: "enyo-border-box"}
	],
	create: function() {
		this.inherited(arguments);
		this.openChanged();
	},
	initComponents: function() {
		this.createChrome(this.tools);
		this.inherited(arguments);
	},
	openChanged: function() {
		this.$.client.show();
		if (this.hasNode()) {
			var v = this.orient == "v";
			var d = v ? "height" : "width";
			var p = v ? "top" : "left";
			this.applyStyle(d, null);
			var s = this.hasNode()[v ? "scrollHeight" : "scrollWidth"];
			this.$.animator.play({
				startValue: this.open ? 0 : s,
				endValue: this.open ? s : 0,
				dimension: d,
				position: p
			});
		} else {
			this.$.client.setShowing(this.open);
		}
	},
	animatorStep: function(inSender) {
		if (this.hasNode()) {
			var d = inSender.dimension;
			this.node.style[d] = this.domStyles[d] = inSender.value + "px";
		}
		var cn = this.$.client.hasNode()
		if (cn) {
			var p = inSender.position;
			var o = (this.open ? inSender.endValue : inSender.startValue);
			cn.style[p] = this.$.client.domStyles[p] = (inSender.value - o) + "px";
		}
		if (this.container) {
			this.container.resized();
		}
	},
	animatorEnd: function() {
		if (!this.open) {
			this.$.client.hide();
		}
		if (this.container) {
			this.container.resized();
		}
	}
});
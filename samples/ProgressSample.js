enyo.kind({
	name: "onyx.sample.ProgressSample",
	classes: "onyx onyx-sample",
	components: [
		{classes: "onyx-sample-divider", content: "Progress Bars"},
		{kind: "onyx.ProgressBar", progress: 25},
		{kind: "onyx.ProgressBar", animateStripes: false, barClasses: "onyx-light", progress: 50},
		{kind: "onyx.ProgressBar", showStripes: false, progress: 75},
		{tag: "br"},
		{classes: "onyx-sample-divider", content: "Progress Buttons"},
		{kind: "onyx.ProgressButton", progress: 25, onCancel:"clearValue", components: [
			{content: "0"},
			{content: "100", style: "float: right;"}
		]},
		{kind: "onyx.ProgressButton", animateStripes: false, barClasses: "onyx-dark", progress: 50, onCancel:"clearValue"},
		{kind: "onyx.ProgressButton", showStripes: false, progress: 75, onCancel:"clearValue"},
		{tag: "br"},
		{kind: "onyx.InputDecorator", style:"margin-right:10px;", components: [
			{kind: "onyx.Input", placeholder: "Value", style:"width:50px;"}
		]},
		{kind: "onyx.Button", content:"Set", classes:"onyx-sample-spaced-button", ontap:"changeValue"},
		{kind: "onyx.Button", content:"-", classes:"onyx-sample-spaced-button", ontap:"decValue"},
		{kind: "onyx.Button", content:"+", classes:"onyx-sample-spaced-button", ontap:"incValue"},
		{tag: "br"},
		{tag: "br"},
		{kind: "onyx.Checkbox", name:"animateSetting", value:true},
		{content:"Animated", classes:"enyo-inline onyx-sample-animate-label"}
	],
	changeValue: function(inSender, inEvent) {
		for (var i in this.$) {
			if (this.$[i].kind == "onyx.ProgressBar" || this.$[i].kind == "onyx.ProgressButton") {
				if (this.$.animateSetting.getValue()) {
					this.$[i].animateProgressTo(this.$.input.getValue());
				} else {
					this.$[i].setProgress(this.$.input.getValue());
				}
			}
		}
	},
	incValue: function() {
		this.$.input.setValue(Math.min(parseInt(this.$.input.getValue() || 0) + 10, 100));
		this.changeValue();
	},
	decValue: function() {
		this.$.input.setValue(Math.max(parseInt(this.$.input.getValue() || 0) - 10, 0));
		this.changeValue();
	},
	clearValue: function(inSender, inEvent) {
		inSender.setProgress(0);
	}
});

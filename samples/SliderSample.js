enyo.kind({
	name: "onyx.sample.SliderSample",
	classes: "onyx onyx-sample",
	components: [
		{classes: "onyx-sample-divider", content: "Sliders"},
		{kind: "onyx.Slider", value: 50, onChanging:"sliderChanging", onChange:"sliderChanged"},
		{tag: "br"},
		{kind: "onyx.Slider", lockBar: false, value: 50, onChanging:"sliderChanging", onChange:"sliderChanged"},
		
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
		{content:"Animated", classes:"enyo-inline onyx-sample-animate-label"},
		{tag: "br"},
		{tag: "br"},
		{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
			{kind: "onyx.GroupboxHeader", content: "Result"},
			{name:"result", classes:"onyx-sample-result", content:"No slider moved yet."}
		]}
	],
	changeValue: function(inSender, inEvent) {
		for (var i in this.$) {
			if (this.$[i].kind == "onyx.Slider") {
				if (this.$.animateSetting.getValue()) {
					this.$[i].animateTo(this.$.input.getValue());
				} else {
					this.$[i].setValue(this.$.input.getValue());
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
	sliderChanging: function(inSender, inEvent) {
		this.$.result.setContent(inSender.name + " changing: " + Math.round(inSender.getValue()));
	},
	sliderChanged: function(inSender, inEvent) {
		this.$.result.setContent(inSender.name + " changed to " + Math.round(inSender.getValue()) + ".");
	}
});

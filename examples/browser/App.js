enyo.kind({
	name: "App",
	classes: "onyx box v",
	components: [
		{kind: "onyx.Toolbar", classes: "box h center", style: "height: 58px; width: 100%; margin-bottom: 2px;", components: [
			{kind: "Image", src: "../../resources/grabbutton.png"},
			{content: "Flexbox"},
			{kind: "onyx.Button", content: "Back", ontap: "back"},
			{kind: "onyx.Button", content: "Forward", ontap: "forward"},
			{kind: "onyx.InputDecorator", classes: "flex1", components: [
				{kind: "onyx.Input", onchange: "inputChange", style: "width: 100%;", value: "http://www.enyojs.com", defaultFocus: true}
			]},
			{kind: "onyx.Button", content: "Go", ontap: "go"}
		]},
		{kind: "onyx.Toolbar", style: "margin-bottom: 2px;", components: [
			{kind: "Image", src: "../../resources/grabbutton.png"},
			{content: "Unsized"},
			{kind: "onyx.Button", content: "Back", ontap: "back"},
			{kind: "onyx.Button", content: "Forward", ontap: "forward"},
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", onchange: "inputChange", value: "http://www.cnn.com"}
			]},
			{kind: "onyx.Button", content: "Go", ontap: "go", input: "input2"}
		]},
		{kind: "onyx.Toolbar", style: "position: relative; margin-bottom: 2px;", components: [
			{kind: "Image", src: "../../resources/grabbutton.png"},
			{content: "Absolute"},
			{kind: "onyx.Button", content: "Back", ontap: "back"},
			{kind: "onyx.Button", content: "Forward", ontap: "forward"},
			{kind: "onyx.InputDecorator", classes: "enyo-fit", style: "left: 330px; bottom: auto; top: 10px; right: 74px; height: 26px;", components: [
				{kind: "onyx.Input", onchange: "inputChange", style: "position: absolute; width: 100%;", value: "http://www.amazon.com"}
			]},
			{kind: "onyx.Button", content: "Go", style: "position: absolute; right: 0; top: 10px;", ontap: "go", input: "input3"}
		]},
		{classes: "flex1", style: "position: relative;", components: [
			{name: "iframe", tag: "iframe", classes: "frame"}
		]}
	],
	create: function() {
		this.inherited(arguments);
		this.go();
	},
	inputChange: function(inSender) {
		this.go();
	},
	go: function(inSender) {
		var input = inSender && inSender.input ? this.$[inSender.input] : this.$.input;
		this.$.iframe.setSrc(input.getValue());
	},
	back: function() {
		this.$.iframe.hasNode().contentWindow.history.back();
	},
	forward: function() {
		this.$.iframe.hasNode().contentWindow.history.forward();
	}
});

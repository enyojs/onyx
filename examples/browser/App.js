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
		{kind: "onyx.Toolbar", style: "margin-bottom: 2px; overflow: hidden;", components: [
			{kind: "Image", src: "../../resources/grabbutton.png", style: "float: left; margin-top: 8px;"},
			{content: "Float", style: "float: left;"},
			{kind: "onyx.Button", content: "Back", ontap: "back", style: "float: left; margin-top: 8px;"},
			{kind: "onyx.Button", content: "Forward", ontap: "forward", style: "float: left; margin-top: 8px;"},
			{kind: "onyx.Button", content: "Go", ontap: "go", input: "input2", style: "float: right; margin-top: 8px;"},
			{kind: "onyx.InputDecorator", style: "overflow: hidden; display: block; margin-top: 8px;", components: [
				{kind: "onyx.Input", onchange: "inputChange", value: "http://www.cnn.com"}
			]}
		]},
		{kind: "onyx.Toolbar", style: "margin-bottom: 2px;", components: [
			{style: "overflow: hidden; width: 100%;", components: [
				{kind: "Image", src: "../../resources/grabbutton.png", classes: "onyx-toolbar-item", style: "float: left;"},
				{content: "Float", classes: "onyx-toolbar-item", style: "float: left; line-height: normal;"},
				{kind: "onyx.Button", content: "Back", ontap: "back", classes: "onyx-toolbar-item", style: "float: left;"},
				{kind: "onyx.Button", content: "Forward", ontap: "forward", classes: "onyx-toolbar-item", style: "float: left;"},
				{kind: "onyx.Button", content: "Go", ontap: "go", input: "input2", classes: "onyx-toolbar-item", style: "float: right;"},
				{kind: "onyx.InputDecorator", classes: "onyx-toolbar-item", style: "overflow: hidden; display: block;", components: [
					{kind: "onyx.Input", onchange: "inputChange", value: "http://www.cnn.com"}
				]}
			]}
		]},


		{kind: "onyx.Toolbar", style: "margin-bottom: 2px; display: table; width: 100%; line-height: normal;", components: [
			{kind: "Image", src: "../../resources/grabbutton.png", style: "display: table-cell;"},
			{content: "Table", style: "display: table-cell;"},
			{kind: "onyx.Button", content: "Back", ontap: "back", style: "display: table-cell;"},
			{kind: "onyx.Button", content: "Forward", ontap: "forward", style: "display: table-cell;"},
			{kind: "onyx.InputDecorator", style: "display: table-cell;", components: [
				{kind: "onyx.Input", onchange: "inputChange", value: "http://www.cnn.com"}
			]},
			{kind: "onyx.Button", content: "Go", ontap: "go", input: "input2", style: "display: table-cell;"}
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

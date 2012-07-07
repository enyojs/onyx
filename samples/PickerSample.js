enyo.kind({
	name: "onyx.sample.PickerSample",
	kind: "FittableRows",
	classes: "onyx onyx-sample",
	handlers: {
		onSelect: "itemSelected"
	},
	components: [
		{kind: "onyx.Toolbar", content: "Pickers"},
		{kind: "Scroller", fit: true, components: [
			{classes: "onyx-toolbar-inline", style: "margin: 20px;", components: [				
				{kind: "onyx.PickerDecorator", components: [
					{},
					{kind: "onyx.Picker", components: [
						{content: "Gmail", active: true},
						{content: "Yahoo"},
						{content: "Outlook"},
						{content: "Hotmail"}
					]}
				]},
				{kind: "onyx.PickerDecorator", components: [
					{kind: "onyx.Button", content: "Pick One...", style: "width: 200px"},
					{kind: "onyx.Picker", components: [
						{content: "Hello!"},
						{content: "I am busy."},
						{content: "Good Bye."}
					]}
				]},
				{tag: "br"},
				{style: "display: block; height: 50px;"},
				{classes: "onyx-toolbar-inline", components: [
					{content: "Integer", classes: "onyx-sample-label"},
					{kind: "onyx.PickerDecorator", components: [
						{style: "min-width: 60px;"},
						{name: "integerPicker", kind: "onyx.Picker"}
					]}
				]},
				{classes: "onyx-toolbar-inline", components: [
					{content: "Date", classes: "onyx-sample-label"},
					{kind: "onyx.PickerDecorator", components: [
						{},
						{name: "monthPicker", kind: "onyx.Picker"}
					]},
					{kind: "onyx.PickerDecorator", components: [
						{style: "min-width: 60px;"},
						{name: "dayPicker", kind: "onyx.Picker"}
					]}
				]},
				{classes: "onyx-toolbar-inline", components: [
					{content: "Year", classes: "onyx-sample-label"},
					{kind: "onyx.PickerDecorator", components: [
						{style: "min-width: 80px;"},
						{name: "yearPicker", kind: "onyx.FlyweightPicker", count: 200, onSetupItem: "setupYear", components: [
							{name: "year"}
						]}
					]}
				]}
			]}
		]},
		{classes: "onyx-toolbar-inline", style: "height: 50px; margin: 20px; padding-bottom:15px;", components: [
			{kind: "onyx.PickerDecorator", components: [
				{},
				{kind: "onyx.Picker", components: [
					{content: "Gmail"},
					{content: "Yahoo"},
					{content: "Outlook"},
					{content: "Hotmail", active: true}
				]}
			]},
			{kind: "onyx.Groupbox", style:"float:right;padding-left:10px;", components: [
				{kind: "onyx.GroupboxHeader", content: "Selection"},
				{name:"pickerSelection", content: "?", style:"text-align:center;"}
			]}					
		]},
	],
	create: function() {
		this.inherited(arguments);
		// integer
		for (var i=0; i<10; i++) {
			this.$.integerPicker.createComponent({content: i, active: !i});
		}
		// month
		var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		var d = new Date();
		for (var i=0,m; m=months[i]; i++) {
			this.$.monthPicker.createComponent({content: m, active: i==d.getMonth()});
		}
		// day
		for (var i=0; i<30; i++) {
			this.$.dayPicker.createComponent({content: i+1, active: i==d.getDate()-1});
		}
		// year
		var y = d.getYear();
		this.$.yearPicker.setSelected(y);
		this.$.year.setContent(1900+y);
	},
	setupYear: function(inSender, inEvent) {
		this.$.year.setContent(1900+inEvent.index);
	},
	itemSelected: function(inSender, inEvent) {
		this.$.pickerSelection.setContent(inEvent.selected.content);
	}
});

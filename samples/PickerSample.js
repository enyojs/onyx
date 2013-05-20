enyo.kind({
	name: "onyx.sample.PickerSample",
	kind: "FittableRows",
	classes: "onyx onyx-sample",
	handlers: {
		onSelect: "itemSelected"
	},
	components: [
		{content: "Default Picker", classes:"onyx-sample-divider"},
		{kind: "onyx.PickerDecorator", components: [
			{},
			{kind: "onyx.Picker", components: [
				{content: "Gmail", active: true},
				{content: "Yahoo"},
				{content: "Outlook"},
				{content: "Hotmail"}
			]}
		]},
		{tag: "br"},
		{content: "Picker with Static Button", classes:"onyx-sample-divider"},
		{kind: "onyx.PickerDecorator", components: [
			{kind: "onyx.PickerButton", content: "Pick One...", style: "width: 200px"},
			{kind: "onyx.Picker", components: [
				{content: "Hello!"},
				{content: "I am busy."},
				{content: "Good Bye."}
			]}
		]},
		{tag: "br"},
		{content: "Integer Picker", classes:"onyx-sample-divider"},
		{classes: "onyx-toolbar-inline", components: [
			{kind: "onyx.PickerDecorator", components: [
				{style: "min-width: 60px;"},
				{kind: "onyx.IntegerPicker", min: 0, max: 25, value: 5}
			]}
		]},
		{tag: "br"},
		{content: "Other Pickers", classes:"onyx-sample-divider"},
		{classes: "onyx-toolbar-inline", components: [
			{content: "Date", classes: "onyx-sample-label"},
			{kind: "onyx.PickerDecorator", components: [
				{},
				{name: "monthPicker", kind: "onyx.Picker"}
			]},
			{kind: "onyx.PickerDecorator", components: [
				{style: "min-width: 60px;"},
				{name: "dayPicker", kind: "onyx.Picker"}
			]},
			{classes: "onyx-toolbar-inline", style:"margin: 0px;", components: [
				{content: "Year", classes: "onyx-sample-label"},
				{kind: "onyx.PickerDecorator", components: [
					{name:"yearPickerButton", style: "min-width: 80px;"},
					{name: "yearPicker", kind: "onyx.FlyweightPicker", count: 200, onSetupItem: "setupYear", components: [
						{name: "year"}
					]}
				]}
			]}
		]},
		{tag: "br"},
		{classes: "onyx-toolbar-inline", components: [
			{kind: "onyx.PickerDecorator", components: [
				{},
				{kind: "onyx.Picker", components: [
					{content: "Gmail"},
					{content: "Yahoo"},
					{content: "Outlook"},
					{content: "Hotmail", active: true}
				]}
			]}
		]},
		{tag: "br"},
		{kind: "onyx.Groupbox", classes:"onyx-sample-result-box", components: [
			{kind: "onyx.GroupboxHeader", content: "Selection"},
			{name:"pickerSelection", classes:"onyx-sample-result", content: "Nothing picked yet."}
		]}
	],
	create: function() {
		this.inherited(arguments);
		// month
		var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
		var d = new Date();
		var i, m;
		for (i=0; (m=months[i]); i++) {
			this.$.monthPicker.createComponent({content: m, active: i==d.getMonth()});
		}
		// day
		for (i=0; i<30; i++) {
			this.$.dayPicker.createComponent({content: i+1, active: i==d.getDate()-1});
		}
		// year
		var y = d.getYear();
		this.$.yearPicker.setSelected(y);
		this.$.yearPickerButton.setContent(1900+y);
	},
	setupYear: function(inSender, inEvent) {
		this.$.year.setContent(1900+inEvent.index);
		return true;
	},
	itemSelected: function(inSender, inEvent) {
		this.$.pickerSelection.setContent(inEvent.selected.content);
	}
});
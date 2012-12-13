enyo.kind({
	name: "onyx.sample.TimePickerSample",
	kind: "FittableRows",
	classes: "onyx enyo-fit",
	handlers: {
		onSelect: "updateTimeValues"
	},
	components: [
		{kind: "onyx.Toolbar", content:$L("Times")},
		{kind: "FittableColumns", style: "padding: 10px", components:[
			{components: [
				{content:$L("Choose Locale:"), classes:"onyx-sample-divider"},
				{kind: "onyx.PickerDecorator", style:"padding:10px;", onSelect: "pickerHandler", components: [
					{content: "Pick One...", style: "width: 200px"},
					{kind: "onyx.Picker", components: [
						{content: 'en_us', active:true},
						{content: 'en_ca'},
						{content: 'en_ie'},
						{content: 'en_gb'},
						{content: 'en_mx'},
						{content: 'de_de'},
						{content: 'fr_fr'},
						{content: 'fr_ca'},
						{content: 'it_it'},
						{content: 'es_es'},
						{content: 'es_mx'},
						{content: 'es_us'}
					]}
				]}
			]}
		]},

		{kind:"onyx.Button",content:"Get Times", style:"margin:10px;", ontap:"getTimes"},
		{kind:"onyx.Button",content:"Reset Times", ontap:"resetTimes"},

		{style:"width:100%;height:5px;background-color:black;margin-bottom:5px;"},
		{caption: "Dates", style: "padding: 10px", components: [
				{content:"TIME",classes:"onyx-sample-divider"},
			{classes: "onyx-toolbar-inline", components: [
				{name:"timePicker1", kind:"onyx.TimePicker"}
			]},
			{kind: "onyx.Groupbox", style:"padding:5px;", components: [
				{kind: "onyx.GroupboxHeader", content: "Value"},
				{name:"timePicker1Value", style:"padding:15px;"}
			]},
			{content:"TIME 24 HOUR MODE",classes:"onyx-sample-divider"},
			{classes: "onyx-toolbar-inline", components: [
				{name:"timePicker2", kind:"onyx.TimePicker", is24HrMode:true}
			]},
			{kind: "onyx.Groupbox", style:"padding:5px;", components: [
				{kind: "onyx.GroupboxHeader", content: "Localized Value"},
				{name:"timePicker2Value", style:"padding:15px;"}
			]},
			{content:"DISABLED",classes:"onyx-sample-divider"},
			{classes: "onyx-toolbar-inline", components: [
				{name:"timePicker3", kind:"onyx.TimePicker", disabled: true}
			]}
		]}
	],
	initComponents: function() {
		this.inherited(arguments);
		this.locale = enyo.g11n.currentLocale().getLocale();
	},
	pickerHandler: function(inSender, inEvent){
		this.locale = inEvent.selected.content;
		this.formatTime();
		return true;
	},
	formatTime: function(){
		this.$.timePicker1.setLocale(this.locale);
		this.$.timePicker2.setLocale(this.locale);
		this.$.timePicker2.setIs24HrMode(true);
		this.$.timePicker3.setLocale(this.locale);
	},
	resetTimes: function(date) {
		var d = new Date();
		this.$.timePicker1.setValue(d);
		this.$.timePicker2.setValue(d);
		this.$.timePicker3.setValue(d);

		this.getTimes();
	},
	getTimes: function(){
		var fmt = new enyo.g11n.DateFmt({
			time: "short",
			locale: new enyo.g11n.Locale(this.locale)
		});

		this.$.timePicker1Value.setContent(fmt.format(this.$.timePicker1.getValue()));
		this.$.timePicker2Value.setContent(fmt.format(this.$.timePicker2.getValue()));
	},
	updateTimeValues: function(inSender, inEvent){
		var fmt = new enyo.g11n.DateFmt({
			time: "short",
			locale: new enyo.g11n.Locale(this.locale)
		});

		this.$[inEvent.name + "Value"].setContent(fmt.format(inEvent.value));
	}
});
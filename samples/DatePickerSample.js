enyo.kind({
	name: "onyx.sample.DatePickerSample",
	kind: "FittableRows",
	classes: "onyx onyx-sample",	
	handlers: {
		onSelect: "updateDateValues"
	},
	components: [
		{kind: "onyx.Toolbar", content:$L("Dates")},
		{kind: "FittableColumns", components:[
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
			]},	
		]},
		{kind:"onyx.Button",content:"Get Dates", style:"margin:10px;", ontap:"getDates"},
		{kind:"onyx.Button",content:"Reset Dates", ontap:"resetDates"},
		{style:"width:100%;height:5px;background-color:black;margin-bottom:5px;"},
		{caption: "Dates", components: [
			{content:"DATE",classes:"onyx-sample-divider"},
			{classes: "onyx-toolbar-inline", components: [
				{name:"datePicker1", kind:"onyx.DatePicker"}
			]},
			{kind: "onyx.Groupbox", style:"padding:5px;", components: [
				{kind: "onyx.GroupboxHeader", content: "Value"},			
				{name:"datePicker1Value", style:"padding:15px;"}
			]},
			{content:"DATE W/MIN & MAX YEARS",classes:"onyx-sample-divider"},			
			{classes: "onyx-toolbar-inline", components: [
				{name:"datePicker2", kind:"onyx.DatePicker", minYear:2010, maxYear:2020},
			]},
			{kind: "onyx.Groupbox", style:"padding:5px;", components: [
				{kind: "onyx.GroupboxHeader", content: "Value"},			
				{name:"datePicker2Value", style:"padding:15px;"}
			]},			
			{content:"DATE W/DAYS HIDDEN",classes:"onyx-sample-divider"},			
			{classes: "onyx-toolbar-inline", components: [
				{name:"datePicker3", kind:"onyx.DatePicker", hideDay:true}
			]},
			{kind: "onyx.Groupbox", style:"padding:5px;", components: [
				{kind: "onyx.GroupboxHeader", content: "Value"},			
				{name:"datePicker3Value", style:"padding:15px;"}
			]}
		]}
	],
	initComponents: function() {
		this.inherited(arguments);
		this.locale = enyo.g11n.currentLocale().getLocale();
	},
	pickerHandler: function(inSender, inEvent){
		this.locale = inEvent.selected.content;
		this.formatDate();
		return true;
	},
	formatDate: function(){		
		this.$.datePicker1.setLocale(this.locale);
		this.$.datePicker2.setLocale(this.locale);
		this.$.datePicker3.setLocale(this.locale);				
	},
	resetDates: function(date) {
		var d = new Date();
		this.$.datePicker1.setValue(d)
		this.$.datePicker2.setValue(d)		
		this.$.datePicker3.setValue(d)	
		
		this.getDates();	
	},
	getDates: function(){		
		var fmt = new enyo.g11n.DateFmt({
		     date: "short",
		     locale: new enyo.g11n.Locale(this.locale)
		});
			
		this.$.datePicker1Value.setContent(fmt.format(this.$.datePicker1.getValue()));
		this.$.datePicker2Value.setContent(fmt.format(this.$.datePicker2.getValue()));
		this.$.datePicker3Value.setContent(fmt.format(this.$.datePicker3.getValue()));
	},
	updateDateValues: function(inSender, inEvent){
		var fmt = new enyo.g11n.DateFmt({
		     date: "short",
		     locale: new enyo.g11n.Locale(this.locale)
		});
		this.$[inEvent.name + "Value"].setContent(fmt.format(inEvent.value));
	}
});
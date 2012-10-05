/**
	_onyx.DatePicker_ is a group of <a href="#onyx.Picker">onyx.Picker</a>
	controls that displays the current date and allows a user to change
	the day, month and year values. By default the control attempts to
	get the current locale & formats the date accordingly, including month names.
	The g11n library must be loaded to retrieve and format by locale, however if it
	is not loaded the control will default to standard US date format. The control
	also populates the day field with the proper number of days for the corresponding
	month & year displayed.
 */
enyo.kind({
	name: "onyx.DatePicker",
	classes: "onyx-toolbar-inline",
	published: {
		//* Current locale used for formatting. Can be set after control creation and control will reformat accordingly. 
		locale: null,
		//* Option to hide day, month or year fields		
		hideDay: false,
		hideMonth: false,
		hideYear: false,
		//* Option to specify the minimum & maximum year values		
		minYear: 1900,
		maxYear: 2099,
		//* The current Date object. Passing a Date object to setValue will update the control accordingly & getValue returns a Date object		
		value: null
	},
	events: {
		//* When a DatePicker field is selected an onSelect event is generated. It includes a name field specifying the name of the DatePicker that generated the event & a value field with the current Date value of the control.
		onSelect: ""
	},
	create: function() {
		this.inherited(arguments);
		if (!this.locale){
			try {
				this.locale = enyo.g11n.currentLocale().getLocale();
			}
		    catch(err) {
				this.locale = "en_us";
		    }	
		}
		this.initDefaults();
	},
	initDefaults: function() {
        var months;
		//Attempt to use the g11n lib (ie assume it is loaded)
		try {
			this._tf = new enyo.g11n.Fmts({locale:this.locale});
		    months = this._tf.getMonthFields();
		}
	    catch(err) {
	        //Fall back to en_us as default
		    months = ["Jan", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
	    }	
	
		this.setupPickers(this._tf ? this._tf.getDateFieldOrder() : 'mdy');
		
		this.hideDayChanged();
		this.hideMonthChanged();
		this.hideYearChanged();
			
		//Fill month, year & day pickers with values					
		var d = this.value = this.value || new Date();
		for (var i=0,m; m=months[i]; i++) {
			this.$.monthPicker.createComponent({content: m, value:i, active: i==d.getMonth()});
		}

		var y = d.getFullYear();
		this.$.yearPicker.setSelected(y-this.minYear);
		this.$.year.setContent(y);
		
		for (var i=1; i<=this.monthLength(d.getYear(), d.getMonth()); i++) {
			this.$.dayPicker.createComponent({content:i, value:i, active: i==d.getDate()});			
		}	
	},
	monthLength: function(inYear, inMonth) {
		// determine number of days in a particular month/year
		return 32 - new Date(inYear, inMonth, 32).getDate();
	},
    setupYear: function(inSender, inEvent) {
		this.$.year.setContent(this.minYear+inEvent.index);
	},
	setupPickers: function(ordering) {
		var orderingArr = ordering.split("");
		var o,f,l;
		for(f = 0, l = orderingArr.length; f < l; f++) {
			o = orderingArr[f];
			switch (o){
				case 'd': this.createDay();
				break;
				case 'm': this.createMonth();
				break;
				case 'y': this.createYear();
				break;
				default: break;
			}
		}
	},
	createYear: function() {
		var yearCount = this.maxYear - this.minYear;
		this.createComponent(				
			{kind: "onyx.PickerDecorator",	onSelect: "updateYear", components: [
				{classes:"onyx-datetime-year"},
				{name: "yearPicker", kind: "onyx.FlyweightPicker", count: ++yearCount, onSetupItem: "setupYear", components: [
					{name: "year"}
				]}
			]}
		);		
	},
	createMonth: function() {
		this.createComponent(
			{kind: "onyx.PickerDecorator",	onSelect: "updateMonth", components: [
				{classes:"onyx-datetime-month"},
				{name: "monthPicker", kind: "onyx.Picker"}
			]}
		);		
	},
	createDay: function() {
		this.createComponent(		
			{kind: "onyx.PickerDecorator", onSelect: "updateDay", components: [
				{classes:"onyx-datetime-day"},
				{name: "dayPicker", kind: "onyx.Picker"}
			]}
		);		
	},	
	localeChanged: function() {
		this.refresh();
	},
	hideDayChanged: function() {
		this.$.dayPicker.getParent().setShowing(this.hideDay ? false : true);		
	},
	hideMonthChanged: function() {
		this.$.monthPicker.getParent().setShowing(this.hideMonth ? false : true);
	},
	hideYearChanged: function() {
		this.$.yearPicker.getParent().setShowing(this.hideYear ? false : true);
	},
	minYearChanged: function() {
		this.refresh();		
	},
	maxYearChanged: function() {
		this.refresh();		
	},
	valueChanged: function(){
		this.refresh();
	},
	updateDay: function(inSender, inEvent){
		var date = this.calcDate(this.value.getFullYear(),
								 this.value.getMonth(),
								 inEvent.selected.value);
		this.doSelect({name:this.name, value:date});
		this.setValue(date);
	},
	updateMonth: function(inSender, inEvent){
		var date = this.calcDate(this.value.getFullYear(), 
								 inEvent.selected.value, 
								 this.value.getDate());
		this.doSelect({name:this.name, value:date});
		this.setValue(date);
	},
	updateYear: function(inSender, inEvent){
		var date = this.calcDate(this.minYear + inEvent.originator.selected, 
								 this.value.getMonth(), 
								 this.value.getDate());
		this.doSelect({name:this.name, value:date});
		this.setValue(date);
	},
	calcDate: function(year, month, day){
		return new Date(year,month,day,
						this.value.getHours(),
						this.value.getMinutes(),
						this.value.getSeconds(),
						this.value.getMilliseconds());
	},
	refresh: function(){
		this.destroyClientControls();
		this.initDefaults();
        this.render();
	}
});
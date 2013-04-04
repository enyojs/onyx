/**
	_onyx.DatePicker_ is a group of <a href="#onyx.Picker">onyx.Picker</a>
	controls displaying the current date. The user may change the _day_,
	_month_, and _year_ values.

	By default, _DatePicker_ tries to determine the current locale and use its
	rules to format the date (including the month name). In order to do this
	successfully, the _g11n_ library must be loaded; if it is not loaded, the
	control defaults to using standard U.S. date format.

	The _day_ field is automatically populated with the proper number of days
	for the selected month and year.
 */
enyo.kind({
	name: "onyx.DatePicker",
	classes: "onyx-toolbar-inline",
	published: {
		//* If true, control is shown as disabled, and user can't select new values
		disabled: false,
		/**
			Current locale used for formatting. Can be set after control
			creation, in which case the control will be updated to reflect the
			new value.
		*/
		locale: "en_us",
		//* If true, the day field is hidden
		dayHidden: false,
		//* If true, the month field is hidden
		monthHidden: false,
		//* If true, the year field is hidden
		yearHidden: false,
		//* Optional minimum year value
		minYear: 1900,
		//* Optional maximum year value
		maxYear: 2099,
		/**
			The current Date object. When a Date object is passed to _setValue_,
			the control is updated to reflect the new value. _getValue_ returns
			a Date object.
		*/
		value: null
	},
	events: {
		/**
			Fires when one of the DatePicker's fields is selected.

			_inEvent.name_ contains the name of the DatePicker that generated
			the event.

			_inEvent.value_ contains the current Date value of the control.
		*/
		onSelect: ""
	},
	create: function() {
		this.inherited(arguments);
		if (enyo.g11n) {
			this.locale = enyo.g11n.currentLocale().getLocale();
		}
		this.initDefaults();
	},
	initDefaults: function() {
		// Fall back to en_us as default
		var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

		//Attempt to use the g11n lib (ie assume it is loaded)
		if (enyo.g11n) {
			this._tf = new enyo.g11n.Fmts({locale:this.locale});
			months = this._tf.getMonthFields();
		}

		this.setupPickers(this._tf ? this._tf.getDateFieldOrder() : 'mdy');

		this.dayHiddenChanged();
		this.monthHiddenChanged();
		this.yearHiddenChanged();

		//Fill month, year & day pickers with values
		var d = this.value = this.value || new Date();
		for (var i=0,m; (m=months[i]); i++) {
			this.$.monthPicker.createComponent({content: m, value:i, active: i==d.getMonth()});
		}

		var y = d.getFullYear();
		this.$.yearPicker.setSelected(y-this.minYear);

		for (i=1; i<=this.monthLength(d.getYear(), d.getMonth()); i++) {
			this.$.dayPicker.createComponent({content:i, value:i, active: i==d.getDate()});
		}
	},
	monthLength: function(inYear, inMonth) {
		// determine number of days in a particular month/year
		return 32 - new Date(inYear, inMonth, 32).getDate();
	},
	setupYear: function(inSender, inEvent) {
		this.$.year.setContent(this.minYear+inEvent.index);
		return true;
	},
	setupPickers: function(ordering) {
		var orderingArr = ordering.split("");
		var o,f,l;
		for(f = 0, l = orderingArr.length; f < l; f++) {
			o = orderingArr[f];
			switch (o){
			case 'd':
				this.createDay();
				break;
			case 'm':
				this.createMonth();
				break;
			case 'y':
				this.createYear();
				break;
			default:
				break;
			}
		}
	},
	createYear: function() {
		var yearCount = this.maxYear - this.minYear;
		this.createComponent(
			{kind: "onyx.PickerDecorator", onSelect: "updateYear", components: [
				{classes:"onyx-datepicker-year", name: "yearPickerButton",  disabled: this.disabled},
				{name: "yearPicker", kind: "onyx.FlyweightPicker", count: ++yearCount, onSetupItem: "setupYear", components: [
					{name: "year"}
				]}
			]}
		);
	},
	createMonth: function() {
		this.createComponent(
			{kind: "onyx.PickerDecorator", onSelect: "updateMonth", components: [
				{classes:"onyx-datepicker-month", name: "monthPickerButton",  disabled: this.disabled},
				{name: "monthPicker", kind: "onyx.Picker"}
			]}
		);
	},
	createDay: function() {
		this.createComponent(
			{kind: "onyx.PickerDecorator", onSelect: "updateDay", components: [
				{classes:"onyx-datepicker-day", name: "dayPickerButton",  disabled: this.disabled},
				{name: "dayPicker", kind: "onyx.Picker"}
			]}
		);
	},
	localeChanged: function() {
		this.refresh();
	},
	dayHiddenChanged: function() {
		this.$.dayPicker.getParent().setShowing(this.dayHidden ? false : true);
	},
	monthHiddenChanged: function() {
		this.$.monthPicker.getParent().setShowing(this.monthHidden ? false : true);
	},
	yearHiddenChanged: function() {
		this.$.yearPicker.getParent().setShowing(this.yearHidden ? false : true);
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
	disabledChanged: function() {
		this.$.yearPickerButton.setDisabled(this.disabled);
		this.$.monthPickerButton.setDisabled(this.disabled);
		this.$.dayPickerButton.setDisabled(this.disabled);
	},
	updateDay: function(inSender, inEvent){
		var date = this.calcDate(this.value.getFullYear(),
								this.value.getMonth(),
								inEvent.selected.value);
		this.doSelect({name:this.name, value:date});
		this.setValue(date);
		return true;
	},
	updateMonth: function(inSender, inEvent){
		var date = this.calcDate(this.value.getFullYear(),
								inEvent.selected.value,
								this.value.getDate());
		this.doSelect({name:this.name, value:date});
		this.setValue(date);
		return true;
	},
	updateYear: function(inSender, inEvent){
		//if the node wasn't found (issue around FlyWeightRepeater/Picker) don't update the picker
		if (inEvent.originator.selected != -1) {
			var date = this.calcDate(this.minYear + inEvent.originator.selected,
									this.value.getMonth(),
									this.value.getDate());
			this.doSelect({name:this.name, value:date});
			this.setValue(date);
		}
		return true;
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

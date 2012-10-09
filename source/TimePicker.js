/**
	_onyx.TimePicker_ is a group of <a href="#onyx.Picker">onyx.Picker</a>
	controls that displays the current time and allows a user to change
	the hour, minute and AM/PM values. By default the control attempts to
	get the current locale & formats the time accordingly, including AM/PM formatting.
	The g11n library must be loaded to retrieve and format by locale, however if it
	is not loaded the control will default to standard US time format.
 */
enyo.kind({
	name: "onyx.TimePicker",
	classes: "onyx-toolbar-inline",
	published: {
		//* Current locale used for formatting. Can be set after control creation and control will reformat accordingly. 		
		locale: null,
		//* Option to use 24 hour time		
		is24HrMode: null,
		//* The current Date object. Passing a Date object to setValue will update the control accordingly & getValue returns a Date object				
		value: null,		
	},
	events: {
		//* When a TimePicker field is selected an onSelect event is generated. It includes a name field specifying the name of the TimePicker that generated the event & a value field with the current Date value of the control.		
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
        var am, pm;
		//Attempt to use the g11n lib (ie assume it is loaded)
		try {
			this._tf = new enyo.g11n.Fmts({locale:this.locale});
		    am = this._tf.getAmCaption();
		    pm = this._tf.getPmCaption();
		
			if (this.is24HrMode == null) {
				this.is24HrMode = !this._tf.isAmPm();				
			}
		}
	    catch(err) {
	        //fall back to en_us as default
	        am = "AM";
	        pm = "PM";
			this.is24HrMode = false;
	    }	
	
		this.setupPickers(this._tf ? this._tf.getTimeFieldOrder() : 'hma');
							
		var d = this.value = this.value || new Date();

		// create hours
		if (!this.is24HrMode){
			var h = d.getHours();
			h = (h == 0) ? 12 : h;
	        for (var i=1; i<=12; i++) {
	            this.$.hourPicker.createComponent({content: i, value:i, active: (i == (h>12 ? h%12 : h))});
	        }			
		} else {
		    for (var i=0; i<24; i++) {
                this.$.hourPicker.createComponent({content: i, value:i, active: (i == d.getHours())});
            }
		}
		
		// create minutes
        for (var i=0; i<=59; i++) {
            this.$.minutePicker.createComponent({content: (i < 10) ? ("0"+i):i, value:i, active: i == d.getMinutes()});
        }

        // create am pm
        if (d.getHours() >= 12) {
            this.$.ampmPicker.createComponents([{content: am},{content:pm, active: true}]);
        }
        else {
            this.$.ampmPicker.createComponents([{content: am, active: true},{content:pm}]);
        }
        this.$.ampmPicker.getParent().setShowing(!this.is24HrMode);
	},
	setupPickers: function(ordering) {
		var orderingArr = ordering.split("");
		var o,f,l;
		for(f = 0, l = orderingArr.length; f < l; f++) {
			o = orderingArr[f];
			switch (o){
				case 'h': this.createHour();
				break;
				case 'm': this.createMinute();
				break;
				case 'a': this.createAmPm();
				break;
				default: break;
			}
		}
	},
	createHour: function() {
		this.createComponent(
			{kind: "onyx.PickerDecorator", onSelect: "updateHour", components: [
				{classes:"onyx-timepicker-hour"},
				{name: "hourPicker", kind: "onyx.Picker"}
			]}
		);		
	},
	createMinute: function() {
		this.createComponent(
			{kind: "onyx.PickerDecorator", onSelect: "updateMinute", components: [
				{classes:"onyx-timepicker-minute"},
				{name: "minutePicker", kind: "onyx.Picker"}
			]}
		);		
	},
	createAmPm: function() {
		this.createComponent(
			{kind: "onyx.PickerDecorator", onSelect: "updateAmPm", components: [
				{classes:"onyx-timepicker-ampm"},
				{name: "ampmPicker", kind: "onyx.Picker"}
			]}
		);		
	},	
	localeChanged: function() {
		//reset 24 hour mode when changing locales
		this.is24HrMode = null;
		this.refresh();
	},
	is24HrModeChanged: function() {
		this.refresh();
	},
	valueChanged: function(){
		this.refresh();
	},
	updateHour: function(inSender, inEvent){		
		var h = inEvent.selected.value;
		if (!this.is24HrMode){
			var ampm = this.$.ampmPicker.getParent().controlAtIndex(0).content;
			h = h + (h == 12 ? -12 : 0) + (this.isAm(ampm) ? 0 : 12);
		}
		this.value = this.calcTime(h, this.value.getMinutes());				
		this.doSelect({name:this.name, value:this.value});		
		return true;		
	},
	updateMinute: function(inSender, inEvent){
		this.value = this.calcTime(this.value.getHours(), inEvent.selected.value);		
		this.doSelect({name:this.name, value:this.value});		
		return true;		
	},
	updateAmPm: function(inSender, inEvent){
		var h = this.value.getHours();
		if (!this.is24HrMode){
			h = h + (h > 11 ? (this.isAm(inEvent.content) ? -12 : 0) : (this.isAm(inEvent.content) ? 0 : 12));
		}		
		this.value = this.calcTime(h, this.value.getMinutes());
		this.doSelect({name:this.name, value:this.value});
		return true;		
	},
	calcTime: function(hour, minute){
		return new Date(this.value.getFullYear(), 
						this.value.getMonth(), 
						this.value.getDate(),
						hour, minute,
						this.value.getSeconds(),
						this.value.getMilliseconds());
	},
	isAm: function(value){
		var am, pm, isAm;
		//Workaround for pickers not having directly retrievable active item. Using it to find whether
		//picker is on AM or PM (& have to check localized spelling as well)
		try {
		    am = this._tf.getAmCaption();
		    pm = this._tf.getPmCaption();
		} catch (err) {
			am = "AM";
			pm = "PM";
		}
		
		if (value == am){
			return true;
		} else {
			return false;
		}		
	},
	refresh: function(){
		this.destroyClientControls();
		this.initDefaults();
        this.render();
	}
});
require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TimePicker~TimePicker} kind.
* @module onyx/TimePicker
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Picker = require('onyx/Picker'),
	PickerDecorator = require('onyx/PickerDecorator');

/**
* Fires when one of the [TimePicker]{@link module:onyx/TimePicker~TimePicker}'s fields is selected.
*
* @event module:onyx/TimePicker~TimePicker#onSelect
* @type {Object}
* @property {String} name - Name of the [TimePicker]{@link module:onyx/TimePicker~TimePicker} that
* generated the event.
* @property {Date} value  - Current {@glossary Date} value of the control.
* @public
*/

/**
* {@link module:onyx/TimePicker~TimePicker} is a group of {@link module:onyx/Picker~Picker} controls that,
* collectively, display the current time. The user may change the hour, minute,
* and meridiem (AM/PM) values.
*
* TimePicker uses U.S. time formatting. For a locale-aware version, see
* {@link module:onyx/i18n/TimePicker~TimePicker}.
*
* @ui
* @class TimePicker
* @extends module:enyo/Control~Control
* @public
*/
module.exports = kind(
	/** @lends module:onyx/TimePicker~TimePicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TimePicker',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-toolbar-inline',

	/**
	* @lends module:onyx/TimePicker~TimePicker.prototype
	* @private
	*/
	published: {
		/**
		* If `true`, the control is shown as disabled and users cannot select new values.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		disabled: false,

		/**
		* If `true`, 24-hour time is used.
		*
		* @type {Boolean}
		* @default false
		* @public
		*/
		is24HrMode: false,

		/**
		* {@glossary Date} object representing the currently-selected date/time.
		* When a Date object is passed to `setValue()`, the object is stored here
		* and the control is updated to reflect the new date/time.
		*
		* @type {Object|null}
		* @default null
		* @public
		*/
		value: null
	},

	/**
	* @private
	*/
	events: {
		onSelect: ''
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		this.initDefaults();
	},

	/**
	* @private
	*/
	initDefaults: function () {
		this.setupMeridiems();

		this.setupPickers(this.getTimeFormat());

		var d = this.value = this.value || new Date();

		// create hours
		var i;
		if (!this.is24HrMode) {
			var h = d.getHours();
			h = (h === 0) ? 12 : h;
			for (i=1; i<=12; i++) {
				this.$.hourPicker.createComponent({content: i, value:i, active: (i == (h>12 ? h%12 : h))});
			}
		} else {
			for (i=0; i<24; i++) {
				this.$.hourPicker.createComponent({content: i, value:i, active: (i == d.getHours())});
			}
		}

		// create minutes
		for (i=0; i<=59; i++) {
			this.$.minutePicker.createComponent({content: (i < 10) ? ('0'+i):i, value:i, active: i == d.getMinutes()});
		}

		// create am/pm
		if (d.getHours() >= 12) {
			this.$.ampmPicker.createComponents([{content: this._strAm},{content:this._strPm, active: true}]);
		} else {
			this.$.ampmPicker.createComponents([{content: this._strAm, active: true},{content:this._strPm}]);
		}
		this.$.ampmPicker.getParent().setShowing(!this.is24HrMode);
	},

	/**
	* Sets up meridiems for en-US.
	* @private
	*/
	setupMeridiems: function () {
		this._strAm = 'AM';
		this._strPm = 'PM';
	},

	/**
	* Returns the ordering of time components
	* @private
	*/
	getTimeFormat: function () {
		return 'hma';
	},

	/**
	* @private
	*/
	setupPickers: function (timeComponents) {
		// order is always fixed hours, minutes, am/pm
		if (timeComponents.indexOf('h') !== -1) {
			this.createHour();
		}
		if (timeComponents.indexOf('m') !== -1) {
			this.createMinute();
		}
		if (timeComponents.indexOf('a') !== -1) {
			this.createAmPm();
		}
	},

	/**
	* @private
	*/
	createHour: function () {
		this.createComponent(
			{kind: PickerDecorator, onSelect: 'updateHour', components: [
				{name: 'hourPickerButton', classes: 'onyx-timepicker-hour', disabled: this.disabled},
				{name: 'hourPicker', kind: Picker}
			]}
		);
	},

	/**
	* @private
	*/
	createMinute: function () {
		this.createComponent(
			{kind: PickerDecorator, onSelect: 'updateMinute', components: [
				{name: 'minutePickerButton', classes: 'onyx-timepicker-minute', disabled: this.disabled},
				{name: 'minutePicker', kind: Picker}
			]}
		);
	},

	/**
	* @private
	*/
	createAmPm: function () {
		this.createComponent(
			{kind: PickerDecorator, onSelect: 'updateAmPm', components: [
				{name: 'ampmPickerButton', classes: 'onyx-timepicker-ampm', disabled: this.disabled},
				{name: 'ampmPicker', kind: Picker}
			]}
		);
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.$.hourPickerButton.setDisabled(this.disabled);
		this.$.minutePickerButton.setDisabled(this.disabled);
		this.$.ampmPickerButton.setDisabled(this.disabled);
	},

	/**
	* @private
	*/
	is24HrModeChanged: function () {
		this.refresh();
	},

	/**
	* @private
	*/
	valueChanged: function (){
		this.refresh();
	},

	/**
	* @fires module:onyx/TimePicker~TimePicker#onSelect
	* @private
	*/
	updateHour: function (inSender, inEvent){
		var h = inEvent.selected.value;
		if (!this.is24HrMode){
			var ampm = this.$.ampmPicker.getParent().controlAtIndex(0).content;
			h = h + (h == 12 ? -12 : 0) + (this.isAm(ampm) ? 0 : 12);
		}
		this.setValue(this.calcTime(h, this.value.getMinutes()));
		this.doSelect({name:this.name, value:this.value});
		return true;
	},

	/**
	* @fires module:onyx/TimePicker~TimePicker#onSelect
	* @private
	*/
	updateMinute: function (inSender, inEvent){
		this.setValue(this.calcTime(this.value.getHours(), inEvent.selected.value));
		this.doSelect({name:this.name, value:this.value});
		return true;
	},

	/**
	* @fires module:onyx/TimePicker~TimePicker#onSelect
	* @private
	*/
	updateAmPm: function (inSender, inEvent){
		var h = this.value.getHours();
		if (!this.is24HrMode){
			h = h + (h > 11 ? (this.isAm(inEvent.content) ? -12 : 0) : (this.isAm(inEvent.content) ? 0 : 12));
		}
		this.setValue(this.calcTime(h, this.value.getMinutes()));
		this.doSelect({name:this.name, value:this.value});
		return true;
	},

	/**
	* @private
	*/
	calcTime: function (hour, minute){
		return new Date(this.value.getFullYear(),
						this.value.getMonth(),
						this.value.getDate(),
						hour, minute,
						this.value.getSeconds(),
						this.value.getMilliseconds());
	},

	/**
	* @private
	*/
	isAm: function (value){
		return value == this._strAm;
	},

	/**
	* @private
	*/
	refresh: function (){
		this.destroyClientControls();
		this.initDefaults();
		this.render();
	}
});

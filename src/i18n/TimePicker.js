require('onyx');
require('enyo-ilib');

/**
* Contains the declaration for the {@link module:onyx/i18n/TimePicker~TimePicker} kind.
* @module onyx/i18n/TimePicker
*/

var
	kind = require('enyo/kind'),
	Signals = require('enyo/Signals');

var
	dateFactory = require('enyo-ilib/DateFactory'),
	DateFmt = require('enyo-ilib/DateFmt');

var
	TimePicker = require('onyx/TimePicker');

/**
* {@link module:onyx/i18n/TimePicker~TimePicker} is a locale-aware version of
* group of {@link module:onyx/TimePicker~TimePicker}. It uses the [iLib]{@glossary ilib} library
* to localize time display.
*
* @ui
* @class TimePicker
* @extends module:enyo/TimePicker~TimePicker
* @public
*/
module.exports = kind(
	/** @lends module:onyx/i18n/TimePicker~TimePicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TimePicker',

	/**
	* @private
	*/
	kind: TimePicker,

	/**
	* @lends module:onyx/i18n/TimePicker~TimePicker.prototype
	* @private
	*/
	published: {
		/**
		* If `true`, 24-hour time is used. If `null` or when the locale is changed, this value is
		* updated to reflect the locale's rules.
		*
		* @type {Boolean|null}
		* @default null
		* @public
		*/
		is24HrMode: null
	},

	/**
	* @private
	*/
	create: function () {
		TimePicker.prototype.create.apply(this, arguments);
		this.createComponent({kind: Signals, onlocalechange: 'localeChanged'});
	},

	/**
	* @private
	*/
	initDefaults: function () {
		this._tf = new DateFmt({timezone: 'local'});
		TimePicker.prototype.initDefaults.apply(this, arguments);
	},

	/**
	* Sets meridiems and will set 24Hr mode based on locale if it was not specified
	* @private
	*/
	setupMeridiems: function () {
		var objAmPm = new DateFmt({type: 'time', template: 'a'}),
			timeobj = dateFactory({hour: 1});

		this._strAm = objAmPm.format(timeobj);
		// TODO: Does not support locales with more than two meridiems.  See moonstone/TimePicker
		timeobj.setHours(13);
		this._strPm = objAmPm.format(timeobj);

		if (this.is24HrMode == null) {
			this.is24HrMode = (this._tf.getClock() == '24');
		}
	},

	/**
	* Returns the locale-aware ordering of time components
	* @private
	*/
	getTimeFormat: function () {
		return this._tf.getTimeComponents();
	},

	/**
	* @private
	*/
	localeChanged: function () {
		//reset 24 hour mode when changing locales
		this.is24HrMode = null;
		this.refresh();
	}

});

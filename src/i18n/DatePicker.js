require('onyx');

/**
* Contains the declaration for the {@link module:onyx/i18n/DatePicker~DatePicker} kind.
* @module onyx/i18n/DatePicker
*/

var
	kind = require('enyo/kind');

var
	ilib = require('enyo-ilib'),
	DateFmt = require('enyo-ilib/DateFmt');

var
	DatePicker = require('onyx/DatePicker');

/**
* {@link module:onyx/i18n/DatePicker~DatePicker} is a {@link module:onyx/DatePicker~DatePicker}
* that uses the [iLib]{@glossary ilib} library to tryi to determine the current locale and use that
* locale's rules to format the date (including the month name).
*
* The `day` field is automatically populated with the proper number of days for
* the selected month and year.
*
* @class DatePicker
* @extends module:enyo/DatePicker~DatePicker
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/i18n/DatePicker~DatePicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.DatePicker',

	/**
	* @private
	*/
	kind: DatePicker,

	/**
	* @lends module:onyx/i18n/DatePicker~DatePicker.prototype
	* @private
	*/
	published: {
		/**
		* Current locale used for formatting. If `null`, the value will be determined by
		* iLib.
		*
		* @type {String|null}
		* @default null
		* @public
		*/
		locale: null
	},

	/**
	* @private
	*/
	create: function () {
		this.locale = this.locale || ilib.getLocale();
		this._tf = new DateFmt({locale: this.locale, timezone: 'local'});
		DatePicker.prototype.create.apply(this, arguments);
	},

	/**
	* Returns the iLib list of locale-appropriate month names
	* @protected
	*/
	getMonthList: function () {
		return this._tf.getMonthsOfYear({length: 'long'});
	},

	/**
	* Returns the iLib locale-appropriate date order format
	* @protected
	*/
	getDateFormat: function () {
		return this._tf.getTemplate();
	},

	/**
	* @private
	*/
	localeChanged: function () {
		this._tf = new DateFmt({locale: this.locale, timezone: 'local'});
		this.refresh();
	}

});

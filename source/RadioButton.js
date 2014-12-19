(function (enyo, scope) {

	/**
	* {@link onyx.RadioButton} is a radio button designed for use within an
	* {@link onyx.RadioGroup}.
	*
	* For more information, see the documentation on
	* [Buttons]{@linkplain $dev-guide/building-apps/controls/buttons.html} in the
	* Enyo Developer Guide.
	*
	* @class  onyx.RadioButton
	* @extends enyo.Button
	* @ui
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.RadioButton.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.RadioButton',

		/**
		* @private
		*/
		kind: 'enyo.Button',

		/**
		* @private
		*/
		classes: 'onyx-radiobutton'
	});

})(enyo, this);

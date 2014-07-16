(function (enyo, scope) {

	/**
	* _onyx.Input_ is an Onyx-styled input control, derived from
	* {@link enyo.Input}. Typically, an _onyx.Input_ is placed inside an
	* {@link onyx.InputDecorator}, which provides styling, e.g.:
	*
	* ```
	* {kind: 'onyx.InputDecorator', components: [
	* 	{kind: 'onyx.Input', placeholder: 'Enter some text...', onchange: 'inputChange'}
	* ]}
	* ```
	*
	* For more information, see the documentation on [Text
	* Fields](building-apps/controls/text-fields.html) in the Enyo Developer Guide.
	*
	* @class  onyx.Input
	* @extends enyo.Input
	* @ui
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.Input.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.Input',

		/**
		* @private
		*/
		kind: 'enyo.Input',

		/**
		* @private
		*/
		classes: 'onyx-input'
	});

})(enyo, this);
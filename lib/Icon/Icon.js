require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Icon~Icon} kind.
* @module onyx/Icon
*/

var
	kind = require('enyo/kind'),
	path = require('enyo/path'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Icon~Icon} is a control that displays an icon. To set the icon image,
* specify a URL for the image's location in the Icon's [src]{@link module:onyx/Icon~Icon#src}
* property.
*
* In Onyx, icons have a size of 32x32 pixels. Since the icon image is applied
* as a CSS background, the height and width of the icon must be set if an image
* of a different size is used.
*
* ```
* var Icon = require('onyx/Icon');
*
* {kind: Icon, src: 'images/search.png'}
* ```
*
* When an icon should act like a button, use an {@link module:onyx/IconButton~IconButton}.
*
* @class Icon
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Icon~Icon.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Icon',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx-icon',

	/**
	* @lends module:onyx/Icon~Icon.prototype
	* @private
	*/
	published: {
		/**
		* URL specifying path to icon image.
		* @type {String}
		* @default  ''
		* @public
		*/
		src: '',

		/**
		* If `true`, icon is shown as disabled.
		* @type {Boolean}
		* @default  false
		* @public
		*/
		disabled: false
	},

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);
		if (this.src) {
			this.srcChanged();
		}
		this.disabledChanged();
	},

	/**
	* @private
	*/
	disabledChanged: function () {
		this.addRemoveClass('disabled', this.disabled);
	},

	/**
	* @private
	*/
	srcChanged: function () {
		this.applyStyle('background-image', 'url(' + path.rewrite(this.src) + ')');
	}
});

require('onyx');

var
	kind = require('enyo/kind'),
	platform = require('enyo/platform'),
	Control = require('enyo/Control');

/**
* {@link onyx.Toolbar} is a horizontal bar containing controls used to perform
* common UI actions.
*
* A toolbar customizes the styling of the controls it hosts, including buttons,
* icons, and inputs.
*
*  ```
*	{kind: 'onyx.Toolbar', components: [
*		{kind: 'onyx.Button', content: 'Favorites'},
*		{kind: 'onyx.InputDecorator', components: [
*			{kind: 'onyx.Input', placeholder: 'Enter a search term...'}
*		]},
*		{kind: 'onyx.IconButton', src: 'go.png'}
*	]}
*  ```
*
* @ui
* @class onyx.Toolbar
* @extends enyo.Control
* @public
*/
module.exports = kind(
	/** @lends  onyx.Toolbar.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Toolbar',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	classes: 'onyx onyx-toolbar onyx-toolbar-inline',

	/**
	* @private
	*/
	create: function () {
		Control.prototype.create.apply(this, arguments);

		//workaround for android 4.0.3 rendering glitch (ENYO-674)
		if (this.hasClass('onyx-menu-toolbar') && (platform.android >= 4)) {
			this.applyStyle('position', 'static');
		}
	}
});
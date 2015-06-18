require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Toolbar~Toolbar} kind.
* @module onyx/Toolbar
*/

var
	kind = require('enyo/kind'),
	platform = require('enyo/platform'),
	Control = require('enyo/Control');

/**
* {@link module:onyx/Toolbar~Toolbar} is a horizontal bar containing controls used to perform
* common UI actions.
*
* A toolbar customizes the styling of the controls it hosts, including buttons,
* icons, and inputs.
*
* ```
* var
* 	Button = require('onyx/Button'),
* 	IconButton = require('onyx/IconButton'),
* 	Input = require('onyx/Input'),
* 	InputDecorator = require('onyx/InputDecorator'),
* 	Toolbar = require('onyx/Toolbar');
*
*	{kind: Toolbar, components: [
*		{kind: Button, content: 'Favorites'},
*		{kind: InputDecorator, components: [
*			{kind: Input, placeholder: 'Enter a search term...'}
*		]},
*		{kind: IconButton, src: 'go.png'}
*	]}
* ```
*
* @class Toolbar
* @extends module:enyo/Control~Control
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Toolbar~Toolbar.prototype */ {

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

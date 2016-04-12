require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Submenu~Submenu} kind.
* @module onyx/Submenu
*/

var
	kind = require('enyo/kind'),
	Control = require('enyo/Control');

var
	Drawer = require('onyx/Drawer'),
	MenuItem = require('onyx/MenuItem');

/**
* {@link module:onyx/Submenu~Submenu} is a control that collapses several menu items into a drawer,
* which may be opened and closed by tapping on its label. It is meant to be placed
* inside an {@link module:onyx/Menu~Menu}.
*
* ```
* var
* 	Menu = require('onyx/Menu'),
* 	MenuDecorator = require('onyx/MenuDecorator'),
* 	Submenu = require('onyx/Submenu');
*
* {kind: MenuDecorator, components:[
* 	{content: 'Open menu'},
* 	{kind: Menu, components:[
* 		{content: 'One'},
* 		{content: 'Two'},
* 		{kind: Submenu, content: 'Sort by...', components: [
* 			{content: 'A'},
* 			{content: 'B'},
* 			{content: 'C'}
* 		]},
* 		{content: 'Three'}
* 	]}
* ]}
* ```
*
* @class Submenu
* @extends module:enyo/Control~Control
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Submenu~Submenu.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Submenu',

	/**
	* @private
	*/
	kind: Control,

	/**
	* @private
	*/
	defaultKind: MenuItem,

	/**
	* @private
	*/
	initComponents: function () {
		this.createChrome([
			{name: 'label', kind: Control, classes: 'onyx-menu-item', content: this.content || this.name, isChrome: true, ontap: 'toggleOpen'},
			{name: 'client', kind: Drawer, classes: 'client onyx-submenu', isChrome: true, open: false}
		]);

		Control.prototype.initComponents.apply(this, arguments);
	},

	/**
	* Toggles the submenu's open/closed state.
	*
	* @public
	*/
	toggleOpen: function () {
		this.setOpen(!this.getOpen());
	},

	/**
	* Opens or closes the submenu.
	*
	* @param {Boolean} open - `true` to open the submenu; `false` to close it.
	* @public
	*/
	setOpen: function (open) {
		this.$.client.setOpen(open);
	},

	/**
	* Determines whether the submenu is currently open.
	*
	* @return {Boolean} - `true` if submenu is currently open; otherwise, `false`.
	* @public
	*/
	getOpen: function () {
		return this.$.client.getOpen();
	}
});

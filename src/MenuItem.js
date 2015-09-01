require('onyx');

/**
* Contains the declaration for the {@link module:onyx/MenuItem~MenuItem} kind.
* @module onyx/MenuItem
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button');

/**
* Fires when the menu item is selected.
*
* @event module:onyx/MenuItem~MenuItem#onSelect
* @type {Object}
* @property {module:enyo/Control~Control} selected - The selected menu item.
* @property {String} content - The selected menu item's content.
* @public
*/

/**
* Fires when the menu item's content changes.
*
* @event module:onyx/MenuItem~MenuItem#onItemContentChange
* @type {Object}
* @property {module:enyo/Control~Control} content - The menu item's content.
* @public
*/

/**
* {@link module:onyx/MenuItem~MenuItem} is a button styled to look like a menu
* item, designed for use in an {@link module:onyx/Menu~Menu}. When a component
* is created inside of a Menu, it will be a MenuItem by default.
*
* When a MenuItem is tapped, it tells the menu to hide itself and emits an
* [onSelect]{@link module:onyx/MenuItem~MenuItem#onSelect} event with its
* content and a reference to itself. This event and its properties may be
* handled by a client application to determine which MenuItem was selected.
*
* ```
* var
* 	kind = require('enyo/kind');
*
* var
* 	Menu = require('onyx/Menu'),
* 	MenuDecorator = require('onyx/MenuDecorator');
*
* module.exports = kind(
* 	name: 'onyx.MenuItemExample',
* 	handlers: {
* 		onSelect: 'itemSelected'
* 	},
* 	components: [
* 		{kind: MenuDecorator, components: [
* 			{content: 'Open Menu (floating)'},
* 			{kind: Menu, floating: true, components: [
* 				{content: '1'},
* 				{content: '2'},
* 				{classes: 'onyx-menu-divider'},
* 				{content: 'Label', classes: 'onyx-menu-label'},
* 				{content: '3'},
* 			]}
* 		]}
* 	],
* 	itemSelected: function (sender, event) {
* 		enyo.log('Menu Item Selected: ' + event.originator.content);
* 	}
* )
* ```
*
* @class MenuItem
* @extends module:enyo/Button~Button
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/MenuItem~MenuItem.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.MenuItem',

	/**
	* @private
	*/
	kind: Button,

	/**
	* @private
	*/
	events: {
		onSelect: '',
		onItemContentChange: ''
	},

	/**
	* @private
	*/
	classes: 'onyx-menu-item',

	/**
	* @private
	*/
	tag: 'div',

	/**
	* @private
	*/
	create: function () {
		this.silence();
		Button.prototype.create.apply(this, arguments);
		this.unsilence();
		if (this.active){
			this.bubble('onActivate');
		}
	},

	/**
	* Handles `ontap` events.
	*
	* @fires module:onyx/Menu~Menu#onRequestHideMenu
	* @fires module:onyx/MenuItem~MenuItem#onSelect
	* @private
	*/
	tap: function (sender) {
		Button.prototype.tap.apply(this, arguments);
		this.bubble('onRequestHideMenu');
		this.doSelect({selected:this, content:this.content});
	},

	/**
	* Sends notification that the item's content has changed.
	*
	* @fires module:onyx/MenuItem~MenuItem#onItemContentChange
	* @private
	*/
	contentChanged: function (old) {
		Button.prototype.contentChanged.apply(this, arguments);
		this.doItemContentChange({content: this.content});
	}
});

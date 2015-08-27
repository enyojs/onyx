require('onyx');

/**
* Contains the declaration for the {@link module:onyx/MenuDecorator~MenuDecorator} kind.
* @module onyx/MenuDecorator
*/

var
	kind = require('enyo/kind');

var
	Button = require('onyx/Button'),
	TooltipDecorator = require('onyx/TooltipDecorator');

/**
* {@link module:onyx/MenuDecorator~MenuDecorator} is a control that loosely couples an {@link module:onyx/Menu~Menu}
* with an activating control, which may be a button or any other control with an
* [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} event. The decorator must
* surround both the activating control and the menu itself. When the menu is
* activated, it shows itself in the correct position relative to the activator.
*
* ```
* var
* 	Menu = require('onyx/Menu'),
* 	MenuDecorator = require('onyx/MenuDecorator');
*
* {kind: MenuDecorator, components: [
* 	{content: 'Show menu'},
* 	{kind: Menu, components: [
* 		{content: '1'},
* 		{content: '2'},
* 		{classes: 'onyx-menu-divider'},
* 		{content: 'Label', classes: 'onyx-menu-label'},
* 		{content: '3'},
* 	]}
* ]}
* ```
*
* @class MenuDecorator
* @extends module:onyx/TooltipDecorator~TooltipDecorator
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/MenuDecorator~MenuDecorator.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.MenuDecorator',

	/**
	* @private
	*/
	kind: TooltipDecorator,

	/**
	* @private
	*/
	defaultKind: Button,

	/**
	* Selection on iOS prevents tap events, so avoid.
	*
	* @private
	*/
	classes: 'onyx-popup-decorator enyo-unselectable',

	/**
	* @private
	*/
	handlers: {
		onActivate: 'activated',
		onHide: 'menuHidden'
	},

	/**
	* Handles [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} events.
	*
	* @private
	*/
	activated: function (sender, event) {
		this.requestHideTooltip();
		if (event.originator.active) {
			this.menuActive = true;
			this.activator = event.originator;
			this.activator.addClass('active');
			this.requestShowMenu();
		}
	},

	/**
	* Requests that the child menu be shown.
	*
	* @fires module:onyx/Menu~Menu#onRequestShowMenu
	* @private
	*/
	requestShowMenu: function () {
		this.waterfallDown('onRequestShowMenu', {activator: this.activator});
	},

	/**
	* Requests that the child menu be hidden.
	*
	* @fires module:onyx/Menu~Menu#onRequestHideMenu
	* @private
	*/
	requestHideMenu: function () {
		this.waterfallDown('onRequestHideMenu');
	},

	/**
	* Handles [onHide]{@link module:enyo/Popup~Popup#onHide} events.
	*
	* @private
	*/
	menuHidden: function () {
		this.menuActive = false;
		if (this.activator) {
			this.activator.setActive(false);
			this.activator.removeClass('active');
		}
	},

	/**
	* Handles `onenter` events. Suppresses default behavior if menu is not active.
	*
	* @private
	*/
	enter: function (sender) {
		if (!this.menuActive) {
			TooltipDecorator.prototype.enter.apply(this, arguments);
		}
	},

	/**
	* Handles `onleave` events. Suppresses default behavior if menu is not active.
	*
	* @private
	*/
	leave: function (sender, event) {
		if (!this.menuActive) {
			TooltipDecorator.prototype.leave.apply(this, arguments);
		}
	}
});

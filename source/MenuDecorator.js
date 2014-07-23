(function (enyo, scope) {

	/**
	* _onyx.MenuDecorator_ is a control that loosely couples an
	* {@link onyx.Menu} with an activating control, which may be a button or
	* any other control with an {@link enyo.GroupItem#event:onActivate} event. The decorator
	* must surround both the activating control and the menu itself. When the menu is
	* activated, it shows itself in the correct position relative to the activator.
	*
	* ```
	* {kind: 'onyx.MenuDecorator', components: [
	* 	{content: 'Show menu'},
	* 	{kind: 'onyx.Menu', components: [
	* 		{content: '1'},
	* 		{content: '2'},
	* 		{classes: 'onyx-menu-divider'},
	* 		{content: 'Label', classes: 'onyx-menu-label'},
	* 		{content: '3'},
	* 	]}
	* ]}
	* ```
	*
	* @class  onyx.MenuDecorator
	* @extends onyx.TooltipDecorator
	* @ui
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.MenuDecorator.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.MenuDecorator',

		/**
		* @private
		*/
		kind: 'onyx.TooltipDecorator',

		/**
		* @private
		*/
		defaultKind: 'onyx.Button',

		/**
		* selection on ios prevents tap events, so avoid.
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
		* Handler for {@link enyo.GroupItem#event:onActivate}
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
		* Requests that its child menu be shown
		*
		* @fires onyx.Menu#event:onRequestShowMenu
		* @private
		*/
		requestShowMenu: function () {
			this.waterfallDown('onRequestShowMenu', {activator: this.activator});
		},

		/**
		* Requests that its child menu be hidden
		*
		* @fires onyx.Menu#event:onRequestHideMenu
		* @private
		*/
		requestHideMenu: function () {
			this.waterfallDown('onRequestHideMenu');
		},

		/**
		* Handler for {@link enyo.Popup#event:onHide}
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
		* Handler for onenter. Suppresses default behavior if menu is not active
		*
		* @private
		*/
		enter: function (sender) {
			if (!this.menuActive) {
				this.inherited(arguments);
			}
		},

		/**
		* Handler for onleave. Suppresses default behavior if menu is not active
		*
		* @private
		*/
		leave: function (sender, event) {
			if (!this.menuActive) {
				this.inherited(arguments);
			}
		}
	});

})(enyo, this);
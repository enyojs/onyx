(function (enyo, scope) {

	/**
	* onyx.Submenu_ is a control that collapses several menu items into a drawer,
	* hich may be opened and closed by tapping on its label. It is meant to be
	* laced inside an [onyx.Menu](#onyx.Menu).
	*
	* ```
	* {kind: 'onyx.MenuDecorator', components:[
	* 	{content: 'Open menu'},
	* 	{kind: 'onyx.Menu', components:[
	* 		{content: 'One'},
	* 		{content: 'Two'},
	* 		{kind: 'onyx.Submenu', content: 'Sort by...', components: [
	* 			{content: 'A'},
	* 			{content: 'B'},
	* 			{content: 'C'}
	* 		]},
	* 		{content: 'Three'}
	* 	]}
	* ]}
	* ```
	*
	* @class  onyx.Submenu
	* @extends enyo.Control
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.Submenu.prototype */ {

		/**
		* @private
		*/
		name: 'onyx.Submenu',

		/**
		* @private
		*/
		defaultKind: 'onyx.MenuItem',

		/**
		* @private
		*/
		initComponents: function () {
			this.createChrome([
				{
					name: 'label',
					kind: 'enyo.Control',
					classes: 'onyx-menu-item',
					content: this.content || this.name,
					isChrome: true,
					ontap: 'toggleOpen'
				},
				{kind: 'onyx.Drawer', name: 'client', classes: 'client onyx-submenu', isChrome: true, open: false}
			]);

			this.inherited(arguments);
		},

		/**
		* Toggles the display of the submenu
		*
		* @public
		*/
		toggleOpen: function () {
			this.setOpen(!this.getOpen());
		},

		/**
		* Opens or closes the submenu
		*
		* @param {Boolean} open - New state of the submenu
		* @public
		*/
		setOpen: function (open) {
			this.$.client.setOpen(open);
		},

		/**
		* Retrieves the current state of the submenu
		*
		* @return {Boolean} - Current state of the submenu
		* @public
		*/
		getOpen: function () {
			return this.$.client.getOpen();
		}
	});

})(enyo, this);
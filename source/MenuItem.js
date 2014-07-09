(function (enyo, source) {

	/**
	* Fires when the menu item is selected.
	*
	* @event onyx.MenuItem#event:onSelect
	* @type {Object}
	* @property {enyo.Control} selected - The selected menu item
	* @property {String} content - The selected menu item's content
	* @public
	*/

	/**
	* Fires when the menu item's content changes.
	*
	* @event onyx.MenuItem#event:onItemContentChange
	* @type {Object}
	* @property {enyo.Control} content - The menu item's content
	* @public
	*/

	/**
	* _onyx.MenuItem_ is a button styled to look like a menu item, designed for use
	* in an {@link onyx.Menu}. When the MenuItem is tapped, it tells the menu
	* to hide itself and emits an {@link onyx.MenuItem#event:onSelect} event with its content 
	* and a reference to itself. This event and its properties may be handled by a client
	* application to determine which menu item was selected.
	*
	* ```
	* enyo.kind({
	* 	handlers: {
	* 		onSelect: 'itemSelected'
	* 	},
	* 	components: [
	* 		{kind: 'onyx.MenuDecorator', components: [
	* 			{content: 'Open Menu (floating)'},
	* 			{kind: 'onyx.Menu', floating: true, components: [
	* 				{content: '1'},
	* 				{content: '2'},
	* 				{classes: 'onyx-menu-divider'},
	* 				{content: 'Label', classes: 'onyx-menu-label'},
	* 				{content: '3'},
	* 			]}
	* 		]}
	* 	],
	* 	itemSelected: function(inSender, inEvent) {
	* 		enyo.log('Menu Item Selected: ' + inEvent.originator.content);
	* 	}
	* })
	* ```
	*
	* @class  onyx.MenuItem
	* @extends enyo.Button
	* @public
	*/
	enyo.kind(
		/** @lends  onyx.MenuItem.prototype */ {
		
		/**
		* @private
		*/
		name: 'onyx.MenuItem',
		
		/**
		* @private
		*/
		kind: 'enyo.Button',
		
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
			this.inherited(arguments);
			this.unsilence();
			if (this.active){
				this.bubble('onActivate');
			}
		},
		
		/**
		* Handler for ontap
		*
		* @fires {@link onyx.Menu#event:onRequestHideMenu}
		* @fires {@link onyx.MenuItem#event:onSelect}
		* @private
		*/
		tap: function (inSender) {
			this.inherited(arguments);
			this.bubble('onRequestHideMenu');
			this.doSelect({selected:this, content:this.content});
		},
		
		/**
		* Notify that this item's content has changed
		*
		* @fires {@link onyx.MenuItem#event:onItemContentChange}
		* @private
		*/
		contentChanged: function (inOld) {
			this.inherited(arguments);
			this.doItemContentChange({content: this.content});
		}
	});
})(enyo, this);

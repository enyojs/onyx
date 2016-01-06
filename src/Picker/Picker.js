require('onyx');

/**
* Contains the declaration for the {@link module:onyx/Picker~Picker} kind.
* @module onyx/Picker
*/

var
	kind = require('enyo/kind');

var
	Menu = require('onyx/Menu');

/**
* Fires when the currently selected item changes.
*
* @event module:onyx/Picker~Picker#onChange
* @type {Object}
* @property {module:enyo/Control~Control} selected - The currently selected item.`
* @property {String} content - The content of the currently selected item.
* @public
*/

/**
* {@link module:onyx/Picker~Picker}, a subkind of {@link module:onyx/Menu~Menu}, is used to display a
* list of items that may be selected. It is meant to be used together with an
* {@link module:onyx/PickerDecorator~PickerDecorator}. The decorator loosely couples the picker with
* an {@link module:onyx/PickerButton~PickerButton}--a button that, when tapped, shows the picker.
* Once an item is selected, the list of items closes, but the item stays
* selected and the PickerButton displays the choice that was made.
*
* To initialize the Picker to a particular value, set the `active` property to
* `true` for the item that should be selected.
*
* ```
* var
* 	Picker = require('onyx/Picker'),
* 	PickerDecorator = require('onyx/PickerDecorator');
*
* {kind: PickerDecorator, components: [
* 	{}, //this uses the defaultKind property of PickerDecorator to inherit from PickerButton
* 	{kind: Picker, components: [
* 		{content: 'Gmail', active: true},
* 		{content: 'Yahoo'},
* 		{content: 'Outlook'},
* 		{content: 'Hotmail'}
* 	]}
* ]}
* ```
*
* Each item in the list is an {@link module:onyx/MenuItem~MenuItem}, so a client app may
* listen for an [onSelect]{@link module:onyx/MenuItem~MenuItem#onSelect} event with the
* item to determine which picker item was selected.
*
* @class Picker
* @extends module:onyx/Menu~Menu
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/Picker~Picker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.Picker',

	/**
	* @private
	*/
	kind: Menu,

	/**
	* @private
	*/
	classes: 'onyx-picker enyo-unselectable',

	/**
	* @lends module:onyx/Picker~Picker.prototype
	* @private
	*/
	published: {
		/**
		* Currently selected item, if any
		* @type {module:onyx/MenuItem~MenuItem}
		* @default  null
		* @public
		*/
		selected: null
	},

	/**
	* @private
	*/
	events: {
		onChange: ''
	},

	/**
	* @private
	*/
	handlers: {
		onItemContentChange: 'itemContentChange'
	},

	/**
	* When `true`, the picker is rendered in a floating layer outside of other
	* controls. This can be used to guarantee that the picker will be shown on
	* top of other controls.
	*
	* @private
	*/
	floating: true,

	/**
	* Overrides default value from {@link module:onyx/Menu~Menu}.
	*
	* @private
	*/
	showOnTop: true,

	/**
	* @private
	*/
	initComponents: function () {
		this.setScrolling(true);
		Menu.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	showingChanged: function () {
		this.getScroller().setShowing(this.showing);
		Menu.prototype.showingChanged.apply(this, arguments);
		if (this.showing && this.selected) {
			this.scrollToSelected();
		}
	},

	/**
	* Ensures that the selected item is visible.
	*
	* @private
	*/
	scrollToSelected: function () {
		this.getScroller().scrollToControl(this.selected, !this.menuUp);
	},

	/**
	* Handles [onActivate]{@link module:enyo/GroupItem~GroupItem#onActivate} event,
	* selecting the activated item.
	*
	* @private
	*/
	itemActivated: function (sender, event) {
		this.processActivatedItem(event.originator);
		return Menu.prototype.itemActivated.apply(this, arguments);
	},

	/**
	* If passed-in control is `active`, selects it.
	* @param {module:enyo/Control~Control} item
	*
	* @private
	*/
	processActivatedItem: function (item) {
		if (item.active) {
			this.setSelected(item);
		}
	},

	/**
	* Highlights the selected item with the CSS class `'selected'`.
	*
	* @fires module:onyx/Picker~Picker#onChange
	* @private
	*/
	selectedChanged: function (old) {
		if (old) {
			old.removeClass('selected');
		}
		if (this.selected) {
			this.selected.addClass('selected');
			this.doChange({selected: this.selected, content: this.selected.content});
		}
	},

	/**
	* Handles [onItemContentChange]{@link module:onyx/MenuItem~MenuItem#onItemContentChange}
	* events.
	*
	* @fires module:onyx/Picker~Picker#onChange
	* @private
	*/
	itemContentChange: function (sender, event) {
		if (event.originator == this.selected) {
			this.doChange({selected: this.selected, content: this.selected.content});
		}
	},

	/**
	* Handles `onresize` events.
	*
	* @private
	*/
	handleResize: function () {
		Menu.prototype.handleResize.apply(this, arguments);
		this.adjustPosition();
	}
});

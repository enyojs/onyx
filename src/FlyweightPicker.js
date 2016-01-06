require('onyx');

/**
* Contains the declaration for the {@link module:onyx/FlyweightPicker~FlyweightPicker} kind.
* @module onyx/FlyweightPicker
*/

var
	kind = require('enyo/kind'),
	Scroller = require('enyo/Scroller'),
	TouchScrollStrategy = require('enyo/TouchScrollStrategy');

var
	FlyweightRepeater = require('layout/FlyweightRepeater');

var
	Picker = require('onyx/Picker');

/**
* Fires when a row is being initialized.
*
* @event module:onyx/FlyweightPicker~FlyweightPicker#onSetupItem
* @type {Object}
* @property {Number} index - The row index.
* @property {module:enyo/Control~Control} flyweight - The row control, for decoration.
* @see module:enyo/FlyweightRepeater~FlyweightRepeater.onSetupItem
* @public
*/

/**
* Fires when an item is selected.
*
* @event module:onyx/FlyweightPicker~FlyweightPicker#onSelect
* @type {Object}
* @property {String} content - Content of the selected item.
* @property {Number} selected - Row index of the selected item.
* @public
*/

/**
* {@link module:onyx/FlyweightPicker~FlyweightPicker}, a subkind of
* {@link module:onyx/Picker~Picker}, is a picker that employs the flyweight
* pattern. It is used to display a large list of selectable items.	The
* [onSetupItem]{@link module:onyx/FlyweightPicker~FlyweightPicker#onSetupItem}
* event allows for customization of item rendering.
*
* To initialize the FlyweightPicker to a particular value, call `setSelected()`
* with the index of the item you wish to select, and call `setContent()` with
* the item that should be shown in the activator button.
*
* When an item is selected, FlyweightPicker sends an
* [onSelect]{@link module:onyx/FlyweightPicker~FlyweightPicker#onSelect} event
* with the selected item's information. This may be handled by a client
* application to determine which item was selected.
*
* ```
* var
* 	kind = require('enyo/kind');
*
* var
* 	FlyweightPicker = require('onyx/FlyweightPicker'),
* 	PickerDecorator = require('onyx/PickerDecorator');
*
* module.exports = kind(
* 	name: 'onyx.FlyweightPickerExample',
* 	handlers: {
* 		onSelect: 'itemSelected'
* 	},
* 	components: [
* 		{kind: PickerDecorator, components: [
* 			{},
* 			{name: 'yearPicker', kind: FlyweightPicker, count: 200,
* 				onSetupItem: 'setupYear', components: [
* 					{name: 'year'}
* 				]
* 			}
* 		]}
* 	],
* 	create: function () {
* 		var d = new Date();
* 		var y = d.getYear();
* 		this.$.yearPicker.setSelected(y);
* 		this.$.year.setContent(1900+y);
* 	},
* 	setupYear: function (sender, event) {
* 		this.$.year.setContent(1900+event.index);
* 	},
* 	itemSelected: function (sender, event) {
* 		enyo.log('Picker Item Selected: ' + event.selected.content);
* 	}
* )
* ```
*
* @class FlyweightPicker
* @extends module:onyx/Picker~Picker
* @ui
* @public
*/
module.exports = kind(
	/** @lends module:onyx/FlyweightPicker~FlyweightPicker.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.FlyweightPicker',

	/**
	* @private
	*/
	kind: Picker,

	/**
	* @private
	*/
	classes: 'onyx-flyweight-picker',

	/**
	* @lends module:onyx/FlyweightPicker~FlyweightPicker.prototype
	* @private
	*/
	published: {
		/**
		* The number of rows to render.
		*
		* @type {Number}
		* @default  0
		* @public
		*/
		count: 0
	},

	/**
	* @private
	*/
	events: {
		onSetupItem: '',
		onSelect: ''
	},

	/**
	* @private
	*/
	handlers: {
		onSelect: 'itemSelect'
	},

	/**
	* @private
	*/
	components: [
		{name: 'scroller', kind: Scroller, strategyKind: TouchScrollStrategy, components: [
			{name: 'flyweight', kind: FlyweightRepeater, noSelect: true, ontap: 'itemTap'}
		]}
	],

	/**
	* @private
	*/
	scrollerName: 'scroller',

	/**
	* Force the flyweight's client control ([MenuItem]{@link module:onyx/MenuItem~MenuItem} by default)
	* to activate. This will result in a call to `processActivatedItem()`, which preps
	* our picker selection logic. This is a workaround for changes caused by ENYO-1609
	* which resulted in ENYO-1611.
	*
	* @private
	*/
	initComponents: function () {
		this.controlParentName = 'flyweight';
        Picker.prototype.initComponents.apply(this, arguments);
		this.$.flyweight.$.client.children[0].setActive(true);
    },

	/**
	* @private
	*/
	create: function () {
		Picker.prototype.create.apply(this, arguments);
		this.countChanged();
	},

	/**
	* @private
	*/
	rendered: function () {
		Picker.prototype.rendered.apply(this, arguments);
		this.selectedChanged();
	},

	/**
	* Scrolls the [selected]{@link module:onyx/FlyweightPicker~FlyweightPicker#selected} control into view.
	*
	* @public
	*/
	scrollToSelected: function () {
		var n = this.$.flyweight.fetchRowNode(this.selected);
		this.getScroller().scrollToNode(n, !this.menuUp);
	},

	/**
	* @private
	*/
	countChanged: function () {
		this.$.flyweight.count = this.count;
	},

	/**
	* @private
	*/
	processActivatedItem: function (item) {
		this.item = item;
	},

	/**
	* @fires module:onyx/Picker~Picker#onChange
	* @private
	*/
	selectedChanged: function (old) {
		if (!this.item) {
			return;
		}
		if (old != null) {
			this.item.removeClass('selected');
			this.$.flyweight.renderRow(old);
		}
		var n;
		if (this.selected != null) {
			this.item.addClass('selected');
			this.$.flyweight.renderRow(this.selected);
			// need to remove the class from control to make sure it won't apply to other rows
			this.item.removeClass('selected');
			n = this.$.flyweight.fetchRowNode(this.selected);
		}
		this.doChange({selected: this.selected, content: n && n.textContent || this.item.content});
	},

	/**
	* @fires module:onyx/FlyweightPicker~FlyweightPicker#onSelect
	* @private
	*/
	itemTap: function (sender, event) {
		this.setSelected(event.rowIndex);
		//Send the select event that we want the client to receive.
		this.doSelect({selected: this.item, content: this.item.content});
	},

	/**
	* Blocks all `select` events that aren't coming from this control. This is to
	* prevent `select` events from MenuItems since they won't have the correct value
	* in a Flyweight context.
	*
	* @private
	*/
	itemSelect: function (sender, event) {
		if (event.originator != this) {
			return true;
		}
	}
});

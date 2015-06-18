require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TabBarItem~TabBarItem} kind.
* @module onyx/TabBarItem
*/

var
	kind = require('enyo/kind'),
	Button = require('enyo/Button'),
	GroupItem = require('enyo/GroupItem');

/**
* onyx.TabBarItem is a special button for {@link module:onyx/TabBar~TabBar}. This widget is
* designed to be used only within TabBar.
*
* @class TabBarItem
* @extends module:enyo/GroupItem~GroupItem
* @ui
* @private
*/
module.exports = kind(
	/** @lends module:onyx/TabBar~TabBar.Item */ {

	/**
	* @private
	*/
	name: 'onyx.TabBarItem',

	/**
	* @private
	*/
	kind: GroupItem,

	/**
	* @private
	*/
	classes: 'onyx-tab-item',

	/**
	* @private
	*/
	events: {
		onTabActivated: '',
		onTabCloseRequest: '',
		onTabSwitchRequest: '',
		onActivate: '',
		onShowTooltip: '',
		onHideTooltip: ''
	},

	/**
	* @private
	*/
	handlers: {
		onmouseover: 'navOver',
		onmouseout: 'navOut'
	},

	/**
	* @private
	*/
	navOver: function (item) {
		this.$.dissolve.addClass('onyx-tab-item-hovered');
	},

	/**
	* @private
	*/
	navOut: function (item) {
		this.$.dissolve.removeClass('onyx-tab-item-hovered');
	},

	/**
	* @private
	*/
	components: [
		{kind: Button, name: 'button', ontap: 'requestSwitch', onmouseover: 'showTooltipFromTab', onmouseout: 'doHideTooltip'},
		{classes: 'onyx-tab-item-dissolve', ontap: 'requestSwitch', name: 'dissolve', showing: false, onmouseover: 'showTooltipFromTab', onmouseout: 'doHideTooltip'},
		{classes: 'onyx-tab-item-close', name: 'closeButton' , ontap: 'requestClose'}
	],

	/**
	* @private
	*/
	create: function () {
		GroupItem.prototype.create.apply(this, arguments);
		this.$.button.setContent(this.content);
	},

	/**
	* @private
	*/
	raise: function () {
		this.addClass('active');
		this.$.dissolve.addClass('active');
	},

	/**
	* @private
	*/
	putBack: function () {
		this.removeClass('active');
		this.$.dissolve.removeClass('active');
	},

	/**
	* @private
	*/
	setActiveTrue: function () {
		this.setActive(true);
	},

	/**
	* @private
	*/
	activeChanged: function (inOldValue) {
		// called during destruction, hence the test on this.container
		if (this.container && this.hasNode()) {
			if (this.active) {
				this.raise();
			} else {
				this.putBack();
			}
			this.doActivate();
		}
		// do not return true;
		// activate event must be propagated to my RadioGroup owner
	},

	/**
	* @private
	*/
	_origWidth: null,

	/**
	* @private
	*/
	origWidth: function () {
		this._origWidth = this._origWidth || this.getBounds().width ;
		return this._origWidth;
	},

	/**
	* @private
	*/
	reduce: function (coeff) {
		var width = Math.floor(this.origWidth() * coeff) - this.$.closeButton.getBounds().width - 7;

		if (coeff === 1) {
			this.$.dissolve.hide();
		} else {
			this.$.dissolve.show();
		}

		this.$.button.applyStyle('width', width + 'px');
	},

	/**
	* @private
	*/
	requestSwitch: function (inSender, inEvent) {
		var i = this.indexInContainer();
		this.doTabSwitchRequest({
			index:    i,
			caption:  this.content,
			userData: this.userData,
			userId:   this.userId
		});
		return true;
	},

	/**
	* @private
	*/
	requestClose: function (inSender, inEvent) {
		this.doTabCloseRequest({ index: this.tabIndex });
		return true;
	},

	/**
	* @private
	*/
	showTooltipFromTab: function (inSender, inEvent){
		this.doShowTooltip({tooltipContent: this.tooltipMsg, bounds:this.getBounds()});
	}
});

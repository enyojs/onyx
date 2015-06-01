require('onyx');

/**
* Contains the declaration for the {@link module:onyx/TabPanels~TabPanels} kind.
* @module onyx/TabPanels
*/

var
	kind = require('enyo/kind'),
	utils = require('enyo/utils');

var
	FittableLayout = require('layout/FittableLayout'),
	FittableRowsLayout = FittableLayout.Rows,
	Panels = require('layout/Panels');

var
	TabBar = require('onyx/TabBar');

/**
* enyo.TabPanels is a subkind of enyo.Panels that
* displays a set of tabs, which allow navigation between the individual panels.
* Unlike enyo.Panels, by default, the user cannot drag between the panels of a
* TabPanels. This behavior may be enabled by setting _draggable_ to _true_.
*
* ```
* enyo.kind({
* 	name: 'App',
* 	kind: 'onyx.TabPanels',
* 	fit: true,
* 	components: [
* 		{kind: 'MyStartPanel'},
* 		{kind: 'MyMiddlePanel'},
* 		{kind: 'MyLastPanel'}
* 	]
* });
* new App().renderInto(document.body);
* ```
*
* @ui
* @class TabPanels
* @extends module:enyo/Panels~Panels
* @private
*/
module.exports = kind(
	/** @lends module:onyx/TabPanels~TabPanels.prototype */ {

	/**
	* @private
	*/
	name: 'onyx.TabPanels',

	/**
	* @private
	*/
	kind: Panels,

	/**
	* @private
	*/
	draggable: false,

	/**
	* @private
	*/
	handlers: {
		onTabChanged: 'switchPanel'
	},

	/**
	* @lends module:onyx/TabPanels~TabPanels.prototype
	* @private
	*/
	published: {
		/**
		* Set a maximum height for the scrollable menu that can be raised on the right of
		* the tab bar.
		*
		* @type {Number|null}
		* @default null
		* @public
		*/
		maxMenuHeight: null
	},

	/**
	* @private
	*/
	tabTools: [
		{kind: TabBar, isPanel: true, name: 'bar'},
		{name: 'client', isPanel: true, fit: true, kind: Panels, classes: 'enyo-tab-panels', onTransitionStart: 'clientTransitionStart'}
	],

	/**
	* @private
	*/
	create: function () {
		Panels.prototype.create.apply(this, arguments);

		if (this.getMaxMenuHeight()) {
			this.maxMenuHeightChanged();
		}

		// getPanels called on client will return panels of *this* kind
		this.$.client.getPanels = this.bindSafely('getClientPanels');

		// basically, set all these Panel parameters to false
		this.draggableChanged();
		this.animateChanged();
		this.wrapChanged();
	},

	/**
	* @private
	*/
	maxMenuHeightChanged: function () {
		this.$.bar.setMaxMenuHeight(this.getMaxMenuHeight()) ;
	},

	/**
	* @private
	*/
	initComponents: function () {
		this.createChrome(this.tabTools);
		Panels.prototype.initComponents.apply(this, arguments);
	},

	/**
	* @private
	*/
	getClientPanels: function () {
		return this.getPanels();
	},

	/**
	* @private
	*/
	flow: function () {
		Panels.prototype.flow.apply(this, arguments);
		this.$.client.flow();
	},

	/**
	* @private
	*/
	reflow: function () {
		Panels.prototype.reflow.apply(this, arguments);
		this.$.client.reflow();
	},

	/**
	* @private
	*/
	draggableChanged: function () {
		this.$.client.setDraggable(this.draggable);
		this.draggable = false;
	},

	/**
	* @private
	*/
	animateChanged: function () {
		this.$.client.setAnimate(this.animate);
		this.animate = false;
	},

	/**
	* @private
	*/
	wrapChanged: function () {
		this.$.client.setWrap(this.wrap);
		this.wrap = false;
	},

	/**
	* @private
	*/
	isClient: function (inControl) {
		return ! inControl.isPanel ;
	},

	/**
	* @private
	*/
	initDone: false,

	/**
	* @private
	*/
	rendered: function () {

		if (this.initDone) { return ;}

		var that = this ;
		utils.forEach(this.controls, function (c) {
			if (that.isClient(c)) {
				that.$.bar.addTab(c) ;
			}
		});

		this.setIndex(this.controls.length - 1);
		this.initDone = true;

		// must be called at the end otherwise kind size is weird
		Panels.prototype.rendered.apply(this, arguments);
	},

	/**
	* Add a new control managed by the tab bar. inControl is a
	* control with optional caption attribute. When not specified
	* the tab will have a generated caption like 'Tab 0', 'Tab
	* 1'. etc...
	*
	* @public
	*/
	addTab: function (inControl){
		this.$.bar.addTab(inControl);
		this.setIndex(this.controls.length - 1);
	},

	/**
	* Remove a tab from the tab bar. The control managed by the
	* tab will also be destroyed. target is an object with either
	* a caption attribute or an index. The tab(s) matching the
	* caption will be destroyed or the tab with matching index
	* will be destroyed.
	*
	* Example:
	*
	* ```
	*	myTab.removeTab({'index':0}); // remove the leftmost tab
	*	myTab.removeTab({'caption':'foo.js'});
	* ```
	*
	* @public
	*/
	removeTab: function (indexData) {
		this.$.bar.removeTab(indexData);
	},

	/**
	* @private
	*/
	layoutKindChanged: function () {
		if (!this.layout) {
			this.layout = new FittableRowsLayout(this);
		}
		this.$.client.setLayoutKind(this.layoutKind);
	},

	/**
	* @private
	*/
	indexChanged: function () {
		// FIXME: initialization order problem
		if (this.$.client.layout) {
			this.$.client.setIndex(this.index);
		}
		this.index = this.$.client.getIndex();
	},

	/**
	* @private
	*/
	switchPanel: function (inSender, inEvent) {
		if (this.hasNode()) {
			var i = inEvent.index;
			if (this.getIndex() != i) {
				this.setIndex(i);
			}
		}
	},

	/**
	* @private
	*/
	startTransition: utils.nop,

	/**
	* @private
	*/
	finishTransition: utils.nop,

	/**
	* @private
	*/
	stepTransition: utils.nop,

	/**
	* @private
	*/
	refresh: utils.nop
});

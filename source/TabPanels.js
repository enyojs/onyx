﻿/**
enyo.TabPanels is a subkind of <a href="#enyo.Panels">enyo.Panels</a> that
displays a set of tabs, which allow navigation between the individual panels.
Unlike enyo.Panels, by default, the user cannot drag between the panels of a
TabPanels. This behavior can be enabled by setting *draggable* to true.

Here's an example:

		enyo.kind({
			name: "App",
			kind: "TabPanels",
			fit: true,
			components: [
				{kind: "MyStartPanel"},
				{kind: "MyMiddlePanel"},
				{kind: "MyLastPanel"}
			]
		});
		new App().write();
*/

enyo.kind(
	{
		name: "onyx.TabPanels",
		kind: "Panels",
		//* @protected
		draggable: false,

		handlers  : {
			onTabChanged: 'switchPanel'
		},

		tabTools: [
			{
				kind: 'onyx.TabBar',
				isPanel: true,
				name: 'bar'
			},
			{
				name: "client",
				isPanel: true,
				fit: true,
				kind: "Panels",
				classes: "enyo-tab-panels",
				onTransitionStart: "clientTransitionStart"
			}
		],

		create: function() {
			this.inherited(arguments);
			if (this.debug) {this.log("create called");}
			// getPanels called on client will return panels of *this* kind
			this.$.client.getPanels = this.bindSafely("getClientPanels");

			// basically, set all these Panel parameters to false
			this.draggableChanged();
			this.animateChanged();
			this.wrapChanged();
		},
		initComponents: function() {
			if (this.debug) {this.log("initComponents called");}
			this.createChrome(this.tabTools);
			this.inherited(arguments);
			if (this.debug) {this.log("initComponents done");}
		},
		getClientPanels: function() {
			return this.getPanels();
		},

		flow: function() {
			this.inherited(arguments);
			this.$.client.flow();
		},
		reflow: function() {
			this.inherited(arguments);
			this.$.client.reflow();
		},
		draggableChanged: function() {
			this.$.client.setDraggable(this.draggable);
			this.draggable = false;
		},
		animateChanged: function() {
			this.$.client.setAnimate(this.animate);
			this.animate = false;
		},
		wrapChanged: function() {
			this.$.client.setWrap(this.wrap);
			this.wrap = false;
		},

		isClient: function(inControl) {
			return ! inControl.isPanel ;
		},

		initDone: false ,
		rendered: function() {

			if (this.initDone) { return ;}

			if (this.debug) {this.log("rendered start");}
			var that = this ;
			enyo.forEach(
				this.controls,
				function(c) {
					if (that.isClient(c)) {
						if (that.debug) {that.log("adding control " + c.name);}
						that.$.bar.addTab(c) ;
					}
				}
			);

			this.setIndex(this.controls.length - 1);
			this.initDone = true;
			if (this.debug) {this.log("rendered done");}

			// must be called at the end otherwise kind size is weird
			this.inherited(arguments);
		},

		//* @public
		/**
		 *
		 * Add a new control managed by the tab bar. inControl is a
		 * control with optional caption attribute. When not specified
		 * the tab will have a generated caption like 'Tab 0', 'Tab
		 * 1'. etc...
		 *
		 */
		addTab: function(inControl){
			this.$.bar.addTab(inControl);
			this.setIndex(this.controls.length - 1);
		},

		//* @public
		/**
		 *
		 * Remove a tab from the tab bar. The control managed by the
		 * tab will also be destroyed. target is an object with either
		 * a caption attribute or an index. The tab(s) matching the
		 * caption will be destroyed or the tab with matching index
		 * will be destroyed.
		 *
		 * Example:

			myTab.removeTab({'index':0}); // remove the leftmost tab
			myTab.removeTab({'caption':'foo.js'});

		 */

		removeTab: function(indexData) {
			this.$.bar.removeTab(indexData);
		},

		// layout is a property of inherited UiComponent
		layoutKindChanged: function() {
			if (!this.layout) {
				this.layout = enyo.createFromKind("FittableRowsLayout", this);
			}
			this.$.client.setLayoutKind(this.layoutKind);
		},
		indexChanged: function() {
			// FIXME: initialization order problem
			if (this.$.client.layout) {
				this.$.client.setIndex(this.index);
			}
			this.index = this.$.client.getIndex();
		},
		switchPanel: function(inSender, inEvent) {
			if (this.hasNode()) {
				var i = inEvent.index;
				if (this.debug) {
					this.log("switchPanel called with caption "+ inEvent.caption) ;
				}
				if (this.getIndex() != i) {
					this.setIndex(i);
				}
			}
		},
		startTransition: enyo.nop,
		finishTransition: enyo.nop,
		stepTransition: enyo.nop,
		refresh: enyo.nop
	}
);

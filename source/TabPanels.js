/**
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
		name: "enyo.TabPanels",
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

		dlog: function () {
			if (this.debug) {
				this.log(arguments) ;
			}
		},

		create: function() {
			this.inherited(arguments);
			this.dlog("create called");
			// getPanels called on client will return panels of *this* kind
			this.$.client.getPanels = this.bindSafely("getClientPanels");

			// basically, set all these Panel parameters to false
			this.draggableChanged();
			this.animateChanged();
			this.wrapChanged();
		},
		initComponents: function() {
			this.dlog("initComponents called");
			this.createChrome(this.tabTools);
			this.inherited(arguments);
			this.dlog("initComponents done");
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
		addControl: function(inControl) {
			this.dlog("addControl called on name "+ inControl.name + " content "+inControl.content );
			this.inherited(arguments);
			if (this.isClient(inControl)) {
				inControl._tab = this.$.bar.addTab(inControl) ;
			}
			this.dlog("addControl done");
		},
		removeControl: function(inControl) {
			if (this.isClient(inControl) && inControl._tab) {
				inControl._tab.destroy();
			}
			this.inherited(arguments);
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
				this.dlog("switchPanel called with caption "+ inEvent.caption) ;
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
